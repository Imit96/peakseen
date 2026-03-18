# PeakSeen — Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Ready for Development  
**Studio:** PeakSeen — Brand & Product Studio  
**Tagline:** Reach Your Peak. Be Seen.  
**Last Updated:** 2025

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Target Audience](#3-target-audience)
4. [Tech Stack](#4-tech-stack)
5. [Information Architecture](#5-information-architecture)
6. [Design System](#6-design-system)
7. [Page Specifications](#7-page-specifications)
   - [7.1 Home (/)](#71-home-)
   - [7.2 About (/about)](#72-about-about)
   - [7.3 Services (/services)](#73-services-services)
   - [7.4 Work / Portfolio (/work)](#74-work--portfolio-work)
   - [7.5 Products / Shop (/products)](#75-products--shop-products)
   - [7.6 Tools (/tools)](#76-tools-tools)
   - [7.7 Blog (/blog)](#77-blog-blog)
   - [7.8 Brand Quiz (/brand-quiz)](#78-brand-quiz-brand-quiz)
   - [7.9 Contact (/contact)](#79-contact-contact)
   - [7.10 Start / Onboarding (/start)](#710-start--onboarding-start)
8. [Web App Features (Interactive Tools)](#8-web-app-features-interactive-tools)
   - [8.1 Brand Clarity Score](#81-brand-clarity-score)
   - [8.2 Brand Name Generator](#82-brand-name-generator)
   - [8.3 Brand Color Palette Generator](#83-brand-color-palette-generator)
   - [8.4 Website Audit Checker](#84-website-audit-checker)
   - [8.5 Brand Archetype Quiz](#85-brand-archetype-quiz)
   - [8.6 Free Brand Report](#86-free-brand-report)
9. [Global Components](#9-global-components)
10. [Authentication & User Accounts](#10-authentication--user-accounts)
11. [Digital Product Shop](#11-digital-product-shop)
12. [Email & Lead Capture System](#12-email--lead-capture-system)
13. [SEO Requirements](#13-seo-requirements)
14. [Performance Requirements](#14-performance-requirements)
15. [Accessibility Requirements](#15-accessibility-requirements)
16. [Analytics & Tracking](#16-analytics--tracking)
17. [Data Privacy, NDPR & Content Governance](#17-data-privacy-ndpr--content-governance)
18. [Deployment & Infrastructure](#18-deployment--infrastructure)
19. [Development Phases & Milestones](#19-development-phases--milestones)
20. [Out of Scope (V1)](#20-out-of-scope-v1)
21. [Open Questions & Decisions](#21-open-questions--decisions)

---

## 1. Executive Summary

PeakSeen is a Brand & Product Studio that helps startups, SMEs, and corporates define their purpose and communicate it to the right audiences. The PeakSeen website is not a brochure — it is a **web application** that simultaneously serves as a portfolio, a digital product shop, a lead generation engine, and a suite of free interactive tools that drive organic traffic and convert visitors into paying clients.

The website must work 24/7 without the founder's presence: capturing leads, selling digital products, demonstrating expertise through tools, and booking discovery calls — all automatically.

### Core Product Pillars

| Pillar | Description |
|--------|-------------|
| **Venture-as-a-Service Portal** | A dashboard where clients track milestones, access assets, and view their strategy ledger. |
| **Interactive Lead Engine** | Tools like the Brand Calculator and Venture Cost Estimator that offer instant value for emails. |
| **Marketplace (Shop)** | Sell digital templates and toolkits passively with one-click checkouts. |
| **Services** | Convert visitors from tools/portfolio into booked client projects via upsells. |
| **Portfolio & Content** | SEO-driven blog and case studies that establish authority and build trust. |

---

## 2. Product Vision & Goals

### Vision
Build the most helpful brand studio website in the African creative tech space — one that gives value before asking for anything, builds trust through demonstrated expertise, and converts that trust into revenue. 
**Long-term aspiration:** To become a global studio where visionary companies come to define and launch the future of their brands. Ultimately, PeakSeen functions as a **"Venture-as-a-Service" portal** where businesses diagnose brand health, estimate tech costs, and manage startup growth from one command center.

### Brand Strategy & Personality
**Core Purpose:** To help businesses discover their highest potential and communicate it with clarity and impact.
**Mission:** We transform ideas into powerful brands, digital products, and experiences that elevate companies to their peak.

**Brand Values:**
1. Clarity
2. Craftsmanship
3. Strategic thinking
4. Cultural relevance
5. Innovation

**Brand Personality:**
Think of the tone as: *Luxury studio × creative tech lab.*
*   **Intelligent:** Strategic thinking, insight-driven
*   **Minimal:** Clean design, simplicity
*   **Visionary:** Forward-looking concepts
*   **Confident:** Bold typography and messaging
*   **Cultural:** References fashion, tech, art

**Brand Voice:**
PeakSeen communication should be precise, confident, intelligent, and minimal.
*   *Weak:* "We help companies grow their brand."
*   *Strong:* "We design brands that rise above noise."
*   *Structure:* Short, powerful, declarative sentences.

### Primary Goals

**Goal 1 — Lead Generation**  
Capture a minimum of 50 qualified email leads per month by Month 3, growing to 200+ by Month 6, using free interactive tools and lead magnets.

**Goal 2 — Digital Product Revenue**  
Generate passive income of $100–$500/month from digital product sales by Month 4, without requiring client interaction.

**Goal 3 — Client Acquisition**  
Book at least 2 new paying client projects per month by Month 3 through the website alone (no outbound needed).

**Goal 4 — Authority Building**  
Rank on the first page of Google for at least 5 target keywords within 6 months through SEO-optimised blog content and tool pages.

**Goal 5 — Automation**  
90% of the user journey — from discovery to purchase or booking — should require zero manual intervention from the PeakSeen team.

### Success Metrics (KPIs)

| Metric | Description | Target (Month 6) |
|--------|-------------|---------------|
| **Lead Conversion Rate** | % of visitors who complete the Calculator or Estimator | > 15% |
| **Product Pull-Through** | Marketplace customers who upgrade to full consultancy | > 5% |
| **Onboarding Speed** | Time saved by using the Portal vs email templates | 80% reduction |
| Email subscribers | Total captured via the Interactive Lead Engine | 500 |
| Discovery calls booked | Qualified leads requesting a build/brand project | 10/month |
| Digital product sales | Units sold via the PeakSeen Marketplace | 40/month |

---

## 3. Target Audience

### Primary Personas

**Persona 1 — The Scrappy Founder**
- Early-stage startup founder, 24–38 years old
- Has a product or service idea but no brand identity
- Budget-conscious — will start with a digital product or small project
- Discovers PeakSeen through the Brand Name Generator or a blog post
- Conversion path: Free tool → email capture → product purchase → project inquiry

**Persona 2 — The Growth-Stage SME**
- Business has been running 1–5 years, has some brand presence but it's inconsistent
- Has budget for a proper brand identity or website overhaul
- Discovers PeakSeen through LinkedIn content or referral
- Conversion path: Portfolio → services page → discovery call → retainer

**Persona 3 — The Corporate Buyer**
- Marketing manager or decision-maker at a mid-to-large company
- Needs a reliable studio for ongoing brand/design support
- High-value, longer sales cycle — needs strong social proof
- Conversion path: Work/portfolio → about page → contact form → custom proposal

### Secondary Audience
- Freelancers and designers looking to buy templates
- Students and early entrepreneurs looking for free tools and guides
- Startup community members who discover PeakSeen on Product Hunt or Indie Hackers

---

## 4. Tech Stack

All tools below have free tiers sufficient for launch and early growth.

### Core

| Layer | Tool | Reason |
|-------|------|--------|
| **Framework** | Next.js 14+ (App Router) | SEO-friendly, fast, React-based, Vercel-native |
| **Language** | TypeScript | Type safety, better DX |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first, fast to build |
| **Animations** | Framer Motion | Smooth, production-quality animations |
| **Icons** | Lucide React | Consistent, lightweight icon set |
| **Hosting** | Vercel | Free tier, auto-deploys from GitHub, edge network |

### Data & Backend

| Layer | Tool | Reason |
|-------|------|--------|
| **Database** | Supabase (PostgreSQL) | Free tier, real-time, auth included |
| **Auth** | Supabase Auth | Email/social login for accounts |
| **File Storage** | Supabase Storage | Store generated PDFs and assets |
| **API Routes** | Next.js API Routes | Keep everything in one codebase |

### Content & CMS

| Layer | Tool | Reason |
|-------|------|--------|
| **Blog & Portfolio Content** | Next.js MDX (`next/mdx` or `next-mdx-remote`) | File-system based routing, no external API calls, native React Server Components support |

### Commerce & Payments

| Layer | Tool | Reason |
|-------|------|--------|
| **Digital Products** | Lemon Squeezy | Free to start, handles VAT, instant payouts |
| **Checkout** | Lemon Squeezy hosted checkout | Embedded or redirect flow |
| **Invoicing** | Lemon Squeezy | Auto-generated for every purchase |

### Email & CRM

| Layer | Tool | Reason |
|-------|------|--------|
| **Email Marketing** | Brevo (formerly Sendinblue) | 300 free emails/day, automation flows |
| **Transactional Email** | Resend + React Email | Build emails as React components and send via Server Actions |
| **Forms** | Next.js Server Actions | Native forms handled securely on the server, no webhooks needed |
| **Lead Database** | Supabase | Store all leads with source tracking |

### Tools & Utilities

| Layer | Tool | Reason |
|-------|------|--------|
| **AI Features** | OpenAI API (GPT-4o-mini) | Brand Name Generator, report generation |
| **PDF Generation** | @react-pdf/renderer or puppeteer | Generate Brand Report PDFs |
| **Scheduling** | Cal.com embed | Free, open-source booking widget |
| **Analytics** | Vercel Web Analytics | Privacy-friendly, built directly into Vercel dashboard, no external scripts |
| **SEO Data** | Next.js Metadata API | Native meta tags, structured data, canonicals out-of-the-box |
| **OG Images** | Next.js `next/og` | Edge-generated dynamic social sharing images directly in Next.js |

### Repository & CI/CD

| Tool | Use |
|------|-----|
| GitHub | Version control, free for public/private repos |
| Vercel | Auto-deploy on push to main, preview deployments on PRs |
| GitHub Actions | Run tests and lint checks on PRs (optional for V1) |

---

## 5. Information Architecture

```
peakseen.com/
│
├── /                          → Home
├── /about                     → About PeakSeen
├── /services                  → Full services listing with pricing
│   ├── /services/brand-foundation
│   ├── /services/brand-expression
│   ├── /services/strategy
│   └── /services/build
│
├── /work                      → Portfolio / Case Studies
│   └── /work/[slug]           → Individual case study
│
├── /products                  → Digital product shop
│   └── /products/[slug]       → Individual product page
│
├── /tools                     → All free interactive tools (The Lead Engine)
│   ├── /tools/brand-clarity-score
│   ├── /tools/venture-cost-estimator
│   ├── /tools/brand-name-generator
│   ├── /tools/color-palette-generator
│   ├── /tools/website-audit
│   └── /tools/brand-archetype-quiz
│
├── /blog                      → Blog index
│   └── /blog/[slug]           → Individual blog post
│
├── /brand-quiz                → Brand Clarity Quiz (main lead magnet)
├── /brand-report              → Free Brand Report request form
├── /contact                   → Contact & brief submission
├── /start                     → Client onboarding flow
│
├── /dashboard                 → Authenticated Client Command Center
│   ├── /dashboard/overview    → Project milestones (Gantt/Kanban)
│   ├── /dashboard/vault       → Asset vault (logos, design systems, repos)
│   ├── /dashboard/ledger      → Strategy ledger (purpose, audience, docs)
│   └── /dashboard/downloads   → Purchased digital products
│
└── /legal
    ├── /legal/privacy
    └── /legal/terms
```

---

## 6. Design System

### Brand Colors

The color palette should reflect clarity, elevation, and modernity.

```css
:root {
  /* Primary Palette (Neutral Base) */
  --color-charcoal:    #1A1A1A;   /* Primary backgrounds — trust, depth */
  --color-ivory:       #F9F8F6;   /* Text backgrounds — warmth, premium feel */
  --color-warm-grey:   #EBEBEB;   /* UI elements, Borders, dividers */
  
  /* Accent Colors (Pick one bold accent per theme/brand expression) */
  --color-burnt-orange:#D95C3C;   /* Accent — energy, visibility */
  --color-electric-blue:#2B5BEE;  /* Alternative Accent */
  --color-forest-green:#1B4D3E;   /* Alternative Accent */

  /* Semantic Tokens */
  --bg-primary:        var(--color-charcoal);
  --bg-surface:        var(--color-ivory);
  --text-primary:      var(--color-ivory); /* Inverse for dark mode hero */
  --text-body:         #4A4A4A;
  --text-muted:        #8C8C8C;
  --accent:            var(--color-burnt-orange);
  --border:            var(--color-warm-grey);
}
```

### Typography

Use two typefaces only to create a "tech × editorial" contrast.

```css
/* Fonts to import/host locally via next/font */
/* Primary (Brand Personality): Modern and premium. Clean, contemporary (e.g., Neue Montreal, Satoshi, Inter Tight, Suisse International) */
--font-display: 'Satoshi', sans-serif;

/* Secondary (Editorial/Content): Used for articles and storytelling (e.g., IBM Plex Serif, Canela, Editorial New) */
--font-body:    'Editorial New', serif;
--font-mono:    'JetBrains Mono', monospace;

/* Scale */
--text-xs:    0.75rem;    /* 12px */
--text-sm:    0.875rem;   /* 14px */
--text-base:  1rem;       /* 16px */
--text-lg:    1.125rem;   /* 18px */
--text-xl:    1.25rem;    /* 20px */
--text-2xl:   1.5rem;     /* 24px */
--text-3xl:   1.875rem;   /* 30px */
--text-4xl:   2.25rem;    /* 36px */
--text-5xl:   3rem;       /* 48px */
--text-6xl:   3.75rem;    /* 60px */
--text-7xl:   4.5rem;     /* 72px */
--text-8xl:   6rem;       /* 96px */
```

### Spacing & Grid System

Use a strict design system reflecting editorial layout, large typography, and minimal UI.
- **Grid:** 12-column grid for web
- **Margins:** Strong margins, large whitespace, modular sections
- Section vertical padding: `py-24` (96px) on desktop, `py-16` (64px) on mobile
- Container max-width: `max-w-7xl` with `px-6` or `px-8` horizontal padding
- Card internal padding: `p-8` on desktop, `p-6` on mobile
- Element gap: `gap-6` or `gap-8` in grids

### Border Radius

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   16px;
--radius-xl:   24px;
--radius-full: 9999px;
```

### Shadows

```css
--shadow-sm:  0 1px 3px rgba(26,26,46,0.08);
--shadow-md:  0 4px 16px rgba(26,26,46,0.12);
--shadow-lg:  0 8px 32px rgba(26,26,46,0.16);
--shadow-accent: 0 4px 24px rgba(233,69,96,0.25);
```

### Animation & Motion Identity

Since PeakSeen is a digital studio, motion communicates technical sophistication.
- **Animation style:** Smooth transitions, subtle parallax, typography reveals, grid animations.
- **Page transitions:** Fade + slide up (0.3s ease-out)
- **Hover states:** Scale 1.02, shadow increase (0.2s ease)
- **Scroll reveals:** Staggered fade-in for list items (0.1s delay each)
- **Loading states:** Skeleton shimmer (never spinners for content)
- **Tool interactions:** Smooth progress bars, animated result reveals
- **Reduced motion:** Respect `prefers-reduced-motion` — disable all non-essential animations

### Imagery Style

PeakSeen imagery should communicate vision and elevation. Think *fashion editorial × architecture*.
- **Direction:** Architectural structures, abstract landscapes, light and shadow, modern cities, minimal interiors, creative culture.
- **Avoid:** Cliché stock photos, handshake business imagery.

### Component Library

The following shared components must be built before page work begins:

| Component | Description |
|-----------|-------------|
| `<Button>` | Primary, secondary, ghost, destructive variants + sizes |
| `<Card>` | Base card with hover state — used across portfolio, products, blog |
| `<Badge>` | Pill labels for service tiers, categories, status |
| `<Input>` | Text, email, textarea, select — with error/success states |
| `<Modal>` | Accessible dialog with overlay, escape key, focus trap |
| `<Toast>` | Success/error notification system |
| `<Skeleton>` | Loading placeholder for all data-fetched content |
| `<ProgressBar>` | Used in quiz/tool flows |
| `<Avatar>` | Profile image with fallback initials |
| `<Tag>` | Filter tags for portfolio and blog |
| `<Tooltip>` | Hover info on icons and labels |
| `<Navbar>` | Global navigation (see Section 9) |
| `<Footer>` | Global footer (see Section 9) |
| `Metadata API` | Manage metadata natively in `layout.tsx` and `page.tsx` (replaces `<SEOHead>`) |
| `<CTA Block>` | Reusable call-to-action section used at the bottom of most pages |

---

## 7. Page Specifications

### 7.1 Home (/)

**Purpose:** Convert cold visitors into curious explorers. The homepage must communicate what PeakSeen is in under 5 seconds, demonstrate credibility, offer immediate value, and guide visitors toward a next action.

**Priority:** P0 (Must ship in Phase 1)

#### Sections

---

**Section 1 — Hero**

- **Layout:** Full-viewport height. Dark charcoal background. Large headline on the left, animated visual/canvas on the right.
- **Headline:** `Reach Your Peak. Be Seen.` (Display font, 72–96px, ivory)
- **Subheadline:** `PeakSeen is a brand & product studio that helps startups and businesses define their purpose — and makes the world see it.` (Body font, 20px, grey)
- **CTAs:**
  - Primary: `Start a Project →` (links to /start)
  - Secondary: `Get a Free Brand Report` (links to /brand-report) — ghost button
- **Trust line:** `Trusted by startups, SMEs, and growing brands` with 3–4 small logo placeholders (use placeholder logos on launch, replace with real clients ASAP)
- **Animation:**
  - Headline words animate in with stagger (Framer Motion, slide up + fade in)
  - Right-side: Animated abstract composition — orbiting shapes, floating brand elements (text fragments, color swatches) in a subtle loop. Keep it brand-aligned, not distracting.
  - Scroll indicator at bottom (bouncing arrow or dot indicator)

---

**Section 2 — Value Proposition Strip**

- **Layout:** Full-width dark strip, 3 or 4 columns
- **Content:**
  - `Brand Identity` — icon + short description
  - `Digital Products` — icon + short description
  - `Software & Apps` — icon + short description
  - `Strategy & Growth` — icon + short description
- Each item has a subtle hover lift effect

---

**Section 3 — What We Do (Services Overview)**

- **Layout:** Left text block + right staggered card grid
- **Headline:** `Everything your brand needs to succeed`
- **Cards:** One per service tier (Brand Foundation, Brand Expression, Strategy, Build). Each shows: tier name, 3 bullet points, and a `Learn more →` link
- **CTA:** `View all services →` below the grid

---

**Section 4 — Featured Work**

- **Layout:** Large horizontal scroll or 3-column masonry grid
- **Content:** 3 featured case studies. Each card shows: project image/mockup, client name (or "Confidential"), service type, and a short outcome stat (e.g. "300% increase in brand recognition")
- **CTA:** `See all work →` links to /work
- **Empty state:** Before any real work exists, show 3 beautifully designed concept/spec work cards labelled "Concept Work" to demonstrate capability

---

**Section 5 — The Interactive Lead Engine (Free Tools)**

- **Layout:** Dark section, tool cards in a horizontal row
- **Headline:** `Diagnose your brand. Estimate your build.`
- **Subheadline:** `Interactive tools to help you reach your peak. No sign-up needed.`
- **Tool Cards (3):** Each card shows the tool icon, name, one-line description, and a `Try it free →` button
- **Tools launching in V1:**
  1. Brand "Peak" Calculator (Clarity Score)
  2. Brand Name Generator
  3. Color Palette Generator
  *(Other tools returning as "Coming Soon")*

---

**Section 6 — Digital Products Preview**

- **Layout:** 3–4 product cards in a horizontal scroll on mobile, grid on desktop
- **Headline:** `Ready-made tools for your brand`
- **Subheadline:** `Buy once. Use forever. No designer needed.`
- **Cards:** Show product image, name, short description, price
- **CTA:** `Browse the shop →` links to /products

---

**Section 7 — Social Proof / Testimonials**

- **Layout:** 3 testimonial cards or a marquee scroll
- **Content:** Client name, company, testimonial quote, star rating
- **Empty state at launch:** Show one testimonial from a free/discounted early client. Add placeholder cards with "More testimonials coming soon" styled tastefully.

---

**Section 8 — The Brand Report CTA**

- **Layout:** Full-width, high contrast section. Navy or red background.
- **Headline:** `Not sure where your brand stands?`
- **Subheadline:** `Get a free, personalised Brand Report — a 6-page PDF that scores your brand across 5 areas and tells you exactly what to fix.`
- **CTA:** `Get My Free Brand Report →` links to /brand-report
- **Trust note:** `No spam. No sales call unless you want one. Delivered within 24 hours.`

---

**Section 9 — Blog Preview**

- **Layout:** 3 latest blog posts in a card grid
- **Each card:** Cover image, category badge, title, 1-line excerpt, read time, date
- **CTA:** `Read the blog →` links to /blog

---

**Section 10 — Final CTA**

- **Headline:** `Ready to reach your peak?`
- **Two CTAs:**
  - `Start a Project` → /start
  - `Book a Free Call` → Cal.com embed or /contact

---

### 7.2 About (/about)

**Purpose:** Build trust, humanise the studio, communicate values and approach. This is where curious visitors decide whether they trust PeakSeen with their brand.

**Priority:** P1

#### Sections

**Hero:**
- Headline: `We help brands find their peak — and make the world see them`
- Short paragraph about PeakSeen's founding story and mission

**Our Story:**
- Narrative text block explaining the founding motivation, what problem PeakSeen solves, and who the founder is
- Include founder photo and short bio when available

**What We Believe:**
- 4–5 belief statements laid out as large typographic statements
- Examples: `"Every business deserves a brand that reflects its real value."` / `"Purpose-first design isn't a luxury — it's a strategy."`

**How We Work:**
- 3–4 step process (Discover → Define → Design → Deliver) with icon and description per step

**The Audiences We Serve:**
- 3 audience cards: Early-Stage Startups / Small & Medium Businesses / Corporates & Large Brands
- Each card: who they are, what they typically need, how PeakSeen helps

**Numbers / Social Proof (when available):**
- Stats: projects delivered, industries served, countries, client satisfaction score
- At launch: Use honest numbers — even "5 projects. 3 industries. 1 mission." is credible.

**Final CTA:**
- `Work with us` → /start
- `See our work` → /work

---

### 7.3 Services (/services)

**Purpose:** Clearly explain every service, its value, who it's for, and what it costs. Reduce friction to booking.

**Priority:** P0

#### Page Structure

**Hero:**
- Headline: `Everything your brand needs — under one studio`
- Short description of the four-tier model

**Tier Navigation:**
- Sticky or scrollspy tab navigation: `Brand Foundation | Brand Expression | Strategy | Build`
- Clicking a tab smooth-scrolls to that section

**Per-Tier Section (repeat for all 4 tiers):**

Each tier section includes:
- Tier label (e.g. `TIER 1`) with accent colour
- Tier name (e.g. `Brand Foundation`)
- Who it's for (1–2 sentences)
- Services list with descriptions (not just bullet points — each service gets 1–2 sentences explaining the value)
- What's included grid (icon + label per deliverable)
- Pricing block:
  - Starting price or price range
  - "Most popular" badge if applicable
  - `Get a Quote` button → /contact or /start with the tier pre-selected

**Services detail for each tier:**

*Tier 1 — Brand Foundation:*
- Purpose & Positioning Workshop
- Brand Naming & Strategy
- Logo & Visual Identity Design
- Typography & Colour System
- Brand Voice & Messaging Guide
- Brand Guidelines Document

*Tier 2 — Brand Expression:*
- Website Design & Development
- Social Media Aesthetic & Template Kit
- Email / Newsletter Template Design
- Pitch Deck & Presentation Design
- Business Card & Stationery Design
- Product Packaging Design

*Tier 3 — Strategy & Growth:*
- Content Strategy & Planning
- Social Media Launch Strategy
- SEO & Digital Presence Strategy
- Brand Launch Campaign Planning
- Audience Research & Persona Development
- Competitor Analysis & Market Positioning

*Tier 4 — Build (Venture Arm):*
- Custom Software & Web Application Development
- Mobile App Development
- SaaS Product Design & Development
- E-commerce Store Build
- Business-in-a-Box (idea to launch)
- MVP Development

**Pricing Model Explainer:**
- Small section explaining the 4 pricing models: Project-Based, Retainer, Equity+Fee, Revenue Share

**FAQ Section:**
- 6–8 common questions (accordion style)
- Examples:
  - "How long does a brand identity project take?"
  - "Can I start with just a logo?"
  - "Do you work with international clients?"
  - "What's the minimum project budget?"
  - "Do you offer payment plans?"

**Final CTA:**
- `Not sure which tier you need?` → Book a free 20-min discovery call (Cal.com)

---

### 7.4 Work / Portfolio (/work)

**Purpose:** Demonstrate expertise and results. This is the primary trust-builder for Persona 2 (SME) and Persona 3 (Corporate).

**Priority:** P1

#### Page Structure

**Hero:**
- Headline: `Work that speaks for itself`
- Subheadline: Brief description of PeakSeen's approach to projects

**Filter Bar:**
- Filter by service type: All / Branding / Web / Strategy / Build
- Filter by industry (optional in V1)

**Portfolio Grid:**
- Masonry or uniform grid layout — 2 columns on desktop, 1 on mobile
- Each card:
  - Project thumbnail/cover image (high quality — this is everything)
  - Client/project name
  - Service type badges
  - Short one-line outcome (e.g. "Complete brand identity for a Lagos fintech startup")
  - `View Case Study →` link

**Individual Case Study (/work/[slug]):**

Each case study is a standalone page with:
- Full-width hero image or mockup
- Client overview (name, industry, location — if not confidential)
- The Challenge (what problem did the client have?)
- The Approach (PeakSeen's process and thinking)
- The Work (full visual showcase: logos, mockups, screenshots)
- The Outcome (measurable results where possible)
- Services Used (tags)
- Next Case Study navigation

**Empty State at Launch:**
- Show 2–3 high-quality "Concept / Spec Work" case studies clearly labelled as such
- These demonstrate skill and process even without paid client work

---

### 7.5 Products / Shop (/products)

**Purpose:** Sell digital products passively. This is the zero-effort revenue stream.

**Priority:** P1

#### Page Structure

**Hero:**
- Headline: `Ready-made brand tools`
- Subheadline: `Buy once. Download instantly. No designer needed.`

**Category Filter:**
- All / Design Templates / Strategy Toolkits / Guides & Playbooks / Bundles

**Product Grid:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Each product card:
  - Product preview image
  - Category badge
  - Product name
  - Short 1-line description
  - Price (with "Sale" badge if discounted)
  - `View Product →` link
  - Quick "Add to Cart" or "Buy Now" option

**Individual Product Page (/products/[slug]):**
- Product name and description
- High-quality preview images (gallery with lightbox)
- What's included list (specific files, formats, page counts)
- Who it's for
- How to use it (3-step explainer)
- Price + Buy Now button (Lemon Squeezy checkout)
- Customer reviews (when available)
- Related products section
- FAQ for this product

**Checkout Flow:**
- Use Lemon Squeezy's hosted checkout (redirect or overlay)
- After purchase: confirmation page + automatic download email sent by Lemon Squeezy

**Post-Purchase:**
- Download link delivered by email immediately
- If user has an account, download also appears in /dashboard/downloads

#### Initial Product Catalogue (Launch Scope)

| Product | Format | Price |
|---------|--------|-------|
| Brand Identity Starter Kit | Figma | $29 |
| Social Media Content Pack (30 days) | Canva | $19 |
| Brand Clarity Workbook | Notion/PDF | $19 |
| Complete Brand Starter Bundle (All 3 products) | Mixed | $59 |

*(Additional templates like Pitch Decks, UI Kits, and Newsletters to be added iteratively post-launch).*

---

### 7.6 Tools (/tools)

**Purpose:** Hub page for all free interactive tools. SEO entry point. Demonstrates expertise while capturing leads.

**Priority:** P1

#### Page Structure

**Hero:**
- Headline: `Free brand tools. Real results.`
- Subheadline: `Built by PeakSeen to help you understand and grow your brand — at no cost.`

**Tools Grid:**
- 3-column grid of tool cards on desktop
- Each card: Tool icon, name, description, what you get from using it, `Try it free →` CTA
- Card has animated hover state revealing "Takes X minutes" and "No sign-up required"

**Tools listed (V1):**
1. Brand "Peak" Calculator (Clarity Score)
2. Brand Name Generator
3. Brand Color Palette Generator
*(Venture Cost Estimator, Website Audit, and Archetype Quiz labeled as "Coming Soon")*

**Social proof:** "X people have used our tools this month" (live counter using Supabase)

---

### 7.7 Blog (/blog)

**Purpose:** SEO authority, organic traffic, and lead nurturing. Blog readers are the top of the funnel.

**Priority:** P1

#### Page Structure

**Hero:**
- Headline: `The Peak Brief`
- Subheadline: `Brand strategy, design thinking, and growth insights for startups and businesses.`
- Newsletter signup inline: `Subscribe for weekly insights → [email input] [Subscribe]`

**Featured Post:**
- Large hero card with cover image, title, excerpt, author, and date

**Post Grid:**
- 3-column grid: cover image, category badge, title, excerpt, read time, date
- Pagination or infinite scroll

**Category Filter:**
- Branding / Design / Strategy / Startups / Tools & Resources

**Individual Post (/blog/[slug]):**
- Full-width cover image
- Title, category, author, date, read time
- Table of contents (auto-generated from headings) — sticky on desktop
- Article body (MDX rendered with custom components for callouts, code blocks, etc.)
- In-article CTAs: tool promotion, relevant product, newsletter signup (inserted contextually)
- Tags
- Author bio block at the end
- Related posts (3 cards)
- Comment section (optional V1 — can use Giscus, GitHub-based, free)
- Social share buttons

#### Initial SEO Content Strategy

Target keywords for first 12 posts:

| Post Title | Target Keyword | Intent |
|-----------|---------------|--------|
| How to Define Your Brand Identity as a Startup | brand identity startup | Informational |
| What Is a Brand Design System and Why You Need One | brand design system | Informational |
| 10 Logo Design Mistakes Nigerian Startups Make | logo design mistakes | Informational |
| How to Write a Brand Voice Guide (with Template) | brand voice guide | Informational |
| Website vs Landing Page: What Does Your Business Actually Need? | website vs landing page | Informational |
| How to Create a Social Media Aesthetic for Your Business | social media aesthetic | Informational |
| What Is a Brand Archetype? Find Yours in 5 Minutes | brand archetype | Informational |
| The Best Free Design Tools for Startups in 2025 | free design tools startups | Informational |
| How to Choose a Brand Color Palette (+ Free Generator) | brand color palette | Informational |
| From Idea to Launch: Building a Business Brand from Scratch | build business brand | Informational |
| What Makes a Great Pitch Deck Design? | pitch deck design | Informational |
| How to Audit Your Website for Free | website audit free | Informational |

---

### 7.8 Brand Quiz (/brand-quiz)

**Purpose:** Primary lead magnet. Captures emails while providing genuine value through a scored brand assessment.

**Priority:** P0

See full specification in Section 8.1.

---

### 7.9 Contact (/contact)

**Purpose:** Convert intent into action. Make it easy for clients to start a conversation.

**Priority:** P0

#### Page Structure

**Hero:**
- Headline: `Let's build something great`
- Two CTAs side by side:
  - `Book a free discovery call` → Cal.com embed
  - `Send us a brief` → scroll to form

**Contact Form:**

Fields:
- Name (required)
- Email (required)
- Company / Brand Name (optional)
- What do you need help with? (dropdown: Brand Identity / Website / Strategy / Software / Digital Product / Not sure yet)
- Tell us about your project (textarea — required, min 50 characters)
- Budget range (dropdown: Under $500 / $500–$2,000 / $2,000–$5,000 / $5,000+ / Let's discuss)
- How did you hear about PeakSeen? (dropdown for tracking)
- Submit button: `Send Brief →`

**On Submit (via Next.js Server Actions):**
- Show success toast: "We've received your brief! Expect a response within 24 hours."
- Send auto-reply email using Resend + React Email
- Save to Supabase leads table with all form data + source
- Notify PeakSeen via email

**Calendar Embed:**
- Cal.com widget embedded directly on page (30-min "Brand Discovery Call" event type)
- Show below or beside the contact form

**Contact Details:**
- Email: hello@peakseen.com
- Social links: Instagram, LinkedIn, X/Twitter

**FAQ Teaser:**
- 3 quick FAQs with links to /services for full FAQ

---

### 7.10 Start / Onboarding (/start)

**Purpose:** A guided onboarding flow for new clients — like a smart intake form that qualifies them and collects the right information.

**Priority:** P2 (Phase 2)

#### Flow

**Step 1 — Who are you?**
- Business name
- Industry (dropdown)
- Business stage (Idea / Early Startup / Growing Business / Established Company)

**Step 2 — What do you need?**
- Multi-select: Brand Identity / Website / Strategy / App/Software / Not sure
- Optional: Describe your project briefly (textarea)

**Step 3 — What's your budget?**
- Slider or option selector
- Budget ranges: Under $500 / $500–$2k / $2k–$5k / $5k+

**Step 4 — Timeline**
- ASAP / Within 1 month / 1–3 months / Flexible

**Step 5 — Contact details**
- Name, email, phone (optional)

**On Complete:**
- Summary screen: "Here's what you've told us. We'll reach out within 24 hours with a tailored proposal."
- Save to Supabase + notify PeakSeen
- Trigger welcome email sequence in Brevo
- Show booking CTA: "Want to talk now? Book a 30-min call."

---

## 8. Web App Features (Interactive Tools)

All tools share these common behaviours:
- No login required to use the tool
- Email capture before showing full results (except Color Palette Generator — no gate)
- Results saved to Supabase and associated with email
- If user creates account later, results are linked to their profile
- Share results via unique URL or copy link
- All results pages have a CTA specific to the tool's context
- **The Enticement UX Flow:** 
  1. *Landing:* High-impact visual + clear CTA to start the tool.
  2. *Interaction:* User spends ~2 minutes answering questions or adjusting inputs.
  3. *The Hook:* Soft email gate to view the full report, score, or detailed breakdown.
  4. *The Upsell:* The results highlight gaps (e.g., "Outdated Tech Stack"). A contextual CTA invites them to book a build or design service organically.

---

### 8.1 Brand Clarity Score

**Route:** `/tools/brand-clarity-score` (also accessible at `/brand-quiz`)  
**Description:** A 10-question quiz that scores a business's brand across 5 dimensions. Returns a score out of 100 and a personalised recommendations report.

**The 5 Dimensions Scored:**
1. Purpose & Positioning (2 questions)
2. Visual Identity (2 questions)
3. Brand Voice & Messaging (2 questions)
4. Digital Presence (2 questions)
5. Audience Clarity (2 questions)

**Question Format:**
- Multiple choice (4 options per question)
- Each option has a hidden weight (0–3 points)
- Example:
  > "How would you describe your logo?"
  > a) We don't have one yet (0 pts)
  > b) We have one but it was made quickly / cheaply (1 pt)
  > c) It's decent but not consistent across our materials (2 pts)
  > d) It's professional, consistent, and memorable (3 pts)

**Scoring:**
- Max score: 60 points → normalised to 100
- Score bands:
  - 0–39: "Your brand needs urgent attention"
  - 40–59: "Your brand has potential — with some key gaps"
  - 60–79: "Solid foundation with room to grow"
  - 80–100: "Strong brand — let's take it further"

**User Flow:**
1. Landing screen: headline, what they'll get, `Start the Quiz →` button
2. Progress bar at top (Question X of 10)
3. One question per screen with animated transitions
4. Question 5: soft email gate — "Enter your email to see your full score and report"
5. Results screen: score (animated number count-up), dimension breakdown (radar chart or 5 bar segments), score band message
6. CTA: `Download your full report (PDF)` — delivers via email
7. Secondary CTA: `Book a free call to fix your score`

**Technical Requirements:**
- State managed client-side (React useState or Zustand)
- On completion: POST to `/api/quiz/submit` → save to Supabase, trigger Brevo email
- PDF generated using @react-pdf/renderer or puppeteer on the server
- Report stored in Supabase Storage, download link included in email

**Data Schema (Supabase):**
```sql
table: brand_quiz_results
- id: uuid (primary key)
- email: text (not null)
- business_name: text
- score: integer
- dimension_scores: jsonb
- answers: jsonb
- created_at: timestamp
- report_url: text
```

---

### 8.2 Venture Cost Estimator (Deferred to V2)

**Route:** `/tools/venture-cost-estimator`  
**Description:** A dynamic slider and checkbox tool where users select the services they need to get a non-binding price range and timeline estimate for their venture.

**Input Form:**
- **Goal:** Launch an MVP / Rebrand / Build an App / Improve Marketing
- **Services (Checkboxes):** 
  - Brand Identity Development
  - UX/UI Product Design
  - MVP Web Development
  - Mobile App Development
  - Social Media Templates
- **Complexity Slider:** Simple (No auth, static) / Moderate (Accounts, CMS) / Complex (SaaS, matching, real-time)
- **Timeline:** Flexible / Rush (adds 20% premium)

**Output Engine:**
- As the user clicks, a sticky "Estimate Box" updates in real-time.
- Shows a non-binding **Price Range** (e.g., "$3,500 – $5,000").
- Shows a **Timeline Estimate** (e.g., "4–6 weeks").

**The Hook & Upsell:**
- Soft email gate to "Save this estimate and send it to your co-founder/team."
- **CTA:** `Book a discovery call to finalize this scope →`

**Technical Requirements:**
- Pure client-side state (React useState/useMemo) for instant calculator updates.
- POST to `/api/tools/estimator` upon email capture to save the lead.

---

### 8.3 Brand Name Generator

**Route:** `/tools/brand-name-generator`  
**Description:** Users enter their industry, 3 keywords, and brand personality. The tool generates 10 unique brand name ideas using OpenAI API.

**Input Form:**
- Industry (dropdown: Tech / Fashion / Food & Beverage / Health / Finance / Education / Other)
- 3 keywords that describe the business (text inputs)
- Brand personality (multi-select: Bold / Calm / Playful / Luxurious / Trustworthy / Innovative / Natural)
- Country/market (optional — affects linguistic style)

**Output:**
- 10 generated brand names in a card grid
- Each card shows:
  - The brand name (large, styled)
  - Name type (e.g. "Portmanteau" / "Abstract" / "Descriptive")
  - Short explanation of why it works
  - Domain availability check (use a lightweight API or link to Namecheap search)
  - `Save this name` button

**Email Gate:**
- After generating: "Save your names and get 5 more → Enter your email"

**Technical Requirements:**
- OpenAI API call from Next.js API route (`/api/tools/name-generator`)
- Prompt engineered to return structured JSON (name, type, rationale)
- Rate limit: 3 free generations per IP per day (use Supabase or Upstash Redis)
- Domain check: link to `https://www.namecheap.com/domains/registration/results/?domain={name}` in a new tab

**System Prompt (OpenAI):**
```
You are a professional brand naming consultant. Given the user's industry, keywords, and personality traits, generate exactly 10 creative, memorable, and domain-friendly brand names. For each name, provide: the name, type (abstract/descriptive/portmanteau/metaphorical/invented), and a one-sentence rationale. Return ONLY a valid JSON array with no markdown or preamble.
```

---

### 8.4 Brand Color Palette Generator

**Route:** `/tools/color-palette-generator`  
**Description:** User selects industry and mood descriptors; tool outputs a 5-colour brand palette with hex codes, usage rules, and font pairing suggestions.

**Input:**
- Industry (dropdown, same as above)
- Mood words (multi-select, choose 3): Bold / Calm / Energetic / Luxurious / Playful / Trustworthy / Natural / Innovative / Minimal / Warm / Cool / Dark

**Output:**
- 5 colour swatches with:
  - Hex code
  - Colour name
  - Role (Primary / Secondary / Accent / Background / Text)
  - WCAG contrast rating (AA/AAA badge)
- Usage rules: "Use Primary for headlines and CTAs. Use Accent sparingly for emphasis."
- 2 font pairing suggestions (Google Fonts links)
- Preview mockup: a simple fake business card or social post rendered with the palette and fonts

**No email gate on this tool** — it's the lowest-friction tool, designed purely for reach and shareability.

**Share feature:**
- `Copy palette link` → generates a unique URL with palette encoded in query params
- `Download palette (PNG)` → use html2canvas or Canvas API to render and download
- `Copy all hex codes` button

**Technical Requirements:**
- Pure client-side — no API calls needed
- Colour generation algorithm: use a base hue derived from industry+mood inputs, then generate harmonious palette using HSL manipulation
- Store palette generation count in Supabase (anonymous, for the "X palettes generated" counter)

---

### 8.5 Website Audit Checker (Deferred to V2)

**Route:** `/tools/website-audit`  
**Description:** User submits their website URL; tool runs automated checks and returns an audit report with scores and recommendations.

**Input:**
- Website URL (text input with validation)
- Email (required — results delivered by email + shown on screen)

**Checks Performed (via Google PageSpeed Insights API — free):**
- Performance score (0–100)
- SEO score (0–100)
- Accessibility score (0–100)
- Best Practices score (0–100)
- Mobile-friendliness
- Core Web Vitals: LCP, FID/INP, CLS

**Output:**
- Overall score (average of above)
- Score band: Poor / Needs Work / Good / Excellent
- Per-metric score with colour indicator (red/yellow/green)
- Top 5 specific issues with plain-English explanations
- Top 5 recommendations (actionable)
- CTA: "Get PeakSeen to fix these issues → Book a call"

**Technical Requirements:**
- API route: `/api/tools/audit`
- Call: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&strategy=mobile&key={API_KEY}`
- Parse response and return structured scores
- Rate limit: 1 free audit per email per day
- Store results in Supabase
- Email results using Brevo transactional email

---

### 8.6 Brand Archetype Quiz (Deferred to V2)

**Route:** `/tools/brand-archetype-quiz`  
**Description:** A 10-question personality-style quiz revealing the visitor's brand archetype. Highly shareable on social media.

**The 12 Brand Archetypes:**
The Creator / The Sage / The Innocent / The Jester / The Explorer / The Ruler / The Caregiver / The Lover / The Hero / The Outlaw / The Magician / The Everyman

**Quiz Format:**
- 10 scenario-based questions
- Example: "A competitor launches a very similar product. Your brand's response is:"
  > a) Publish thought leadership showing you pioneered this space (Sage)
  > b) Double down on your community and relationships (Caregiver)
  > c) Find a way to make it fun and not take it too seriously (Jester)
  > d) Evolve and push the boundaries further (Creator)

**Results Screen:**
- Archetype name with a strong visual identity (illustrated card)
- Archetype description (3–4 paragraphs)
- Brands with this archetype (3 well-known examples)
- Your strengths as this archetype
- Watch out for (weaknesses)
- Share image (OG-style card optimised for Instagram Stories and Twitter)
- CTA: "Build your brand around your archetype → Start with PeakSeen"

**Shareable Result URL:**
- `/tools/brand-archetype-quiz/result?archetype=the-creator`
- Generates a dynamic OG image using @vercel/og
- Optimised for social sharing

**Email Gate:**
- Before showing results: "Enter your email to see your archetype and get a detailed brand playbook"

---

### 8.7 Free Brand Report

**Route:** `/brand-report`  
**Description:** The flagship lead magnet. Visitors fill in a 5-minute intake form and receive a personalised 6-page PDF brand report within 24 hours (or instantly with AI).

**Form Fields:**
- Full name (required)
- Email (required)
- Business/brand name (required)
- Industry (dropdown)
- Business stage (Idea / Early Startup / Growing / Established)
- Target audience description (textarea)
- Current biggest brand challenge (dropdown: No identity yet / Inconsistent branding / Poor website / Not reaching right audience / Other)
- Do you have a logo? (Yes/No/Kind of)
- Do you have a website? (Yes/No/In progress)
- Your website URL (conditional — if yes)
- What does success look like in 12 months? (textarea)

**Report Contents (6 pages):**
1. Cover page: Business name, report date, PeakSeen branding
2. Brand Health Overview: Radar chart scoring 5 dimensions based on form answers
3. Purpose & Positioning Analysis: Current state vs recommended state
4. Visual Identity Assessment: What's working, what's missing
5. Digital Presence Review: (if URL provided, include basic audit data)
6. Top 5 Action Steps: Specific, prioritised recommendations

**Delivery:**
- V1: Semi-automated — PeakSeen reviews form → customises a Figma/Canva template → sends PDF within 24 hours
- V2: Fully automated — AI generates report content → pdf generated and emailed instantly

**Post-Report Follow-Up (Brevo Automation):**
- Day 0: Report delivered
- Day 2: "Did you read your report? Here's how to start fixing it."
- Day 5: "Here's a case study of a brand similar to yours"
- Day 10: "Book a free call to talk through your report"

---

## 9. Global Components

### Navbar

**Behaviour:**
- Transparent on page load over hero sections
- Becomes solid (navy background) on scroll past 80px
- Mobile: hamburger menu with full-screen overlay navigation
- Active link indicator

**Contents:**
- Logo: `PEAKSEEN` wordmark (SVG — links to /)
- Nav links: Work / Services / Products / Tools / Blog
- CTA button: `Start a Project →` (links to /start)
- Secondary: `Free Brand Report` (text link, subtle)

**Mobile Menu:**
- Full-screen overlay, dark navy
- Links animate in with stagger
- Close button (X) top right
- Social links at bottom

### Footer

**Layout:** 4-column grid on desktop, stacked on mobile

**Column 1 — Brand:**
- PeakSeen logo + tagline
- Short 2-line description
- Social links: Instagram / LinkedIn / X / Behance

**Column 2 — Studio:**
- About / Work / Services / Blog

**Column 3 — Resources:**
- Tools / Products / Free Brand Report / Brand Quiz

**Column 4 — Contact:**
- hello@peakseen.com
- Book a free call (Cal.com link)
- Location: "Remote-first. Based in Nigeria."

**Bottom bar:**
- © 2025 PeakSeen. All rights reserved.
- Privacy Policy / Terms of Service
- "Built by PeakSeen" (nice touch — eat your own cooking)

### Cookie Banner
- Minimal, bottom of screen
- Accept / Decline options
- Links to Privacy Policy

### Loading States & Error Boundaries
- Use skeleton loaders for all server-fetched content.
- Tool result pages: show animated progress indicator while processing.
- **Global Error Boundary:** If a page crashes, show a branded "We hit a snag" fallback UI with a button to return home.
- **API Failures (e.g., OpenAI down):** Do not crash the app. Catch the error, show a soft toast ("Our name generator is resting right now. Keep your email here and we'll send it when it's back up."), and capture the lead anyway.

### Rate Limiting Structure
Since PeakSeen exposes valuable free tools (especially LLM-backed ones), strict global rate limiting is required to prevent abuse and API cost spikes.
- **Implementation:** Upstash Redis + React Server Components.
- **Rules (by IP address):**
  - Brand Name Generator: Max 3 times per 24 hours.
  - Forms/Emails: Max 2 submissions per hour.
- **UX on Rate Limit:** "You've reached your free limit for today! Check back tomorrow or [Book a call] if you need more help."

---

## 10. The Client "Command Center" (User Dashboard) — Deferred to V2

**Priority:** P2 (This section functions as a future Vision outline. V1 will launch without authentication to maximize speed to market, capturing purely contact emails constraint free. Detailed specs for this portal will be re-evaluated after user validation).

### Vision Summary
- Move client file sharing out of email
- Give active partners a centralized operating system for their venture
- Contain Project Milestones, an Asset Vault, a Strategy Ledger, and Downloads.

---

## 11. Digital Product Shop

### Purchase Flow

1. User browses `/products`
2. Clicks product → `/products/[slug]`
3. Clicks `Buy Now` → Lemon Squeezy checkout (hosted overlay or redirect)
4. Lemon Squeezy handles payment (card, PayPal, etc.) and tax
5. On success: Lemon Squeezy sends download email automatically
6. PeakSeen's webhook receives `order_created` event → save order to Supabase
7. If user is logged in / creates account: product appears in `/dashboard/downloads`

### Lemon Squeezy Setup

- Create a store at lemonsqueezy.com (free)
- Upload each product as a "Digital Product" with the file attached
- Enable webhooks: `order_created`, `order_refunded`
- Set webhook endpoint: `https://peakseen.com/api/webhooks/lemon-squeezy`

### Webhook Handler

```typescript
// /api/webhooks/lemon-squeezy.ts
POST handler:
1. Verify signature using X-Signature header
2. Parse event type
3. On order_created: insert into supabase orders table
4. Link order to user if email matches existing account
5. Return 200
```

### Supabase Orders Table

```sql
table: orders
- id: uuid
- lemon_squeezy_order_id: text (unique)
- customer_email: text
- product_name: text
- product_slug: text
- amount_paid: integer (cents)
- currency: text
- download_url: text
- user_id: uuid (nullable — FK to auth.users)
- created_at: timestamp
```

---

## 12. Email & Lead Capture System

### Form Submissions (Next.js Server Actions)

All form submissions across the site (Lead magnets, Contact, Newsletters) will use Next.js Server Actions to securely process data, write to Supabase, and dispatch transactional emails (e.g., via Resend) entirely on the server.

### Lead Sources

| Source | Trigger | Tag in Brevo |
|--------|---------|-------------|
| Brand Quiz completion | Quiz result screen | `quiz-lead` |
| Brand Report request | Form submission | `report-lead` |
| Newsletter signup | Blog / homepage | `newsletter` |
| Contact form | Contact page | `project-inquiry` |
| Tool email gate | Any tool | `tool-lead` |
| Product purchase | Order webhook | `customer` |

### Email Service Boundaries

To avoid system confusion, responsibilities are strictly divided between our platforms:

| Service | Tool Used | Purpose | Examples |
|---------|-----------|---------|----------|
| **Transactional** | Resend + React Email | Instant delivery triggered by a user action. Fired via Next.js Server Actions. | Quiz results delivery, Auto-reply to briefs, Password resets, Login links. |
| **Marketing/CRM** | Brevo | Time-delayed sequences, broadcasts, and lead nurturing. | The "Welcome Sequence", newsletters, 3-day follow-ups. |
| **E-commerce** | Lemon Squeezy | Handling everything related to purchases. | Product download links, tax invoices, refund notices. |

### Brevo Automations

**Welcome Sequence (All new leads):**
- Email 1 (Day 0): Welcome to PeakSeen + link to a high-value free resource.
- Email 2 (Day 3): A strong blog post recommendation (e.g., "Why 90% of Nigerian startups fail their launch").
- Email 3 (Day 7): The "Soft Pitch" — an overview of PeakSeen's core services.
- Email 4 (Day 14): Social proof — a case study showcasing a brand transformation.
- Email 5 (Day 21): The "Hard Pitch" — a direct CTA to book a discovery call.

**Purchase Sequence (Lemon Squeezy Buyers):**
- Email 1 (Day 3): "How are you getting on with [Product Name]?" + Best practice tips.
- Email 2 (Day 7): Upsell — recommend a related tool or strategy template.

### Supabase Leads Table

```sql
table: leads
- id: uuid
- email: text (unique)
- name: text
- source: text (quiz / report / newsletter / tool / contact)
- tool_used: text (nullable)
- business_name: text
- tags: text[]
- created_at: timestamp
- brevo_contact_id: text
```

---

## 13. SEO Requirements

### Technical SEO (via Next.js Metadata API)

- Configure `layout.tsx` and `page.tsx` with native Next.js `metadata` exports for `<title>` tags and `<meta name="description">`
- Open Graph tags for all pages managed natively via `metadata.openGraph`
- Dynamic OG images for blog posts and tool result pages created using `next/og` (e.g., `opengraph-image.tsx`)
- `robots.ts` — native Next.js file to allow all except `/dashboard`, `/api`
- `sitemap.ts` — native Next.js file to auto-generate sitemaps based on MDX files and routes
- Canonical URLs automatically generated or defined in `metadata.alternates`
- Structured data (JSON-LD) for:
  - Organization schema (homepage)
  - Article schema (blog posts)
  - Product schema (digital products)
  - FAQPage schema (services FAQ)
- No orphan pages — every page linked from at least one other page

### On-Page SEO

- Each blog post targets exactly one primary keyword
- URL slugs: short, hyphenated, keyword-rich (e.g. `/blog/brand-identity-startup`)
- H1: one per page, contains primary keyword
- Internal linking: every blog post links to at least 2 other posts and one tool or product
- Image alt text: descriptive and keyword-aware
- Page speed: target 90+ on Google PageSpeed (see Section 14)

### Local & Niche SEO

- Target: "brand studio Nigeria", "brand design agency Lagos", "startup branding Africa"
- Include location references naturally in About page and contact details
- Register PeakSeen on Google Business Profile (free)

---

## 14. Mobile UX & Performance Requirements

Because the African founder target audience indexes heavily on mobile-first browsing, PeakSeen cannot just "collapse" gracefully to small screens—it must be explicitly designed for mobile constraints.

### Mobile-Specific UX
- **Touch Targets:** Minimum 44x44px for all interactable elements (buttons, inputs, tool toggles).
- **Tool Interfaces:** Avoid drag-and-drop on mobile. Use large pill/chip buttons for multiple-choice selections in the Brand Calculator. Break long forms into manageable, auto-scrolling single-question screens.
- **Data-Light First:** Disable auto-playing hero background videos on mobile; default to optimized static images or CSS gradients. 
- **Sticky Actions:** The "Start a Project" and mobile menu hamburger should remain grouped and fixed to a low-profile bottom or top bar to avoid reach fatigue.

### Performance Targets

| Metric | Target | Priority |
|--------|--------|---------|
| Lighthouse Performance | ≥ 90 | P0 |
| Lighthouse SEO | ≥ 95 | P0 |
| Lighthouse Accessibility | ≥ 90 | P0 |
| First Contentful Paint (FCP) | < 1.5s | P0 |
| Largest Contentful Paint (LCP) | < 2.5s | P0 |
| Cumulative Layout Shift (CLS) | < 0.1 | P0 |
| Time to Interactive (TTI) | < 3.5s | P1 |
| Bundle size (initial JS) | < 200kb gzipped | P1 |

### Implementation Requirements

- Use Next.js `<Image>` component for all images (automatic WebP, lazy loading, size optimisation)
- Use Next.js `<Link>` for all internal navigation (prefetching)
- Fonts loaded via `next/font` (eliminates render-blocking)
- Code splitting: dynamic imports for heavy components (quiz, tools, charts)
- API routes: use streaming responses where possible for LLM-powered features
- Edge functions for geolocation-dependent features
- ISR (Incremental Static Regeneration) for blog posts (revalidate every 3600s)
- Static generation for all non-dynamic pages

---

## 15. Accessibility Requirements

- All interactive elements keyboard-navigable (tab order logical)
- Focus indicators visible on all focusable elements
- All images have descriptive alt text
- Colour contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- All form inputs have associated `<label>` elements
- Modals and overlays trap focus and are dismissible via Escape key
- ARIA labels on icon-only buttons
- Skip-to-main-content link (visually hidden, shows on focus)
- No content depends solely on colour to convey meaning
- All animations respect `prefers-reduced-motion`
- Semantic HTML throughout (headings in correct order, lists for lists, etc.)

---

## 16. Analytics & Tracking

### Tools

| Tool | Purpose | Cost |
|------|---------|------|
| Vercel Web Analytics | Privacy-friendly page views, custom events (e.g., lead_captured), native UI | Included w/ Vercel |
| Vercel Speed Insights | Automatically tracks Core Web Vitals (LCP, FID, CLS) from real users | Included w/ Vercel |
| Google Search Console | SEO performance, keyword rankings | Free |

### Key Events to Track

| Event | Trigger |
|-------|---------|
| `quiz_started` | User clicks Start on Brand Quiz |
| `quiz_completed` | User submits quiz with email |
| `tool_used` | User submits any tool form |
| `lead_captured` | Any email capture |
| `report_requested` | Brand Report form submitted |
| `product_viewed` | Product detail page view |
| `product_purchased` | Lemon Squeezy webhook confirmed |
| `contact_submitted` | Contact form submitted |
| `call_booked` | Cal.com booking confirmed |
| `newsletter_subscribed` | Newsletter form submitted |

### Conversion Goals

- Primary: `lead_captured` (email collected)
- Secondary: `product_purchased`
- Tertiary: `call_booked`

---

## 17. Data Privacy, NDPR & Content Governance

### Privacy & Compliance (NDPR / GDPR)
Collecting emails, tracking visitors, and generating leads requires trust and strict compliance.
- **Data Retention:** Quiz results and unengaged leads will be purged from Supabase automatically after 24 months. 
- **The Cookie Banner:** Do not just show a banner. The banner must specifically block Vercel Analytics until the user explicitly accepts it to be strictly compliant. 
- **Consent Checkboxes:** All lead capture forms MUST have a non-pre-checked box: "I agree to receive the PeakSeen newsletter and marketing emails."
- **Privacy Policy:** Must explicitly outline how OpenAI processes their inputs (anonymized) through the Brand Name Generator.

### Content Governance & Maintenance
The website relies heavily on fresh content to rank and function.
- **Blog Publishing:** The target is 1 post per week. The founder is responsible for outlining domain knowledge, but an AI-assisted editorial workflow handles structuring. The MDX files will be managed via PRs into GitHub.
- **Product Updates:** Product files (Figma, Notion links) are updated directly inside the Lemon Squeezy dashboard, so no codebase changes are needed to update existing products.
- **Tool Validation:** LLM Prompts (e.g., Name Generator) must be reviewed quarterly against OpenAI updates to ensure output quality hasn't drifted.

---

## 18. Deployment & Infrastructure

### Environments

| Environment | Branch | URL | Purpose |
|------------|--------|-----|---------|
| Production | `main` | peakseen.com | Live site |
| Preview | PRs | `*.vercel.app` | Review changes before merge |
| Development | Local | `localhost:3000` | Local development |

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_WEBHOOK_SECRET=
LEMON_SQUEEZY_STORE_ID=

# Brevo (Email)
BREVO_API_KEY=
BREVO_SENDER_EMAIL=hello@peakseen.com
BREVO_SENDER_NAME=PeakSeen

# Google (APIs)
GOOGLE_PAGESPEED_API_KEY=

# Cal.com
NEXT_PUBLIC_CAL_USERNAME=peakseen

# Analytics & Email
RESEND_API_KEY=
```

### Domain & DNS

- Register `peakseen.com` on Namecheap or Cloudflare
- Also register `peakseen.co` and `peakseen.io` as backups (protect the brand)
- Point domain to Vercel (add A record or CNAME as instructed by Vercel)
- Enable HTTPS (automatic via Vercel)
- Set up `hello@peakseen.com` email on Google Workspace (free trial) or Zoho Mail (free)

---

## 19. Development Phases & Milestones

### Phase 1 — Core Launch (Weeks 1–4)

**Goal:** Get a real, professional website live that can start generating leads.

| Task | Priority | Est. Time |
|------|---------|----------|
| Set up Next.js + Tailwind + TypeScript project | P0 | 2 hrs |
| Configure Supabase (DB, auth, storage) | P0 | 2 hrs |
| Build design system: tokens, components, fonts | P0 | 3 days |
| Build Navbar and Footer | P0 | 1 day |
| Build Home page (all sections) | P0 | 3 days |
| Build Services page | P0 | 2 days |
| Build Contact page with form | P0 | 1 day |
| Integrate Cal.com on contact page | P0 | 2 hrs |
| Set up Brevo email + welcome automation | P0 | 1 day |
| Set up Vercel deployment + custom domain | P0 | 2 hrs |
| Basic SEO setup (Metadata API, sitemap.ts, robots.ts) | P0 | 1 day |
| **Deploy Phase 1** | | **~2 weeks** |

### Phase 2 — Tools & Products (Weeks 3–6)

**Goal:** Launch lead magnets and passive revenue.

| Task | Priority | Est. Time |
|------|---------|----------|
| Build Brand "Peak" Calculator (Clarity Score) | P0 | 3 days |
| Build Brand Color Palette Generator | P1 | 2 days |
| Build Brand Name Generator (+ OpenAI) + Rate Limiting | P1 | 3 days |
| Set up Lemon Squeezy store + first 3 products | P1 | 2 days |
| Build Products shop page | P1 | 2 days |
| Build Blog with Next.js MDX | P1 | 3 days |
| Build About page | P1 | 1 day |
| Build Work/Portfolio page | P1 | 2 days |
| Publish first 2 foundational blog posts | P1 | 3 days |
| Build Tools hub page | P1 | 1 day |
| **Deploy Phase 2** | | **~4 weeks** |

### Phase 3 — Advanced Features (Weeks 7–12)

**Goal:** Full automation, user accounts, and all interactive tools live.

| Task | Priority | Est. Time |
|------|---------|----------|
| Build Brand Clarity Score quiz + PDF report | P0 | 5 days |
| Build Website Audit Checker | P1 | 3 days |
| Build Free Brand Report form + delivery flow | P1 | 3 days |
| Integrate Resend and set up Transactional emails | P1 | 2 days |
| Lemon Squeezy webhooks + order saving | P1 | 1 day |
| Phase 2 digital products live on shop | P1 | 3 days |
| **Deploy Phase 3** | | **~6 weeks** |

---

## 20. Out of Scope (V1)

The following features are intentionally excluded from the first version to keep scope manageable:

- Live chat widget (add in V2 — use Crisp or Tally)
- Client portal for active project management
- Subscription / membership model
- Video content hosting (use YouTube embeds instead)
- Multi-language support
- Native mobile app
- AI-powered instant Brand Report delivery (V2 — V1 is manual within 24hrs)
- Advanced CRM integration (use Supabase as lightweight CRM in V1)
- Affiliate / referral program tracking

---

## 21. Open Questions & Decisions

| # | Question | Decision Needed By |
|---|---------|-------------------|
| 1 | Will PeakSeen show pricing publicly? Or keep it "Get a Quote" only? | Before Phase 1 launch |
| 2 | Do we need a custom UI for the MDX blog components (e.g., custom callouts)? | Before Phase 2 |
| 3 | What is the minimum portfolio of work to launch with? (Real vs spec work policy) | Before Phase 1 |
| 4 | Will the Brand Report (V1) be manually assembled or semi-auto via Figma template? | Before Phase 3 |
| 5 | What is the policy for client confidentiality in the portfolio? | Before Phase 2 |
| 6 | Will there be a referral / affiliate system from Day 1 (for early growth)? | Before Phase 2 |
| 7 | What calendar system does the founder use? Ensure Cal.com integrates with it. | Before Phase 1 |

---

*PRD prepared for PeakSeen — Brand & Product Studio*  
*Version 1.0 · Ready for Development · 2025*  
*Next step: Begin Phase 1 development. Start with the design system.*

---