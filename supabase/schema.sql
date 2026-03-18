-- =============================================================================
-- PeakSeen — Supabase Database Schema
-- =============================================================================
-- Run this SQL in Supabase SQL Editor to create all required tables.
-- This file is for reference and collaboration — keep it in sync with
-- any manual schema changes made in the Supabase dashboard.
-- =============================================================================
-- ⚠️  WARNING: This drops and recreates ALL tables. Safe pre-launch only.
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables (safe pre-launch — no production data)
DROP TABLE IF EXISTS onboarding_submissions CASCADE;
DROP TABLE IF EXISTS tool_usage CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS brand_report_requests CASCADE;
DROP TABLE IF EXISTS brand_quiz_results CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS leads CASCADE;

-- ---------------------------------------------------------------------------
-- 1. leads — All email captures across the site
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL CHECK (source IN ('quiz', 'report', 'newsletter', 'tool', 'contact')),
  tool_used TEXT,
  business_name TEXT,
  tags TEXT[] DEFAULT '{}',
  consent_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads (source);

-- ---------------------------------------------------------------------------
-- 2. contact_submissions — Contact form entries
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_type TEXT,
  message TEXT NOT NULL,
  budget_range TEXT,
  referral_source TEXT,
  consent_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 3. brand_quiz_results — Brand Clarity Score quiz submissions
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brand_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT,
  name TEXT,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  dimension_scores JSONB,
  answers JSONB NOT NULL DEFAULT '{}',
  report_url TEXT,
  consent_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_results_email ON brand_quiz_results (email);

-- ---------------------------------------------------------------------------
-- 4. brand_report_requests — Brand report form submissions
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brand_report_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT,
  business_stage TEXT,
  target_audience TEXT,
  biggest_challenge TEXT,
  has_logo TEXT CHECK (has_logo IN ('yes', 'no', 'kind_of')),
  has_website TEXT CHECK (has_website IN ('yes', 'no', 'in_progress')),
  website_url TEXT,
  success_vision TEXT,
  report_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'delivered')),
  consent_marketing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 5. orders — Lemon Squeezy purchase records (via webhook)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lemon_squeezy_id TEXT,
  email TEXT NOT NULL,
  name TEXT,
  product_name TEXT NOT NULL DEFAULT 'Unknown',
  variant_name TEXT,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'refunded')),
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_lemon_squeezy_id ON orders (lemon_squeezy_id);

-- ---------------------------------------------------------------------------
-- 6. tool_usage — Anonymous analytics counter
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tool_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tool_usage_slug ON tool_usage (tool_slug);

-- ---------------------------------------------------------------------------
-- 7. onboarding_submissions — /start onboarding flow
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  industry TEXT,
  business_stage TEXT,
  services_needed TEXT[],
  project_description TEXT,
  budget_range TEXT,
  timeline TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- Row Level Security (RLS) — Restrict all tables to service role only
-- ---------------------------------------------------------------------------
-- In V1 there is no user auth. All writes come from the server via
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS. Enable RLS with no
-- public policies so that the anon key cannot read or write directly.
-- ---------------------------------------------------------------------------

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_report_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Public read for tool_usage counter display ("X people used this")
CREATE POLICY "Allow public count reads" ON tool_usage
  FOR SELECT USING (true);

-- Public insert for tool_usage (anonymous tracking)
CREATE POLICY "Allow anonymous inserts" ON tool_usage
  FOR INSERT WITH CHECK (true);
