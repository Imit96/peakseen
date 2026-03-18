# PeakSeen — Tech Stack & Architecture Guide

**Version:** 1.0
**Status:** Ready for Implementation
**Last Updated:** 2025
**Companion to:** PRD v1.0 and Design System v1.0

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Framework & Language](#2-framework--language)
3. [Styling & UI Tooling](#3-styling--ui-tooling)
4. [Typography & Fonts](#4-typography--fonts)
5. [Animation & Motion](#5-animation--motion)
6. [Iconography](#6-iconography)
7. [Database & Backend](#7-database--backend)
8. [Authentication](#8-authentication)
9. [File Storage](#9-file-storage)
10. [Content Management (Blog & Portfolio)](#10-content-management-blog--portfolio)
11. [AI & LLM Integration](#11-ai--llm-integration)
12. [PDF Generation](#12-pdf-generation)
13. [Commerce & Payments](#13-commerce--payments)
14. [Email System](#14-email-system)
15. [Scheduling & Booking](#15-scheduling--booking)
16. [Analytics & Monitoring](#16-analytics--monitoring)
17. [SEO Infrastructure](#17-seo-infrastructure)
18. [Rate Limiting & Abuse Prevention](#18-rate-limiting--abuse-prevention)
19. [Hosting, Deployment & CI/CD](#19-hosting-deployment--cicd)
20. [Domain, DNS & Email Hosting](#20-domain-dns--email-hosting)
21. [Environment Variables](#21-environment-variables)
22. [Dependency Manifest](#22-dependency-manifest)
23. [Architecture Diagrams](#23-architecture-diagrams)
24. [Cost Projection](#24-cost-projection)
25. [Security Considerations](#25-security-considerations)
26. [Scaling & Growth Path](#26-scaling--growth-path)

---

## 1. Architecture Overview

PeakSeen is a **monolithic Next.js application** — frontend, backend API routes, server actions, and content all live in a single codebase. This is intentional: it minimizes operational complexity for a solo-founder studio, eliminates cross-service coordination, and keeps the entire system deployable from a single `git push`.

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         VERCEL (Edge Network)                │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ Static Pages │  │ Server Comps │  │  API Routes &      │  │
│  │ (ISR/SSG)   │  │ (RSC)        │  │  Server Actions    │  │
│  └─────────────┘  └──────────────┘  └────────┬───────────┘  │
│                                               │              │
└───────────────────────────────────────────────┼──────────────┘
                                                │
                    ┌───────────────────────────┼──────────────────────────┐
                    │                           │                          │
             ┌──────▼──────┐            ┌───────▼──────┐          ┌───────▼───────┐
             │  Supabase   │            │   External   │          │   External    │
             │  (Postgres  │            │   APIs       │          │   Services    │
             │   + Auth    │            │              │          │               │
             │   + Storage)│            │ • OpenAI     │          │ • Lemon       │
             │             │            │ • PageSpeed  │          │   Squeezy     │
             │ • Leads     │            │              │          │ • Brevo       │
             │ • Quiz data │            │              │          │ • Resend      │
             │ • Orders    │            │              │          │ • Cal.com     │
             │ • PDFs      │            │              │          │               │
             └─────────────┘            └──────────────┘          └───────────────┘
```

### Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Monorepo vs Polyrepo | Single repo | One developer, one codebase, one deploy pipeline |
| Server framework | Next.js App Router | SSR, SSG, ISR, API routes, Server Actions — one framework handles all rendering strategies |
| Database | Supabase (managed Postgres) | Free tier covers launch needs, includes auth + storage, real-time capable for future features |
| State management | React `useState` + URL search params | No global state library needed for V1 — tools are self-contained, no cross-page state |
| CMS | MDX files in repo | Zero cost, version-controlled, no external dependency, full React component support inside content |
| Payments | Lemon Squeezy (hosted checkout) | No PCI compliance burden, handles VAT/tax, free to start |
| Email | Split system (Resend + Brevo) | Transactional and marketing emails have different delivery needs and compliance rules |

---

## 2. Framework & Language

### Next.js 14+ (App Router)

The entire application is built on Next.js using the **App Router** architecture (not the legacy Pages Router).

| Property | Detail |
|----------|--------|
| **Version** | 14.x or latest stable (15.x if stable at build time) |
| **Router** | App Router (`src/app/` directory) |
| **Rendering** | Mixed — SSG for static pages, ISR for blog/portfolio, SSR for dynamic tool results |
| **API layer** | Next.js Route Handlers (`src/app/api/`) for webhooks and external API proxying |
| **Form handling** | Next.js Server Actions for all form submissions (contact, quiz, newsletter, report) |
| **Runtime** | Node.js (Vercel Serverless Functions) for API routes; Edge Runtime for middleware |

**Why Next.js over alternatives:**
- Vercel-native deployment with zero configuration
- Built-in image optimization, font loading, metadata API, and OG image generation
- React Server Components reduce client-side JavaScript by default
- ISR allows blog posts to be statically generated but updatable without redeploy
- Server Actions eliminate the need for separate API endpoints for form processing

### TypeScript

The entire codebase is **strictly typed**. No `any` types permitted in production code.

| Property | Detail |
|----------|--------|
| **Version** | 5.x (latest stable) |
| **Config** | `strict: true` in `tsconfig.json` |
| **Path aliases** | `@/` maps to `src/` for clean imports (`@/components/ui/button`) |
| **Type checking** | Enforced in CI before deployment |

```json
// tsconfig.json (key settings)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Node.js

| Property | Detail |
|----------|--------|
| **Version** | 20.x LTS (Vercel default) |
| **Package manager** | pnpm (faster installs, strict dependency resolution) |
| **Lock file** | `pnpm-lock.yaml` committed to repo |

---

## 3. Styling & UI Tooling

### Tailwind CSS

The sole styling solution. No CSS modules, no styled-components, no Sass.

| Property | Detail |
|----------|--------|
| **Version** | 3.4+ (or 4.x if stable) |
| **Config** | Extended with PeakSeen's design tokens (colors, fonts, spacing, radii, shadows) |
| **Purging** | Automatic — Tailwind scans `src/**/*.{ts,tsx,mdx}` |
| **Plugins** | `@tailwindcss/typography` (prose styling for MDX blog content) |

```bash
pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/typography
```

### CSS Custom Properties

All design tokens are defined as CSS custom properties in `src/styles/globals.css` and consumed by both Tailwind config and component code. See the Design System document for the complete token list.

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-charcoal: #1A1A1A;
    --color-ivory: #F9F8F6;
    --accent: #D95C3C;
    /* ... full token set from Design System */
  }
}
```

### Component Variant Management

| Tool | Purpose |
|------|---------|
| `class-variance-authority` (CVA) | Type-safe variant definitions for components (Button variants, Card variants, Badge types) |
| `clsx` | Conditional class name joining |
| `tailwind-merge` | Resolves conflicting Tailwind classes when merging base + override styles |

```bash
pnpm add class-variance-authority clsx tailwind-merge
```

Combined into a single utility:

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        ivory: '#F9F8F6',
        'warm-grey': '#EBEBEB',
        accent: {
          DEFAULT: '#D95C3C',
          hover: '#C14E31',
          subtle: 'rgba(217, 92, 60, 0.10)',
        },
        grey: {
          50: '#F4F4F2',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#ABABAB',
          400: '#8C8C8C',
          500: '#6B6B6B',
          600: '#4A4A4A',
          700: '#3D3D3D',
          800: '#2C2C2C',
          900: '#1A1A1A',
        },
        success: { DEFAULT: '#1B7A4A', light: '#E8F5EE' },
        warning: { DEFAULT: '#C4841D', light: '#FFF5E0' },
        error: { DEFAULT: '#C93B3B', light: '#FDECEC' },
        info: { DEFAULT: '#2B5BEE', light: '#EBF0FF' },
      },
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(26,26,26,0.08)',
        md: '0 4px 16px rgba(26,26,26,0.12)',
        lg: '0 8px 32px rgba(26,26,26,0.16)',
        accent: '0 4px 24px rgba(217,92,60,0.25)',
      },
      maxWidth: {
        prose: '680px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
```

---

## 4. Typography & Fonts

### Loading: `next/font` (Local)

All three typefaces are self-hosted as `.woff2` files loaded via `next/font/local`. This eliminates render-blocking requests and prevents CLS from font swapping.

| Font | Weight(s) | Files Required |
|------|-----------|---------------|
| Satoshi (Display) | 400 Regular, 500 Medium, 700 Bold, 900 Black | 4 `.woff2` files |
| Editorial New (Body) | 400 Regular, 400 Italic | 2 `.woff2` files |
| JetBrains Mono (Mono) | 400 Regular | 1 `.woff2` file |

**File location:** `public/fonts/`

**Configuration:** See Design System Section 3.2 for the complete `next/font` setup code.

### Font Acquisition

| Font | License | Source |
|------|---------|--------|
| Satoshi | Free for commercial use | [fontshare.com/fonts/satoshi](https://www.fontshare.com/fonts/satoshi) |
| Editorial New | Verify license before use — may require purchase | Check foundry; if cost is prohibitive, substitute with **Playfair Display** (Google Fonts, free) or **Lora** (Google Fonts, free) |
| JetBrains Mono | Free and open source (SIL OFL) | [jetbrains.com/lp/mono](https://www.jetbrains.com/lp/mono/) |

> **Fallback plan:** If Editorial New is not available under a free/affordable license, use `next/font/google` to load **Playfair Display** or **Lora** as the serif body font. Update the `--font-body` CSS variable accordingly.

---

## 5. Animation & Motion

### Framer Motion

The sole animation library. No CSS-only animations for component-level motion (CSS keyframes are used only for the skeleton shimmer effect).

| Property | Detail |
|----------|--------|
| **Package** | `framer-motion` |
| **Version** | 11.x+ (latest stable) |
| **Use** | Scroll reveals, page transitions, hero word staggers, card hover lifts, quiz transitions, score count-ups |
| **Tree-shaking** | Import only what's used: `motion`, `AnimatePresence`, `useInView`, `useMotionValue` |

```bash
pnpm add framer-motion
```

**Performance rule:** Framer Motion components should be wrapped in `'use client'` boundary components. Never import Framer Motion in Server Components. Keep animated wrappers thin — a `<FadeInOnScroll>` wrapper component around server-rendered content is the ideal pattern.

```tsx
// src/components/motion/fade-in-on-scroll.tsx
'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function FadeInOnScroll({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 6. Iconography

### Lucide React

| Property | Detail |
|----------|--------|
| **Package** | `lucide-react` |
| **Version** | 0.383+ |
| **Icon size** | 24×24px default, 16×16px for compact/inline |
| **Stroke width** | 2px (default), 1.5px (compact) |
| **Tree-shaking** | Automatic — only imported icons are bundled |

```bash
pnpm add lucide-react
```

**Social media icons** (LinkedIn, Instagram, X/Twitter, Behance) are not included in Lucide. Create custom SVG components in `src/components/icons/social/` matching Lucide's 24×24 viewBox and 2px stroke weight visual style.

---

## 7. Database & Backend

### Supabase (PostgreSQL)

Supabase provides the managed PostgreSQL database, authentication, file storage, and real-time capabilities — all from a single service.

| Property | Detail |
|----------|--------|
| **Service** | Supabase (hosted) |
| **Database** | PostgreSQL 15+ |
| **Free tier** | 500MB database, 1GB file storage, 50K monthly active users (auth), 2GB bandwidth |
| **Client library** | `@supabase/supabase-js` |
| **ORM** | None — use Supabase client directly for V1. Consider Drizzle ORM if queries become complex in V2. |
| **Row Level Security (RLS)** | Enabled on all tables. Public-facing inserts (leads, quiz results) use the anon key with INSERT-only policies. |

```bash
pnpm add @supabase/supabase-js
```

### Client Initialization

```typescript
// src/lib/supabase.ts

// Browser client (for client components — uses anon key)
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// src/lib/supabase-server.ts

// Server client (for Server Actions, API routes — uses service role key)
import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
```

```bash
pnpm add @supabase/ssr
```

### Database Schema

```sql
-- ═══════════════════════════════════════════
-- LEADS TABLE (All email captures across the site)
-- ═══════════════════════════════════════════
CREATE TABLE leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT,
  source      TEXT NOT NULL CHECK (source IN ('quiz', 'report', 'newsletter', 'tool', 'contact')),
  tool_used   TEXT,                          -- e.g., 'name-generator', 'color-palette'
  business_name TEXT,
  tags        TEXT[] DEFAULT '{}',           -- Brevo tags: 'quiz-lead', 'tool-lead', etc.
  consent_marketing BOOLEAN DEFAULT FALSE,  -- NDPR/GDPR consent checkbox
  brevo_contact_id TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookups by email
CREATE INDEX idx_leads_email ON leads (email);
-- Index for source-based analytics
CREATE INDEX idx_leads_source ON leads (source);

-- ═══════════════════════════════════════════
-- BRAND QUIZ RESULTS
-- ═══════════════════════════════════════════
CREATE TABLE brand_quiz_results (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email            TEXT NOT NULL,
  business_name    TEXT,
  score            INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  dimension_scores JSONB NOT NULL,           -- { "purpose": 8, "visual": 6, ... }
  answers          JSONB NOT NULL,           -- Full answer payload for report generation
  report_url       TEXT,                     -- Supabase Storage URL to generated PDF
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_quiz_email ON brand_quiz_results (email);

-- ═══════════════════════════════════════════
-- BRAND REPORT REQUESTS
-- ═══════════════════════════════════════════
CREATE TABLE brand_report_requests (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email             TEXT NOT NULL,
  full_name         TEXT NOT NULL,
  business_name     TEXT NOT NULL,
  industry          TEXT,
  business_stage    TEXT,
  target_audience   TEXT,
  biggest_challenge TEXT,
  has_logo          TEXT CHECK (has_logo IN ('yes', 'no', 'kind_of')),
  has_website       TEXT CHECK (has_website IN ('yes', 'no', 'in_progress')),
  website_url       TEXT,
  success_vision    TEXT,
  report_url        TEXT,                    -- Delivered PDF URL
  status            TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'delivered')),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- CONTACT / BRIEF SUBMISSIONS
-- ═══════════════════════════════════════════
CREATE TABLE contact_submissions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  company       TEXT,
  service_type  TEXT,                        -- 'brand_identity', 'website', 'strategy', etc.
  message       TEXT NOT NULL,
  budget_range  TEXT,
  referral_source TEXT,                      -- 'How did you hear about us?'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- ORDERS (Synced from Lemon Squeezy webhooks)
-- ═══════════════════════════════════════════
CREATE TABLE orders (
  id                      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lemon_squeezy_order_id  TEXT UNIQUE NOT NULL,
  customer_email          TEXT NOT NULL,
  product_name            TEXT NOT NULL,
  product_slug            TEXT NOT NULL,
  amount_paid             INTEGER NOT NULL,  -- In cents
  currency                TEXT DEFAULT 'USD',
  download_url            TEXT,
  status                  TEXT DEFAULT 'completed' CHECK (status IN ('completed', 'refunded')),
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_email ON orders (customer_email);

-- ═══════════════════════════════════════════
-- TOOL USAGE COUNTER (Anonymous analytics)
-- ═══════════════════════════════════════════
CREATE TABLE tool_usage (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_slug  TEXT NOT NULL,                  -- 'color-palette', 'name-generator', etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tool_usage_slug ON tool_usage (tool_slug);

-- ═══════════════════════════════════════════
-- ONBOARDING SUBMISSIONS (/start flow)
-- ═══════════════════════════════════════════
CREATE TABLE onboarding_submissions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  business_name   TEXT,
  industry        TEXT,
  business_stage  TEXT,
  services_needed TEXT[],                    -- Multi-select array
  project_description TEXT,
  budget_range    TEXT,
  timeline        TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_report_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;

-- Public INSERT for lead capture (anon key can insert, not read/update/delete)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON brand_quiz_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON brand_report_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON tool_usage
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON onboarding_submissions
  FOR INSERT WITH CHECK (true);

-- Tool usage counter: public read for the "X people used this" display
CREATE POLICY "Allow public count reads" ON tool_usage
  FOR SELECT USING (true);

-- Orders: only service role can insert (webhooks) — no public access
-- No public policy needed; webhook handler uses service role key
```

> **Important:** All reads and writes from Server Actions and API routes use the **service role key**, bypassing RLS. The anon key + RLS policies exist only to protect against direct client-side Supabase queries.

---

## 8. Authentication

### V1: No Authentication

V1 launches without user accounts. All interactions are anonymous with email capture. This maximizes speed to market and eliminates friction.

### V2: Supabase Auth (Deferred)

When the Client Command Center dashboard is built:

| Property | Detail |
|----------|--------|
| **Provider** | Supabase Auth |
| **Methods** | Email/password + Google OAuth |
| **Session** | Server-side via `@supabase/ssr` middleware |
| **Protected routes** | `/dashboard/*` — redirect unauthenticated users to `/login?redirect=/dashboard` |
| **Package** | `@supabase/ssr` (already installed for the database client) |

---

## 9. File Storage

### Supabase Storage

Used for storing generated PDFs (quiz reports, brand reports) and any uploaded assets.

| Property | Detail |
|----------|--------|
| **Free tier** | 1GB storage, 2GB bandwidth/month |
| **Bucket: `reports`** | Generated PDF reports — public read, service-role write |
| **File naming** | `{type}/{uuid}.pdf` (e.g., `quiz-reports/a1b2c3d4.pdf`) |
| **Access** | Public URLs for download links sent via email |

```sql
-- Create storage bucket (run in Supabase SQL editor)
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true);

-- Allow public reads
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'reports');

-- Service role writes only (no public uploads)
```

---

## 10. Content Management (Blog & Portfolio)

### MDX with Next.js

Blog posts and portfolio case studies are authored as **MDX files** stored in the repository. No external CMS.

| Property | Detail |
|----------|--------|
| **Package** | `next-mdx-remote` (for loading MDX from the filesystem with full flexibility) |
| **Content location** | `src/content/blog/` and `src/content/work/` |
| **Frontmatter** | Parsed via `gray-matter` |
| **Custom components** | Callout boxes, code blocks, inline CTAs, image galleries — defined in `src/components/mdx/` |
| **Rendering** | Server-side via React Server Components |

```bash
pnpm add next-mdx-remote gray-matter reading-time
```

### Blog Post Frontmatter Schema

```yaml
---
title: "How to Define Your Brand Identity as a Startup"
slug: "brand-identity-startup"
publishedAt: "2025-06-15"
updatedAt: "2025-06-15"
category: "Branding"
tags: ["brand identity", "startup", "logo"]
excerpt: "A step-by-step guide to building a brand identity from scratch — even with zero budget."
coverImage: "/images/blog/brand-identity-startup.webp"
author: "PeakSeen"
readingTime: 8        # Auto-calculated but can be overridden
seo:
  title: "Brand Identity for Startups: A Complete Guide | PeakSeen"
  description: "Learn how to define your brand identity as a startup. Covers naming, logo design, color systems, and brand voice."
  keyword: "brand identity startup"
---
```

### Portfolio Case Study Frontmatter Schema

```yaml
---
title: "Fintech Brand Identity"
slug: "fintech-brand-identity"
client: "Confidential"
industry: "Finance / Fintech"
location: "Lagos, Nigeria"
services: ["Brand Foundation", "Brand Expression"]
outcome: "300% increase in brand recognition within 6 months"
coverImage: "/images/work/fintech-cover.webp"
featured: true
publishedAt: "2025-07-01"
isConceptWork: false   # true for spec/concept pieces at launch
---
```

### MDX Custom Components

```tsx
// Available inside MDX files
<Callout type="tip">This is a tip callout.</Callout>
<Callout type="warning">Watch out for this common mistake.</Callout>
<ToolPromo tool="color-palette" />        // Inline CTA to a free tool
<ProductPromo slug="brand-starter-kit" /> // Inline CTA to a product
<NewsletterInline />                      // Mid-article email signup
<ImageGallery images={[...]} />           // Lightbox image gallery
```

### Content Workflow

1. Author writes MDX file with frontmatter
2. Creates a PR to the `main` branch on GitHub
3. Vercel generates a preview deployment for review
4. On merge, Vercel rebuilds — ISR serves the updated post within revalidation window
5. ISR revalidation interval: **3600 seconds** (1 hour) for blog posts

---

## 11. AI & LLM Integration

### OpenAI API

Used exclusively for the **Brand Name Generator** tool in V1.

| Property | Detail |
|----------|--------|
| **Model** | `gpt-4o-mini` (best cost/performance ratio for structured generation) |
| **Package** | `openai` (official Node.js SDK) |
| **Endpoint** | Called from Next.js API Route (`/api/tools/name-generator`) — never from the client |
| **Response format** | Structured JSON (10 name objects) |
| **Max tokens** | 1000 (sufficient for 10 names with rationales) |
| **Temperature** | 0.9 (high creativity for diverse name generation) |
| **Rate limiting** | 3 requests per IP per 24 hours (see Section 18) |

```bash
pnpm add openai
```

### API Route Implementation Pattern

```typescript
// src/app/api/tools/name-generator/route.ts
import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a professional brand naming consultant. Given the user's industry, keywords, and personality traits, generate exactly 10 creative, memorable, and domain-friendly brand names. For each name, provide: the name, type (abstract/descriptive/portmanteau/metaphorical/invented), and a one-sentence rationale. Return ONLY a valid JSON array with no markdown or preamble.`;

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit check (see Section 18)
    // 2. Parse and validate input
    const body = await req.json();

    // 3. Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.9,
      max_tokens: 1000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: JSON.stringify(body) },
      ],
    });

    // 4. Parse response
    const content = completion.choices[0]?.message?.content;
    const names = JSON.parse(content || '[]');

    return NextResponse.json({ names });
  } catch (error) {
    // 5. Graceful failure — never crash, return user-friendly error
    console.error('Name generator error:', error);
    return NextResponse.json(
      { error: 'Our name generator is taking a break. Please try again shortly.' },
      { status: 503 }
    );
  }
}
```

### Cost Control

| Control | Implementation |
|---------|---------------|
| Rate limiting | 3 per IP per 24 hours (Upstash Redis) |
| Model choice | `gpt-4o-mini` (~$0.15/1M input tokens, ~$0.60/1M output tokens) |
| Max tokens cap | 1000 per request |
| Monthly budget alert | Set OpenAI usage limit at $20/month |
| Monitoring | Log token usage per request to Supabase for cost tracking |

### V2 AI Features (Deferred)

- Automated Brand Report generation (GPT-4o for higher quality long-form content)
- AI-assisted blog post drafting via editorial workflow
- Smart quiz follow-up recommendations

---

## 12. PDF Generation

### @react-pdf/renderer

Used to generate the Brand Clarity Score PDF report and (in V2) the automated Brand Report.

| Property | Detail |
|----------|--------|
| **Package** | `@react-pdf/renderer` |
| **Runtime** | Server-side only — called from API routes, never from the client |
| **Output** | PDF buffer → uploaded to Supabase Storage → public URL sent to user via email |
| **Content** | React components define the PDF layout (cover page, radar chart, recommendations) |

```bash
pnpm add @react-pdf/renderer
```

### Generation Flow

```
User completes quiz
  → Server Action saves results to Supabase
  → POST to /api/quiz/report (internal)
  → React PDF renders the report as a buffer
  → Buffer uploaded to Supabase Storage (reports/quiz/{id}.pdf)
  → Public URL saved to brand_quiz_results.report_url
  → Resend sends transactional email with download link
```

### Fallback

If `@react-pdf/renderer` encounters issues with complex layouts (charts, custom fonts), fall back to **Puppeteer** rendering an HTML template to PDF. This is heavier but more flexible.

```bash
# Only install if @react-pdf/renderer proves insufficient
pnpm add puppeteer-core @sparticuz/chromium
```

> **Vercel note:** Puppeteer requires `@sparticuz/chromium` for serverless environments. This adds ~50MB to the function size. Prefer `@react-pdf/renderer` where possible.

---

## 13. Commerce & Payments

### Lemon Squeezy

Handles all digital product sales, checkout, tax compliance, and download delivery.

| Property | Detail |
|----------|--------|
| **Service** | Lemon Squeezy (lemonsqueezy.com) |
| **Cost** | Free to create store. 5% + $0.50 per transaction. |
| **Checkout** | Hosted overlay (embedded on PeakSeen) or redirect to Lemon Squeezy |
| **Tax/VAT** | Automatically handled by Lemon Squeezy |
| **Download delivery** | Automatic — Lemon Squeezy emails the download link on purchase |
| **Webhooks** | `order_created`, `order_refunded` → `https://peakseen.com/api/webhooks/lemon-squeezy` |

```bash
pnpm add @lemonsqueezy/lemonsqueezy.js
```

### Checkout Integration Pattern

```tsx
// Product page — Buy Now button
// Uses Lemon Squeezy's overlay checkout
<a
  href="https://peakseen.lemonsqueezy.com/buy/{variant_id}"
  className="lemonsqueezy-button"
  data-overlay="true"
>
  Buy Now — $29
</a>

// Include Lemon Squeezy script in layout
<Script src="https://assets.lemonsqueezy.com/lemon.js" strategy="lazyOnload" />
```

### Webhook Handler

```typescript
// src/app/api/webhooks/lemon-squeezy/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  // 1. Verify webhook signature
  const body = await req.text();
  const signature = req.headers.get('x-signature');
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!;

  const hmac = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (hmac !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // 2. Parse event
  const event = JSON.parse(body);
  const eventName = event.meta.event_name;

  const supabase = createServerClient();

  // 3. Handle order_created
  if (eventName === 'order_created') {
    await supabase.from('orders').insert({
      lemon_squeezy_order_id: event.data.id,
      customer_email: event.data.attributes.user_email,
      product_name: event.data.attributes.first_order_item.product_name,
      product_slug: event.data.attributes.first_order_item.product_id,
      amount_paid: event.data.attributes.total,
      currency: event.data.attributes.currency,
      download_url: event.data.attributes.urls?.receipt,
    });
  }

  // 4. Handle order_refunded
  if (eventName === 'order_refunded') {
    await supabase.from('orders')
      .update({ status: 'refunded' })
      .eq('lemon_squeezy_order_id', event.data.id);
  }

  return NextResponse.json({ received: true });
}
```

---

## 14. Email System

The email system is split across three services with **strictly defined boundaries** to prevent overlap and confusion.

### Service Boundary Map

| Service | Tool | Responsibility | Trigger |
|---------|------|---------------|---------|
| **Transactional** | Resend + React Email | Instant, user-action-triggered delivery | Server Actions / API Routes |
| **Marketing & CRM** | Brevo | Time-delayed sequences, broadcasts, lead nurturing | Brevo automation rules + API |
| **E-commerce** | Lemon Squeezy | Purchase confirmations, download links, invoices, refunds | Automatic (Lemon Squeezy handles entirely) |

### Resend (Transactional Email)

| Property | Detail |
|----------|--------|
| **Service** | Resend (resend.com) |
| **Free tier** | 3,000 emails/month, 100/day |
| **Package** | `resend` |
| **Email templates** | Built as React components using `@react-email/components` |
| **Sender** | `hello@peakseen.com` (requires domain verification in Resend) |

```bash
pnpm add resend @react-email/components
```

**Sends these emails:**
- Quiz results delivery (with PDF download link)
- Auto-reply to contact form briefs ("We received your brief!")
- Brand Report confirmation ("Your report is being prepared")
- Tool result delivery (Name Generator saved names)

**Implementation pattern:**

```typescript
// src/lib/email.ts
import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
```

```tsx
// src/emails/quiz-results.tsx (React Email template)
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components';

export function QuizResultsEmail({ score, reportUrl }: { score: number; reportUrl: string }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', background: '#F9F8F6' }}>
        <Container>
          <Heading>Your Brand Clarity Score: {score}/100</Heading>
          <Text>We've prepared a detailed report with personalised recommendations.</Text>
          <Button href={reportUrl}>Download Your Report (PDF)</Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### Brevo (Marketing & CRM)

| Property | Detail |
|----------|--------|
| **Service** | Brevo (brevo.com, formerly Sendinblue) |
| **Free tier** | 300 emails/day, unlimited contacts |
| **Package** | `@getbrevo/brevo` (official SDK) |
| **Use** | Welcome sequences, nurture flows, newsletters, follow-ups |
| **Contact sync** | On every lead capture, add/update contact in Brevo with tags via API |

```bash
pnpm add @getbrevo/brevo
```

**Integration pattern:** When a Server Action captures a lead:

```typescript
// 1. Save to Supabase (leads table)
// 2. Sync to Brevo via API
import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.ContactsApi();
apiInstance.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

await apiInstance.createContact({
  email: lead.email,
  attributes: { FIRSTNAME: lead.name, SOURCE: lead.source },
  listIds: [2],              // Welcome sequence list ID
  updateEnabled: true,        // Update if contact already exists
});

// 3. Send instant transactional email via Resend (if needed)
```

### Brevo Automation Sequences

**Welcome Sequence (all new leads):**

| Email | Day | Subject | Content |
|-------|-----|---------|---------|
| 1 | 0 | Welcome to PeakSeen | Intro + link to a high-value free resource relevant to their source tag |
| 2 | 3 | Read this first | A strong blog post recommendation |
| 3 | 7 | What PeakSeen can do for you | Services overview — the "soft pitch" |
| 4 | 14 | See the transformation | Case study / social proof email |
| 5 | 21 | Ready to take the next step? | Direct CTA to book a discovery call — the "hard pitch" |

**Purchase Sequence (Lemon Squeezy buyers tagged `customer`):**

| Email | Day | Subject | Content |
|-------|-----|---------|---------|
| 1 | 3 | How are you getting on? | Check-in + best practice tips for the purchased product |
| 2 | 7 | You might also like... | Upsell — recommend a related template or toolkit |

**Brand Report Sequence (tagged `report-lead`):**

| Email | Day | Subject | Content |
|-------|-----|---------|---------|
| 1 | 0 | Your Brand Report is here | Report PDF link |
| 2 | 2 | Did you read your report? | Follow-up with action step highlights |
| 3 | 5 | A brand like yours... | Case study of a similar brand transformation |
| 4 | 10 | Let's talk through your report | CTA to book a free discovery call |

---

## 15. Scheduling & Booking

### Cal.com

| Property | Detail |
|----------|--------|
| **Service** | Cal.com (cal.com) |
| **Cost** | Free for individuals |
| **Event type** | "Brand Discovery Call" — 30 minutes |
| **Integration** | Embed widget directly on the Contact page and as a popup CTA elsewhere |
| **Calendar sync** | Connects to the founder's Google Calendar / Outlook |
| **Package** | `@calcom/embed-react` |

```bash
pnpm add @calcom/embed-react
```

```tsx
// Usage on Contact page
import Cal from '@calcom/embed-react';

<Cal
  calLink="peakseen/brand-discovery"
  config={{
    layout: 'month_view',
    theme: 'dark',
  }}
/>
```

> **Open Question #8 from PRD:** Confirm which calendar the founder uses and verify Cal.com integration before Phase 1 launch.

---

## 16. Analytics & Monitoring

### Vercel Web Analytics

| Property | Detail |
|----------|--------|
| **Cost** | Included with Vercel (free tier: 2,500 events/month; Pro: 25K) |
| **Setup** | Add `<Analytics />` component to root layout |
| **Package** | `@vercel/analytics` |
| **Privacy** | No cookies, GDPR-compliant by default — **but PeakSeen's cookie banner should still gate it for NDPR compliance** |

```bash
pnpm add @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />  {/* Gate behind cookie consent in production */}
      </body>
    </html>
  );
}
```

### Vercel Speed Insights

| Property | Detail |
|----------|--------|
| **Cost** | Included with Vercel |
| **Package** | `@vercel/speed-insights` |
| **Tracks** | Real user Core Web Vitals (LCP, FID/INP, CLS, FCP, TTFB) |

```bash
pnpm add @vercel/speed-insights
```

```tsx
// src/app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

// Add alongside Analytics
<SpeedInsights />
```

### Google Search Console

| Property | Detail |
|----------|--------|
| **Cost** | Free |
| **Setup** | Verify domain ownership via DNS TXT record or HTML meta tag |
| **Use** | Keyword rankings, crawl errors, indexing status, search appearance |
| **Integration** | No code — just verify and submit `sitemap.xml` URL |

### Custom Event Tracking

Track key conversion events via Vercel Web Analytics:

```typescript
// src/lib/analytics.ts
import { track } from '@vercel/analytics';

export const analytics = {
  quizStarted: () => track('quiz_started'),
  quizCompleted: (score: number) => track('quiz_completed', { score }),
  toolUsed: (tool: string) => track('tool_used', { tool }),
  leadCaptured: (source: string) => track('lead_captured', { source }),
  reportRequested: () => track('report_requested'),
  productViewed: (slug: string) => track('product_viewed', { slug }),
  productPurchased: (slug: string, amount: number) => track('product_purchased', { slug, amount }),
  contactSubmitted: () => track('contact_submitted'),
  callBooked: () => track('call_booked'),
  newsletterSubscribed: () => track('newsletter_subscribed'),
};
```

---

## 17. SEO Infrastructure

### Built-in Next.js SEO (No External Libraries)

Next.js App Router provides native SEO primitives. **No `next-seo` or third-party SEO packages are needed.**

| Feature | Next.js Native Solution |
|---------|------------------------|
| Page titles & meta descriptions | `metadata` export in `layout.tsx` / `page.tsx` |
| Open Graph tags | `metadata.openGraph` |
| Twitter Card tags | `metadata.twitter` |
| Dynamic OG images | `opengraph-image.tsx` using `next/og` (`@vercel/og`) |
| Robots | `robots.ts` at app root |
| Sitemap | `sitemap.ts` at app root |
| Canonical URLs | `metadata.alternates.canonical` |
| JSON-LD structured data | Manual `<script type="application/ld+json">` in layouts |

### Metadata Pattern

```typescript
// src/app/services/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand & Design Services | PeakSeen',
  description: 'Full-service brand identity, web design, strategy, and software development. From logo design to SaaS builds — under one studio.',
  alternates: {
    canonical: 'https://peakseen.com/services',
  },
  openGraph: {
    title: 'Brand & Design Services | PeakSeen',
    description: 'Full-service brand identity, web design, strategy, and software development.',
    url: 'https://peakseen.com/services',
    siteName: 'PeakSeen',
    locale: 'en_US',
    type: 'website',
  },
};
```

### Dynamic OG Images

```typescript
// src/app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog post cover';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // Fetch post title from MDX frontmatter
  // Render branded OG card with title, PeakSeen logo, category
  return new ImageResponse(
    (
      <div style={{ /* branded layout */ }}>
        <h1>{postTitle}</h1>
        <p>PeakSeen — The Peak Brief</p>
      </div>
    ),
    { ...size }
  );
}
```

### Sitemap Generation

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllCaseStudies, getAllProducts } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllBlogPosts();
  const caseStudies = await getAllCaseStudies();

  const staticPages = [
    '', '/about', '/services', '/work', '/products',
    '/tools', '/blog', '/brand-quiz', '/brand-report', '/contact',
    '/tools/brand-clarity-score', '/tools/brand-name-generator',
    '/tools/color-palette-generator',
  ].map((route) => ({
    url: `https://peakseen.com${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const blogPages = posts.map((post) => ({
    url: `https://peakseen.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
```

### Robots

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/'],
    },
    sitemap: 'https://peakseen.com/sitemap.xml',
  };
}
```

---

## 18. Rate Limiting & Abuse Prevention

### Upstash Redis

Serverless Redis for rate limiting API routes. No persistent connection needed — works perfectly with Vercel's serverless functions.

| Property | Detail |
|----------|--------|
| **Service** | Upstash (upstash.com) |
| **Free tier** | 10,000 commands/day, 256MB storage |
| **Package** | `@upstash/ratelimit` + `@upstash/redis` |
| **Identifier** | IP address (from `req.headers.get('x-forwarded-for')`) |

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

### Rate Limit Configuration

```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Brand Name Generator: 3 requests per 24 hours per IP
export const nameGeneratorLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '24 h'),
  prefix: 'ratelimit:name-gen',
});

// Form submissions: 5 per hour per IP
export const formSubmissionLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'ratelimit:forms',
});

// General tool usage: 20 per hour per IP
export const toolUsageLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 h'),
  prefix: 'ratelimit:tools',
});
```

### Usage in API Routes

```typescript
// Inside any rate-limited API route
const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
const { success, remaining } = await nameGeneratorLimiter.limit(ip);

if (!success) {
  return NextResponse.json(
    { error: "You've reached your free limit for today. Try again tomorrow or book a call for more help." },
    { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}
```

### Additional Environment Variables

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## 19. Hosting, Deployment & CI/CD

### Vercel

| Property | Detail |
|----------|--------|
| **Service** | Vercel (vercel.com) |
| **Free tier** | Hobby plan — 100GB bandwidth, serverless functions, edge network, preview deployments |
| **Framework preset** | Next.js (auto-detected) |
| **Build command** | `pnpm build` (auto) |
| **Output** | Hybrid — static pages + serverless functions + edge functions |

### Environments

| Environment | Branch | URL | Purpose |
|------------|--------|-----|---------|
| Production | `main` | `peakseen.com` | Live site |
| Preview | Any PR | `peakseen-{branch}-{hash}.vercel.app` | Review changes before merge |
| Development | Local | `localhost:3000` | Local development |

### Deployment Flow

```
Developer pushes to feature branch
  → Creates Pull Request
  → Vercel auto-deploys a Preview URL
  → Review & test on preview
  → Merge PR to main
  → Vercel auto-deploys to production (peakseen.com)
```

### CI Checks (GitHub Actions — Optional V1, Recommended)

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm type-check        # tsc --noEmit
      - run: pnpm lint               # eslint
      - run: pnpm build              # Catch build errors before merge
```

### Build Configuration

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/ --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "format": "prettier --write src/"
  }
}
```

### Code Quality Tools

| Tool | Purpose | Config File |
|------|---------|------------|
| ESLint | Linting | `.eslintrc.json` — extends `next/core-web-vitals` + `next/typescript` |
| Prettier | Code formatting | `.prettierrc` — single quotes, trailing commas, 100 char width |
| TypeScript | Type checking | `tsconfig.json` — strict mode |

```bash
pnpm add -D eslint eslint-config-next prettier
```

---

## 20. Domain, DNS & Email Hosting

### Domain Registration

| Domain | Registrar | Purpose |
|--------|-----------|---------|
| `peakseen.com` | Namecheap or Cloudflare Registrar | Primary domain |
| `peakseen.co` | Same registrar | Brand protection redirect |
| `peakseen.io` | Same registrar | Brand protection redirect |

### DNS Configuration

| Record Type | Host | Value | Purpose |
|------------|------|-------|---------|
| A | `@` | Vercel IP (per Vercel instructions) | Root domain → Vercel |
| CNAME | `www` | `cname.vercel-dns.com` | www subdomain → Vercel |
| TXT | `@` | Google Search Console verification | SEO verification |
| TXT | `@` | Brevo domain verification | Email deliverability |
| MX | `@` | Email provider records | Business email |
| TXT | `@` | SPF record for email | Email authentication |
| CNAME | `resend._domainkey` | Resend DKIM value | Transactional email auth |

### Business Email

| Option | Service | Cost | Notes |
|--------|---------|------|-------|
| **Recommended** | Zoho Mail | Free (1 user, 5GB) | `hello@peakseen.com` — free, professional |
| Alternative | Google Workspace | $6/mo | Full Google suite — upgrade if needed later |

### Email Authentication (Critical for Deliverability)

| Record | Purpose |
|--------|---------|
| **SPF** | TXT record listing authorized senders (Zoho/Google + Resend + Brevo) |
| **DKIM** | Domain key signing for Resend and Brevo (CNAME records provided by each service) |
| **DMARC** | TXT record with policy — start with `p=none` for monitoring, move to `p=quarantine` after validation |

```
# Example SPF record (adjust based on chosen email provider)
v=spf1 include:zoho.com include:amazonses.com include:sendinblue.com ~all
```

> **Action item:** Set up SPF, DKIM, and DMARC for all three email-sending services (Zoho/Google, Resend, Brevo) **before** sending any emails. Without this, emails land in spam.

---

## 21. Environment Variables

All secrets are stored in Vercel's environment variables dashboard and `.env.local` for development.

```bash
# ═══════════════════════════════════════════
# SUPABASE
# ═══════════════════════════════════════════
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...       # Public — safe for browser
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...           # Secret — server-only

# ═══════════════════════════════════════════
# OPENAI
# ═══════════════════════════════════════════
OPENAI_API_KEY=sk-...                         # Server-only

# ═══════════════════════════════════════════
# LEMON SQUEEZY
# ═══════════════════════════════════════════
LEMON_SQUEEZY_API_KEY=...                     # Server-only
LEMON_SQUEEZY_WEBHOOK_SECRET=...              # Server-only
LEMON_SQUEEZY_STORE_ID=...                    # Server-only

# ═══════════════════════════════════════════
# BREVO (Marketing Email)
# ═══════════════════════════════════════════
BREVO_API_KEY=xkeysib-...                     # Server-only

# ═══════════════════════════════════════════
# RESEND (Transactional Email)
# ═══════════════════════════════════════════
RESEND_API_KEY=re_...                         # Server-only

# ═══════════════════════════════════════════
# UPSTASH REDIS (Rate Limiting)
# ═══════════════════════════════════════════
UPSTASH_REDIS_REST_URL=https://...            # Server-only
UPSTASH_REDIS_REST_TOKEN=...                  # Server-only

# ═══════════════════════════════════════════
# GOOGLE APIS
# ═══════════════════════════════════════════
GOOGLE_PAGESPEED_API_KEY=...                  # Server-only (V2 — Website Audit)

# ═══════════════════════════════════════════
# CAL.COM
# ═══════════════════════════════════════════
NEXT_PUBLIC_CAL_USERNAME=peakseen             # Public — used in embed widget

# ═══════════════════════════════════════════
# SITE
# ═══════════════════════════════════════════
NEXT_PUBLIC_SITE_URL=https://peakseen.com     # Public — used for OG images, canonical URLs
```

**Security rules:**
- Variables prefixed `NEXT_PUBLIC_` are exposed to the browser — only use for non-sensitive values
- All API keys, webhook secrets, and service role keys are **server-only** (no `NEXT_PUBLIC_` prefix)
- Never commit `.env.local` to git (add to `.gitignore`)
- Use Vercel's environment variable scoping: set production-only secrets separately from preview

---

## 22. Dependency Manifest

Complete list of all production and development dependencies.

### Production Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",

    "@supabase/supabase-js": "^2.43.0",
    "@supabase/ssr": "^0.3.0",

    "framer-motion": "^11.2.0",
    "lucide-react": "^0.383.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0",

    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "reading-time": "^1.5.0",

    "openai": "^4.47.0",

    "@react-pdf/renderer": "^3.4.0",

    "@lemonsqueezy/lemonsqueezy.js": "^3.2.0",

    "resend": "^3.2.0",
    "@react-email/components": "^0.0.19",

    "@getbrevo/brevo": "^2.0.0",

    "@calcom/embed-react": "^1.5.0",

    "@upstash/ratelimit": "^1.1.0",
    "@upstash/redis": "^1.31.0",

    "@vercel/analytics": "^1.3.0",
    "@vercel/speed-insights": "^1.0.0"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "@tailwindcss/typography": "^0.5.0",

    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",

    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.12.0"
  }
}
```

> **Version note:** Pin major versions, allow minor/patch updates. Run `pnpm update` monthly and test thoroughly before deploying.

---

## 23. Architecture Diagrams

### Data Flow: Lead Capture

```
[User fills form on any page]
        │
        ▼
[Next.js Server Action]
        │
        ├──► [Supabase] Save to `leads` table
        │
        ├──► [Brevo API] Create/update contact with tags
        │        └── Triggers automation sequence
        │
        └──► [Resend] Send instant transactional email
                 └── "Thanks for your interest" / Quiz results / etc.
```

### Data Flow: Brand Name Generator

```
[User enters industry + keywords + personality]
        │
        ▼
[Client form submission]
        │
        ▼
[POST /api/tools/name-generator]
        │
        ├──► [Upstash Redis] Rate limit check (3/day per IP)
        │        ├── PASS → continue
        │        └── FAIL → return 429 with friendly message
        │
        ├──► [OpenAI API] gpt-4o-mini structured generation
        │        └── Returns JSON array of 10 names
        │
        └──► [Response] Return names to client
                 │
                 ▼
        [User sees results]
                 │
                 ▼
        [Email gate: "Save names + get 5 more"]
                 │
                 ▼
        [Server Action] → Supabase (lead) + Brevo (contact) + Resend (email with names)
```

### Data Flow: Product Purchase

```
[User clicks "Buy Now" on /products/[slug]]
        │
        ▼
[Lemon Squeezy hosted checkout overlay]
        │
        ├── Payment processed by Lemon Squeezy
        │
        ├──► [Lemon Squeezy] Sends download email to customer automatically
        │
        └──► [Webhook: order_created] → POST /api/webhooks/lemon-squeezy
                 │
                 ├──► Verify signature
                 ├──► Save to Supabase `orders` table
                 └──► (V2) Link to user account if email matches
```

### Data Flow: Quiz → PDF Report

```
[User completes 10-question quiz]
        │
        ▼
[Email gate at question 5]
        │
        ▼
[Client shows results: score + dimension breakdown]
        │
        ▼
[Server Action: POST /api/quiz/submit]
        │
        ├──► [Supabase] Save to `brand_quiz_results`
        │
        ├──► [@react-pdf/renderer] Generate PDF report on server
        │        │
        │        └──► [Supabase Storage] Upload PDF to `reports/quiz/{id}.pdf`
        │                 │
        │                 └──► Get public URL
        │
        ├──► [Supabase] Update `brand_quiz_results.report_url`
        │
        ├──► [Resend] Send email with score summary + PDF download link
        │
        └──► [Brevo] Add contact with tag `quiz-lead`
```

---

## 24. Cost Projection

### Monthly Cost at Launch (Month 1–3)

| Service | Tier | Monthly Cost | Notes |
|---------|------|-------------|-------|
| Vercel | Hobby (free) | $0 | Upgrades to Pro ($20/mo) if traffic exceeds free tier |
| Supabase | Free | $0 | 500MB DB, 1GB storage, 50K MAU |
| OpenAI | Pay-as-you-go | ~$2–$5 | ~100–200 name generation requests/month at gpt-4o-mini pricing |
| Lemon Squeezy | Transaction fee only | $0 base | 5% + $0.50 per sale |
| Brevo | Free | $0 | 300 emails/day |
| Resend | Free | $0 | 3,000 emails/month |
| Upstash Redis | Free | $0 | 10K commands/day |
| Cal.com | Free | $0 | Individual plan |
| Zoho Mail | Free | $0 | 1 user |
| Domain (peakseen.com) | Annual | ~$1/mo | ~$12/year |
| **Total** | | **~$3–$6/mo** | |

### Monthly Cost at Growth (Month 6–12)

| Service | Tier | Monthly Cost | Trigger |
|---------|------|-------------|---------|
| Vercel | Pro | $20 | >100GB bandwidth or need for team features |
| Supabase | Pro | $25 | >500MB database or >1GB storage |
| OpenAI | Pay-as-you-go | ~$10–$20 | 500+ name generations + V2 AI features |
| Brevo | Starter | $25 | >300 emails/day or advanced automation |
| Resend | Pro | $20 | >3,000 emails/month |
| Upstash Redis | Pay-as-you-go | $0–$10 | >10K commands/day |
| **Total** | | **~$100–$120/mo** | |

> **Break-even:** At $100/mo operating cost and an average digital product price of $25, PeakSeen needs ~4 product sales/month to cover infrastructure. This is achievable by Month 3 per the PRD's revenue targets.

---

## 25. Security Considerations

### Input Validation

| Surface | Validation |
|---------|-----------|
| All form inputs | Server-side validation via Server Actions (never trust client-only validation) |
| Email fields | Regex format check + disposable email domain blocklist (optional) |
| URL inputs (Website Audit) | Validate URL format, reject `localhost`, private IPs, and non-http(s) schemes |
| OpenAI inputs | Sanitize user keywords before embedding in prompts — strip HTML, limit character count (50 chars per keyword) |
| Textarea fields | Max character limits enforced server-side (e.g., 2000 chars for project descriptions) |

### Validation Library

```bash
pnpm add zod
```

Use **Zod** for all server-side input validation:

```typescript
// src/lib/schemas.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  serviceType: z.enum(['brand_identity', 'website', 'strategy', 'software', 'digital_product', 'not_sure']),
  message: z.string().min(50).max(2000),
  budgetRange: z.enum(['under_500', '500_2000', '2000_5000', '5000_plus', 'discuss']),
  referralSource: z.string().max(100).optional(),
  consentMarketing: z.boolean(),
});

export const nameGeneratorSchema = z.object({
  industry: z.string().min(1).max(50),
  keywords: z.array(z.string().max(50)).length(3),
  personality: z.array(z.string()).min(1).max(5),
  country: z.string().max(50).optional(),
});
```

### Webhook Security

| Webhook | Verification Method |
|---------|-------------------|
| Lemon Squeezy | HMAC-SHA256 signature via `X-Signature` header, validated against `LEMON_SQUEEZY_WEBHOOK_SECRET` |

### Secret Management

- All secrets stored in Vercel environment variables (encrypted at rest)
- Server-only keys never prefixed with `NEXT_PUBLIC_`
- `.env.local` in `.gitignore` — never committed
- Rotate API keys quarterly (OpenAI, Resend, Brevo)
- Supabase service role key is the most sensitive — restrict to server-side only, never expose to client

### HTTPS

- Enforced automatically by Vercel on all domains
- All external API calls use HTTPS
- Supabase connections are TLS-encrypted

---

## 26. Scaling & Growth Path

What to upgrade — and when — as PeakSeen grows beyond the free-tier limits.

### Traffic Scaling

| Threshold | Action |
|-----------|--------|
| >100GB bandwidth/month | Upgrade Vercel to Pro ($20/mo) |
| >50K unique visitors/month | Consider Vercel Pro + Cloudflare CDN in front for static assets |
| Blog grows to 100+ posts | Evaluate switching from ISR to on-demand revalidation for faster updates |
| Tool pages become traffic-heavy | Move tool results to edge functions for lower latency globally |

### Database Scaling

| Threshold | Action |
|-----------|--------|
| >500MB database | Upgrade Supabase to Pro ($25/mo) |
| Complex queries slow down | Add Drizzle ORM for query optimization and type-safe joins |
| >10K leads | Add database indexes on frequently queried columns (already included in schema above) |
| Need full-text search (blog) | Enable Supabase pg_trgm extension or add Algolia for search |

### AI Scaling

| Threshold | Action |
|-----------|--------|
| >$20/mo OpenAI spend | Monitor — this is fine for a functioning business |
| V2 AI Brand Report | Upgrade to `gpt-4o` for higher quality long-form generation |
| Response times >5s | Implement streaming responses (OpenAI streaming API + React Suspense) |
| High abuse / bot traffic | Add CAPTCHA (hCaptcha — free, privacy-friendly) to AI-powered tool forms |

### Email Scaling

| Threshold | Action |
|-----------|--------|
| >3,000 transactional emails/month | Upgrade Resend to Pro ($20/mo) |
| >300 marketing emails/day | Upgrade Brevo to Starter ($25/mo) |
| >10K contacts in Brevo | Review list hygiene — purge unengaged leads per NDPR retention policy |

### Commerce Scaling

| Threshold | Action |
|-----------|--------|
| >50 products | Consider category taxonomy redesign and server-side filtering |
| Subscription products needed | Lemon Squeezy supports recurring billing natively — no migration needed |
| International expansion | Lemon Squeezy handles multi-currency — may need to adjust pricing display |

---

*Tech Stack Guide prepared for PeakSeen — Brand & Product Studio*
*Version 1.0 · Ready for Implementation · 2025*
*This document is the single source of truth for all technology decisions, configurations, and architectural patterns. Cross-reference with the PRD for business requirements and the Design System for visual implementation.*