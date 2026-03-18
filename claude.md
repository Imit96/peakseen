# PeakSeen — AI Assistant Rules & Project Guidelines

**Purpose:** This document governs how any AI-powered coding assistant (Claude, Cursor, Copilot, Windsurf, or any IDE agent) must behave when working on the PeakSeen codebase. Every rule exists to prevent a specific, observed failure mode. Follow them without exception.

**Load this file at the start of every session.** If you are an AI assistant and this file is in your context, these rules override your default behaviours for this project.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Architecture Rules](#2-architecture-rules)
3. [File & Folder Rules](#3-file--folder-rules)
4. [Component Rules](#4-component-rules)
5. [Styling Rules](#5-styling-rules)
6. [TypeScript Rules](#6-typescript-rules)
7. [Next.js App Router Rules](#7-nextjs-app-router-rules)
8. [Server vs Client Rules](#8-server-vs-client-rules)
9. [Data Fetching & Supabase Rules](#9-data-fetching--supabase-rules)
10. [API Route Rules](#10-api-route-rules)
11. [Form & Server Action Rules](#11-form--server-action-rules)
12. [Animation & Motion Rules](#12-animation--motion-rules)
13. [Content & MDX Rules](#13-content--mdx-rules)
14. [SEO & Metadata Rules](#14-seo--metadata-rules)
15. [Image & Asset Rules](#15-image--asset-rules)
16. [Email Rules](#16-email-rules)
17. [Third-Party Integration Rules](#17-third-party-integration-rules)
18. [Error Handling Rules](#18-error-handling-rules)
19. [Accessibility Rules](#19-accessibility-rules)
20. [Performance Rules](#20-performance-rules)
21. [Security Rules](#21-security-rules)
22. [Git & Workflow Rules](#22-git--workflow-rules)
23. [Naming Conventions](#23-naming-conventions)
24. [Anti-Patterns (Never Do This)](#24-anti-patterns-never-do-this)
25. [Reference Documents](#25-reference-documents)
26. [Pre-Commit Checklist](#26-pre-commit-checklist)

---

## 1. Project Identity

Before writing any code, internalise these facts:

```
Project:        PeakSeen — Brand & Product Studio Website
Framework:      Next.js 14+ (App Router)
Language:       TypeScript (strict mode)
Styling:        Tailwind CSS + CSS custom properties
Animations:     Framer Motion
Icons:          Lucide React
Database:       Supabase (PostgreSQL)
Auth:           None in V1. Supabase Auth in V2.
CMS:            MDX files in repository (no external CMS)
Payments:       Lemon Squeezy (hosted checkout)
Email:          Resend (transactional) + Brevo (marketing)
Hosting:        Vercel
Package Manager: pnpm
```

**Four companion documents define every requirement. Read them before generating code:**

1. `PRD.md` — Business requirements, page specs, tool specs, user flows
2. `DESIGN-SYSTEM.md` — Colours, typography, spacing, component specs, accessibility
3. `TECH-STACK.md` — Architecture, schemas, integrations, environment variables
4. `CONTENT-STRATEGY.md` — Copy, headlines, CTAs, metadata, email content

If a requirement isn't in these documents, **ask before assuming.** Do not invent features, pages, or components that are not specified.

---

## 2. Architecture Rules

### 2.1 Monolith — One Codebase, One Repo

This is a single Next.js application. Everything lives in one repository.

- **NO** separate backend service
- **NO** separate frontend repo
- **NO** microservices
- **NO** monorepo tools (Turborepo, Nx, Lerna)
- **NO** Docker containers for development

### 2.2 Source of Truth Hierarchy

When documents conflict, follow this priority order:

```
1. This rules file (highest authority for code decisions)
2. DESIGN-SYSTEM.md (visual and component decisions)
3. TECH-STACK.md (architecture and integration decisions)
4. PRD.md (business requirements and feature scope)
5. CONTENT-STRATEGY.md (copy and messaging decisions)
```

### 2.3 No Scope Creep

Do **NOT** add any feature, page, component, dependency, or integration that is not explicitly specified in the PRD or Tech Stack documents.

Specifically, never:
- Add authentication to V1 (it's deferred to V2)
- Build the dashboard/Command Center (deferred to V2)
- Build the Website Audit Checker (deferred to V2)
- Build the Brand Archetype Quiz (deferred to V2)
- Build the Venture Cost Estimator (deferred to V2)
- Add a dark mode toggle (not in scope)
- Add internationalisation/i18n (not in scope)
- Add a search feature (not in scope for V1)
- Add comments to blog posts (optional for V1 — don't build unless asked)
- Install libraries not listed in the Tech Stack dependency manifest

If you think something is missing, **flag it as a question** instead of implementing it.

---

## 3. File & Folder Rules

### 3.1 Canonical Folder Structure

This is the **only** accepted folder structure. Do not deviate.

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (fonts, navbar, footer, analytics)
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # Custom 404 page
│   ├── error.tsx               # Global error boundary
│   ├── globals.css             # OR in src/styles/globals.css
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── tools/
│   │   ├── page.tsx
│   │   ├── brand-clarity-score/page.tsx
│   │   ├── brand-name-generator/page.tsx
│   │   └── color-palette-generator/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── brand-quiz/page.tsx     # Redirect to /tools/brand-clarity-score
│   ├── brand-report/page.tsx
│   ├── contact/page.tsx
│   ├── start/page.tsx
│   ├── legal/
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   └── api/
│       ├── quiz/submit/route.ts
│       ├── tools/name-generator/route.ts
│       └── webhooks/lemon-squeezy/route.ts
│
├── components/
│   ├── ui/                     # Design system primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── progress-bar.tsx
│   │   ├── avatar.tsx
│   │   ├── tag.tsx
│   │   ├── tooltip.tsx
│   │   └── cta-block.tsx
│   │
│   ├── layout/                 # Structural components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── section.tsx
│   │   ├── mobile-menu.tsx
│   │   └── cookie-banner.tsx
│   │
│   ├── motion/                 # Reusable animation wrappers
│   │   ├── fade-in-on-scroll.tsx
│   │   ├── stagger-children.tsx
│   │   └── word-reveal.tsx
│   │
│   ├── icons/                  # Custom SVG icons (social media, etc.)
│   │   ├── instagram.tsx
│   │   ├── linkedin.tsx
│   │   ├── twitter-x.tsx
│   │   └── behance.tsx
│   │
│   └── features/               # Page-specific or feature-specific
│       ├── home/               # Home page sections
│       │   ├── hero.tsx
│       │   ├── value-strip.tsx
│       │   ├── services-overview.tsx
│       │   ├── featured-work.tsx
│       │   ├── tools-preview.tsx
│       │   ├── products-preview.tsx
│       │   ├── testimonials.tsx
│       │   ├── brand-report-cta.tsx
│       │   ├── blog-preview.tsx
│       │   └── final-cta.tsx
│       ├── quiz/
│       ├── name-generator/
│       ├── color-palette/
│       ├── blog/
│       ├── services/
│       ├── products/
│       └── contact/
│
├── lib/                        # Utilities and configurations
│   ├── fonts.ts
│   ├── utils.ts                # cn() helper
│   ├── supabase.ts             # Browser client
│   ├── supabase-server.ts      # Server client (service role)
│   ├── email.ts                # Resend client
│   ├── brevo.ts                # Brevo client
│   ├── openai.ts               # OpenAI client
│   ├── rate-limit.ts           # Upstash Redis rate limiters
│   ├── analytics.ts            # Vercel Analytics event helpers
│   ├── schemas.ts              # Zod validation schemas
│   └── constants.ts            # Site-wide constants
│
├── content/                    # MDX content files
│   ├── blog/
│   │   ├── brand-identity-startup.mdx
│   │   └── ...
│   └── work/
│       ├── fintech-brand-identity.mdx
│       └── ...
│
├── emails/                     # React Email templates
│   ├── quiz-results.tsx
│   ├── contact-auto-reply.tsx
│   ├── report-confirmation.tsx
│   └── layout.tsx              # Shared email layout
│
├── styles/
│   └── globals.css             # CSS custom properties + Tailwind directives
│
├── types/
│   └── index.ts                # Shared TypeScript interfaces and types
│
└── public/
    ├── fonts/                  # .woff2 font files
    ├── images/
    └── og/                     # Static OG image fallbacks
```

### 3.2 File Placement Rules

| If you're creating... | It goes in... | Never in... |
|----------------------|---------------|-------------|
| A reusable UI primitive (Button, Card, Input) | `src/components/ui/` | `src/app/`, inline in a page |
| A layout component (Navbar, Footer) | `src/components/layout/` | `src/components/ui/` |
| An animation wrapper | `src/components/motion/` | Inline in a page or ui component |
| A page-specific section (Hero, FAQ) | `src/components/features/{page}/` | `src/components/ui/` |
| A page route | `src/app/{route}/page.tsx` | Anywhere else |
| A utility function | `src/lib/` | `src/utils/`, `src/helpers/`, inline |
| A TypeScript interface | `src/types/index.ts` | Co-located (unless component-private) |
| A Zod schema | `src/lib/schemas.ts` | Inside a component or page file |
| An API route | `src/app/api/{path}/route.ts` | `src/pages/api/` (Pages Router) |
| A React Email template | `src/emails/` | `src/components/` |
| A blog post | `src/content/blog/{slug}.mdx` | `src/app/blog/` |
| A case study | `src/content/work/{slug}.mdx` | `src/app/work/` |
| A font file | `public/fonts/` | `src/fonts/`, `src/assets/` |
| A static image | `public/images/` | `src/images/`, `src/assets/` |

### 3.3 No Duplicate Files

Before creating any file, **check if it already exists.** Specifically:

- Do not create a second Button component. There is one: `src/components/ui/button.tsx`
- Do not create a second Supabase client. There are two: `src/lib/supabase.ts` (browser) and `src/lib/supabase-server.ts` (server)
- Do not create utility files like `helpers.ts`, `utils/`, `common.ts`. There is one utility file: `src/lib/utils.ts`
- Do not create a second types file. There is one: `src/types/index.ts`
- Do not create a second constants file. There is one: `src/lib/constants.ts`
- Do not create a second schemas file. There is one: `src/lib/schemas.ts`

### 3.4 One Component Per File

Every component is its own file. No file exports more than one component.

```typescript
// ✅ CORRECT: src/components/ui/button.tsx exports Button
// ✅ CORRECT: src/components/ui/badge.tsx exports Badge

// ❌ WRONG: src/components/ui/index.tsx exports Button, Badge, Card, etc.
// ❌ WRONG: src/components/ui/common.tsx exports multiple components
```

**Exception:** A component file may contain small private helper components that are only used within that same file and are not exported.

### 3.5 No Barrel Exports (No index.ts Re-exports)

Do **not** create `index.ts` files that re-export from other files. Import directly from the source file.

```typescript
// ✅ CORRECT
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ❌ WRONG
import { Button, Card } from '@/components/ui';
// This requires an index.ts barrel file — do not create it
```

**Why:** Barrel files break tree-shaking, create circular dependency risks, and make it harder to trace imports. Direct imports are explicit and debuggable.

---

## 4. Component Rules

### 4.1 Never Define Components Inline in Page Files

Page files (`page.tsx`) import and compose components. They do not define them.

```typescript
// ✅ CORRECT: src/app/page.tsx
import { Hero } from '@/components/features/home/hero';
import { ServicesOverview } from '@/components/features/home/services-overview';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
    </main>
  );
}

// ❌ WRONG: Defining a component inside the page file
export default function HomePage() {
  // Never do this
  const HeroSection = () => <section>...</section>;
  return <HeroSection />;
}
```

If you find yourself writing more than 30 lines of JSX inside a page file, **extract it into a component** in `src/components/features/{page}/`.

### 4.2 Use the Design System Components

Never recreate a component that exists in `src/components/ui/`. The following components are defined by the Design System and must be used everywhere:

`Button` · `Card` · `Badge` · `Input` · `Textarea` · `Select` · `Modal` · `Toast` · `Skeleton` · `ProgressBar` · `Avatar` · `Tag` · `Tooltip` · `CTABlock`

```typescript
// ✅ CORRECT: Using the design system Button
import { Button } from '@/components/ui/button';
<Button variant="primary" size="lg">Start a Project</Button>

// ❌ WRONG: Creating a one-off styled button
<button className="bg-orange-500 text-white px-6 py-3 rounded-lg">
  Start a Project
</button>
```

### 4.3 CVA for Component Variants

Every component with visual variants uses `class-variance-authority`. Do not use conditional ternaries for variant styling.

```typescript
// ✅ CORRECT: CVA-based variants
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva('inline-flex items-center justify-center font-display', {
  variants: {
    variant: {
      primary: 'bg-accent text-white hover:bg-accent-hover',
      secondary: 'border border-grey-100 text-charcoal hover:bg-grey-50',
      ghost: 'text-grey-600 hover:text-charcoal',
    },
    size: {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-5 text-sm',
      lg: 'h-13 px-7 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// ❌ WRONG: Manual conditional classes
className={`px-4 py-2 ${variant === 'primary' ? 'bg-orange-500' : 'bg-transparent'}`}
```

### 4.4 forwardRef on Interactive Components

All interactive components (Button, Input, Select, Textarea) must use `forwardRef` for external ref access.

### 4.5 Always Accept className Prop

Every component accepts an optional `className` prop for contextual overrides, merged using `cn()`:

```typescript
export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <article className={cn('rounded-lg border border-grey-100 p-6', className)}>
      {children}
    </article>
  );
}
```

---

## 5. Styling Rules

### 5.1 Tailwind Only

- **NO** CSS modules (`*.module.css`)
- **NO** styled-components or Emotion
- **NO** Sass/SCSS files
- **NO** inline `style={{}}` attributes (exception: dynamic values that can't be expressed as Tailwind classes, e.g., calculated widths for the colour palette tool)

### 5.2 Use Design Tokens, Not Raw Values

Always use the design system's defined colours, spacing, radii, and shadows — never raw values.

```typescript
// ✅ CORRECT: Using design system tokens
className="bg-charcoal text-ivory rounded-lg shadow-sm"

// ❌ WRONG: Raw hex values
className="bg-[#1A1A1A] text-[#F9F8F6] rounded-[16px] shadow-[0_1px_3px_rgba(26,26,26,0.08)]"
```

**Exception:** The colour palette generator tool may need dynamic hex values — this is the only case where `style={{ backgroundColor: dynamicHex }}` is acceptable.

### 5.3 Responsive: Mobile-First

Write base styles for mobile, add complexity with responsive prefixes.

```typescript
// ✅ CORRECT: Mobile-first
className="py-16 lg:py-24"           // 64px mobile, 96px desktop
className="grid grid-cols-1 lg:grid-cols-3"  // 1 col mobile, 3 desktop
className="text-5xl lg:text-8xl"     // 48px mobile, 96px desktop

// ❌ WRONG: Desktop-first (overriding down)
className="py-24 sm:py-16"
className="grid grid-cols-3 sm:grid-cols-1"
```

### 5.4 No Tailwind @apply in CSS Files

Keep all styling in JSX via className. Do not move Tailwind classes into CSS files with `@apply`.

```css
/* ❌ WRONG */
.btn-primary {
  @apply bg-accent text-white px-6 py-3 rounded-md;
}
```

**Exception:** `globals.css` may use `@layer base {}` for HTML element resets (body, headings) only.

### 5.5 Use cn() for Conditional Classes

Never build class strings with template literals. Always use the `cn()` utility.

```typescript
// ✅ CORRECT
import { cn } from '@/lib/utils';
className={cn('base-classes', isActive && 'active-classes', className)}

// ❌ WRONG
className={`base-classes ${isActive ? 'active-classes' : ''} ${className || ''}`}
```

---

## 6. TypeScript Rules

### 6.1 Strict Mode, No Exceptions

`tsconfig.json` has `"strict": true`. Do not loosen it.

### 6.2 No `any` Type

Never use `any`. If you don't know the type, use `unknown` and narrow it.

```typescript
// ✅ CORRECT
function parseResponse(data: unknown): QuizResult {
  // Validate and narrow with Zod
  return quizResultSchema.parse(data);
}

// ❌ WRONG
function parseResponse(data: any): any { ... }
```

### 6.3 No Type Assertions Unless Provably Safe

Do not use `as` to force types. If TypeScript complains, fix the type — don't silence it.

```typescript
// ✅ CORRECT: Narrow the type
if (result && 'score' in result) {
  console.log(result.score);
}

// ❌ WRONG: Forcing the type
const score = (result as QuizResult).score;
```

**Exception:** `as const` for literal types is fine.

### 6.4 Shared Types in One Place

All shared interfaces and types live in `src/types/index.ts`.

```typescript
// src/types/index.ts
export interface Lead {
  id: string;
  email: string;
  name: string | null;
  source: 'quiz' | 'report' | 'newsletter' | 'tool' | 'contact';
  tool_used: string | null;
  business_name: string | null;
  tags: string[];
  consent_marketing: boolean;
  created_at: string;
}

export interface QuizResult { ... }
export interface ContactSubmission { ... }
export interface Order { ... }
```

Component-private types (props interfaces) may live in the component file itself.

### 6.5 Props Interface Naming

```typescript
// ✅ CORRECT
interface ButtonProps { ... }
interface CardProps { ... }

// ❌ WRONG
interface IButtonProps { ... }    // No "I" prefix
interface ButtonPropsType { ... } // No "Type" suffix
type TButton = { ... }           // No "T" prefix
```

### 6.6 Use Zod for Runtime Validation

All external data (form submissions, API responses, webhook payloads) must be validated with Zod before use. Never trust external input.

```typescript
// ✅ CORRECT
import { contactFormSchema } from '@/lib/schemas';
const validated = contactFormSchema.parse(formData);

// ❌ WRONG: Trusting raw form data
const email = formData.get('email') as string;
```

---

## 7. Next.js App Router Rules

### 7.1 App Router Only

This project uses the **App Router** (`src/app/`). Do not create files in `pages/` or `src/pages/`. The Pages Router does not exist in this project.

### 7.2 File Naming Convention

| File | Purpose |
|------|---------|
| `page.tsx` | The route's page component |
| `layout.tsx` | Shared layout wrapping child routes |
| `loading.tsx` | Loading UI (skeleton) shown while the page loads |
| `error.tsx` | Error boundary for the route segment |
| `not-found.tsx` | Custom 404 for the route segment |
| `route.ts` | API route handler (only in `src/app/api/`) |
| `opengraph-image.tsx` | Dynamic OG image generation |
| `sitemap.ts` | Sitemap generation (root only) |
| `robots.ts` | Robots.txt generation (root only) |

### 7.3 No Default Export for Components

Page files use `export default function`. All other components use **named exports**.

```typescript
// ✅ CORRECT: Page file
// src/app/about/page.tsx
export default function AboutPage() { ... }

// ✅ CORRECT: Component file
// src/components/ui/button.tsx
export function Button() { ... }

// ❌ WRONG: Default export in a component file
// src/components/ui/button.tsx
export default function Button() { ... }
```

### 7.4 One Page Component Per Route

Each `page.tsx` file exports exactly one component: the page. It does not export helper functions, constants, or sub-components.

### 7.5 Layouts Are Minimal

`layout.tsx` files contain only structural wrappers, fonts, metadata, and persistent components (Navbar, Footer, Analytics). They do not contain page-specific content.

```typescript
// ✅ CORRECT: Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${satoshi.variable} ${editorialNew.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ivory text-grey-600 font-body">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 8. Server vs Client Rules

### 8.1 Server Components by Default

Every component is a **Server Component** unless it needs client-side interactivity. Do not add `'use client'` unless the component uses:

- `useState`, `useEffect`, `useReducer`, `useRef` (with DOM interaction)
- `onClick`, `onChange`, `onSubmit` event handlers
- Framer Motion (`motion.*` components)
- Browser APIs (`window`, `document`, `localStorage`)
- Third-party client libraries (Cal.com embed, Lemon Squeezy script)

### 8.2 Minimise Client Boundaries

When a page needs one interactive element, do not make the entire page a Client Component. Extract only the interactive part.

```typescript
// ✅ CORRECT: Server page with a small client island
// src/app/contact/page.tsx (Server Component)
import { ContactForm } from '@/components/features/contact/contact-form';

export default function ContactPage() {
  return (
    <main>
      <section>
        <h1>Let's build something great</h1>  {/* Server-rendered */}
        <p>Tell us what you're building.</p>    {/* Server-rendered */}
      </section>
      <ContactForm />  {/* Client Component — the only interactive part */}
    </main>
  );
}

// ❌ WRONG: Making the whole page a Client Component
'use client';
export default function ContactPage() { ... }
```

### 8.3 Never Import Server-Only Code in Client Components

```typescript
// ❌ NEVER do this in a 'use client' file
import { createServerClient } from '@/lib/supabase-server';

// ❌ NEVER import environment variables without NEXT_PUBLIC_ prefix in client code
const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // This is undefined in the browser
```

### 8.4 Client Component File Convention

Every Client Component file must have `'use client'` as the **very first line** — before any imports.

```typescript
// ✅ CORRECT
'use client';

import { useState } from 'react';
```

---

## 9. Data Fetching & Supabase Rules

### 9.1 Two Supabase Clients — Use the Right One

| Client | File | Key Used | Context |
|--------|------|----------|---------|
| Browser client | `src/lib/supabase.ts` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client Components (rare in V1) |
| Server client | `src/lib/supabase-server.ts` | `SUPABASE_SERVICE_ROLE_KEY` | Server Actions, API Routes |

```typescript
// ✅ In a Server Action or API route:
import { createServerClient } from '@/lib/supabase-server';
const supabase = createServerClient();

// ✅ In a Client Component (rare):
import { createClient } from '@/lib/supabase';
const supabase = createClient();
```

**Never** create a new Supabase client inline. Always import from the canonical files.

### 9.2 No Direct Database Access from Client Components

All database reads and writes go through **Server Actions** or **API Routes**. Client Components never call Supabase directly in V1.

### 9.3 Always Handle Errors from Supabase

```typescript
// ✅ CORRECT
const { data, error } = await supabase.from('leads').insert({ ... });
if (error) {
  console.error('Failed to save lead:', error.message);
  // Handle gracefully — don't crash
}

// ❌ WRONG: Ignoring the error
const { data } = await supabase.from('leads').insert({ ... });
```

---

## 10. API Route Rules

### 10.1 API Routes Are for External Consumers Only

Use API routes (`route.ts`) only for:
- Webhook handlers (Lemon Squeezy)
- External API proxying (OpenAI calls)
- Endpoints that need custom headers or status codes

For form submissions and internal data mutations, **always use Server Actions** instead.

### 10.2 Always Validate Input

Every API route validates the request body with Zod before processing.

```typescript
import { nameGeneratorSchema } from '@/lib/schemas';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = nameGeneratorSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error.flatten() },
      { status: 400 }
    );
  }

  // Proceed with validated data: result.data
}
```

### 10.3 Always Rate Limit AI-Powered Routes

The Brand Name Generator API route **must** check the rate limiter before calling OpenAI.

```typescript
import { nameGeneratorLimiter } from '@/lib/rate-limit';

const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
const { success } = await nameGeneratorLimiter.limit(ip);

if (!success) {
  return NextResponse.json(
    { error: "You've reached your free limit for today." },
    { status: 429 }
  );
}
```

### 10.4 Webhook Routes Verify Signatures

The Lemon Squeezy webhook handler **must** verify the HMAC signature before processing any event. Never trust unverified webhook payloads.

---

## 11. Form & Server Action Rules

### 11.1 Server Actions for All Form Submissions

Every form on the site (Contact, Brand Report, Newsletter, Quiz email capture, Onboarding) submits via a **Next.js Server Action**, not a client-side `fetch()` to an API route.

```typescript
// ✅ CORRECT: Server Action
// src/app/contact/actions.ts
'use server';

import { contactFormSchema } from '@/lib/schemas';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';

export async function submitContactForm(formData: FormData) {
  const validated = contactFormSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    // ...
  });

  const supabase = createServerClient();
  await supabase.from('contact_submissions').insert(validated);
  await resend.emails.send({ /* auto-reply */ });

  return { success: true };
}
```

### 11.2 Validate on Both Sides

- **Client-side:** Basic HTML validation (`required`, `type="email"`, `minLength`) for immediate feedback
- **Server-side:** Zod validation in the Server Action for security. Client validation is a UX convenience — server validation is the real gate.

### 11.3 Every Form Has a Consent Checkbox

All email capture forms include a non-pre-checked marketing consent checkbox (NDPR requirement):

```
☐ I agree to receive the PeakSeen newsletter and marketing emails.
```

Store the consent value in Supabase alongside the lead.

### 11.4 Every Form Shows Success/Error States

After submission:
- **Success:** Show a Toast notification with a specific message (see CONTENT-STRATEGY.md for exact copy)
- **Error:** Show the error message adjacent to the relevant field, not in a generic alert
- **Loading:** Disable the submit button and show "Sending..." or a spinner inside the button

---

## 12. Animation & Motion Rules

### 12.1 Framer Motion Only

No CSS keyframe animations for component motion. The only CSS animation allowed is the skeleton shimmer keyframe defined in `globals.css`.

### 12.2 Animation Wrappers in src/components/motion/

Create thin, reusable animation wrapper components. Do not duplicate animation logic across pages.

```typescript
// ✅ CORRECT: Reusable wrapper
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

<FadeInOnScroll>
  <Card>...</Card>
</FadeInOnScroll>

// ❌ WRONG: Inline motion.div with hardcoded animation values in every page
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-80px' }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
>
  <Card>...</Card>
</motion.div>
```

### 12.3 Animation Timing Constants

All animation durations and easings must use the tokens defined in the Design System. Do not hardcode arbitrary values.

```typescript
// src/lib/constants.ts
export const MOTION = {
  duration: { fast: 0.15, normal: 0.3, slow: 0.5 },
  ease: { out: [0.16, 1, 0.3, 1], inOut: [0.65, 0, 0.35, 1] },
  stagger: 0.1,
} as const;
```

### 12.4 Always Use `once: true`

Scroll-triggered animations fire once. They do not replay on scroll-up.

### 12.5 Respect Reduced Motion

Every motion component must check `prefers-reduced-motion`. If the user prefers reduced motion, disable the animation entirely (not just speed it up).

```typescript
// Inside motion wrappers
const prefersReducedMotion = 
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  return <>{children}</>;  // Render without animation
}
```

---

## 13. Content & MDX Rules

### 13.1 MDX Files Are Content, Not Code

MDX files in `src/content/` contain written content with frontmatter. They import custom components but do not contain business logic, API calls, or complex state management.

### 13.2 Frontmatter Is the Source of Truth

All post metadata (title, date, category, slug, SEO) comes from frontmatter parsed by `gray-matter`. Do not hardcode metadata in page components.

### 13.3 Custom MDX Components Are Defined in One Place

All custom MDX components (`Callout`, `ToolPromo`, `ProductPromo`, `NewsletterInline`, `ImageGallery`) are defined in `src/components/mdx/` and registered in a single `mdx-components.ts` mapping file.

### 13.4 No HTML in MDX

Use MDX components instead of raw HTML in content files.

```mdx
{/* ✅ CORRECT */}
<Callout type="tip">This is important.</Callout>

{/* ❌ WRONG */}
<div class="callout tip"><p>This is important.</p></div>
```

---

## 14. SEO & Metadata Rules

### 14.1 Use Native Next.js Metadata API

Do not install `next-seo` or any third-party SEO library. Use the built-in `metadata` export.

```typescript
// ✅ CORRECT
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About PeakSeen — Our Story & Values',
  description: '...',
};

// ❌ WRONG
import { NextSeo } from 'next-seo';
```

### 14.2 Every Page Has Metadata

No page ships without a `title` and `description` defined via the `metadata` export. See CONTENT-STRATEGY.md Section 20 for the complete metadata sheet.

### 14.3 One H1 Per Page

Every page has exactly one `<h1>` element. No more. The H1 contains the primary keyword.

### 14.4 Dynamic OG Images for Blog Posts

Blog posts and tool result pages generate dynamic OG images using `opengraph-image.tsx` with `next/og`. Static pages use the default OG image defined in the root layout metadata.

### 14.5 JSON-LD Structured Data

Add structured data as a `<script type="application/ld+json">` tag in the page component. Use the schemas specified in the Tech Stack document: Organization (home), Article (blog), Product (shop), FAQPage (services).

---

## 15. Image & Asset Rules

### 15.1 Always Use next/image

Every image on the site uses the Next.js `<Image>` component. No `<img>` tags.

```typescript
// ✅ CORRECT
import Image from 'next/image';
<Image src="/images/hero.webp" alt="..." width={1200} height={630} />

// ❌ WRONG
<img src="/images/hero.webp" alt="..." />
```

### 15.2 Always Provide width and height (or fill)

To prevent CLS, every `<Image>` must have explicit `width` and `height` props, or use `fill` with a positioned container.

### 15.3 Descriptive Alt Text

Every image has a descriptive `alt` attribute. Decorative images use `alt=""`.

### 15.4 WebP Format

Save all images as `.webp` for optimal compression. Next.js `<Image>` also auto-converts, but starting with WebP avoids unnecessary re-encoding.

### 15.5 Images Go in public/images/

All static images live in `public/images/`. Organise by context: `public/images/blog/`, `public/images/work/`, `public/images/products/`.

---

## 16. Email Rules

### 16.1 Three Email Services — Strict Boundaries

| Service | Use | Never Use For |
|---------|-----|---------------|
| **Resend** | Instant transactional emails triggered by user actions | Marketing sequences, newsletters, follow-ups |
| **Brevo** | Time-delayed sequences, newsletters, lead nurturing | Instant transactional delivery |
| **Lemon Squeezy** | Purchase receipts, download links, refund notices | Anything non-commerce |

### 16.2 Email Templates Are React Components

Transactional emails are built as React components in `src/emails/` using `@react-email/components`. They are **not** HTML strings.

### 16.3 Never Send Emails from Client Components

All email sending happens server-side — in Server Actions or API Routes. The Resend and Brevo API keys are server-only secrets.

### 16.4 Always Include Unsubscribe Link in Marketing Emails

Brevo handles this automatically for marketing emails. Verify it's present before activating any automation.

---

## 17. Third-Party Integration Rules

### 17.1 OpenAI

- Client initialized once in `src/lib/openai.ts`
- Called only from API routes, never from Server Actions or Client Components
- Always wrapped in try/catch with a user-friendly fallback message
- Always rate-limited before calling
- System prompt is stored as a constant in the API route file, not fetched dynamically
- Response parsed as JSON with error handling for malformed responses

### 17.2 Lemon Squeezy

- Checkout uses the hosted overlay (Lemon Squeezy script + `data-overlay` attribute)
- Lemon Squeezy script loaded via `next/script` with `strategy="lazyOnload"`
- Webhook handler verifies HMAC signature before any processing
- Product IDs and variant IDs stored in `src/lib/constants.ts`, not hardcoded in components

### 17.3 Cal.com

- Embed uses `@calcom/embed-react`
- Cal link stored in `NEXT_PUBLIC_CAL_USERNAME` environment variable
- Rendered only in Client Components (it requires browser APIs)
- Wrapped in a Suspense boundary with a skeleton fallback

### 17.4 Brevo

- Client initialized once in `src/lib/brevo.ts`
- Called only from Server Actions and API Routes
- Contact creation always uses `updateEnabled: true` to avoid duplicate contacts

### 17.5 Upstash Redis

- Client initialized once in `src/lib/rate-limit.ts`
- Rate limiters defined as named exports in the same file
- Each tool/form has its own limiter with a unique prefix
- Never accessed from Client Components

---

## 18. Error Handling Rules

### 18.1 Never Let the App Crash

Every external API call (OpenAI, Supabase, Resend, Brevo, PageSpeed) is wrapped in try/catch. On failure, the user sees a helpful message — never a stack trace or blank screen.

### 18.2 Error Boundary per Route Segment

Each major route segment has an `error.tsx` file that catches rendering errors and shows a branded fallback UI.

### 18.3 Global Not Found Page

`src/app/not-found.tsx` shows a branded 404 page with navigation back to home and tools.

### 18.4 API Route Error Responses

API routes return structured error responses, never plain text:

```typescript
// ✅ CORRECT
return NextResponse.json(
  { error: 'Rate limit exceeded', message: 'Try again tomorrow.' },
  { status: 429 }
);

// ❌ WRONG
return new Response('Too many requests', { status: 429 });
```

### 18.5 Form Error States Are Field-Level

Form errors are shown adjacent to the failing field, not in a single generic error block at the top of the form.

### 18.6 Console Errors Are Warnings

In production, `console.error` should log actionable information. Never leave raw error objects — always include context:

```typescript
console.error('[Quiz Submit] Failed to save results:', error.message);
```

---

## 19. Accessibility Rules

### 19.1 Semantic HTML First

Use the correct HTML element for the content. Do not use `<div>` where `<section>`, `<article>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, or `<header>` is appropriate.

### 19.2 Button vs Link

- `<button>` for actions (submit form, open modal, toggle state)
- `<a>` / `<Link>` for navigation (go to another page or anchor)

```typescript
// ✅ CORRECT: Button for action
<Button onClick={openModal}>Open</Button>

// ✅ CORRECT: Link for navigation
<Link href="/services">View Services</Link>

// ❌ WRONG: Button used for navigation
<button onClick={() => router.push('/services')}>View Services</button>

// ❌ WRONG: Link used for action
<a href="#" onClick={handleSubmit}>Submit</a>
```

### 19.3 All Inputs Have Labels

Every form input has an associated `<label>` connected via `htmlFor` and `id`. Placeholder text is not a substitute for a label.

### 19.4 Focus Management

- Focus ring: 2px solid accent colour, 2px offset. Never hidden.
- Modals trap focus while open. Escape key closes.
- After closing a modal, focus returns to the triggering element.
- Skip-to-content link is the first focusable element on every page.

### 19.5 Icon-Only Buttons Need aria-label

```typescript
<button aria-label="Close menu"><X className="h-6 w-6" /></button>
```

### 19.6 Colour Is Not the Only Indicator

Error states use icon + text + colour. Score bands use text labels alongside colour coding. Never rely on colour alone.

---

## 20. Performance Rules

### 20.1 Dynamic Imports for Heavy Components

Components that are not needed on initial page load must be dynamically imported:

```typescript
import dynamic from 'next/dynamic';

const QuizEngine = dynamic(() => import('@/components/features/quiz/quiz-engine'), {
  loading: () => <Skeleton className="h-96" />,
});

const RadarChart = dynamic(() => import('@/components/features/quiz/radar-chart'), {
  ssr: false,
});
```

**Always dynamically import:** Quiz engine, chart libraries, colour palette generator, PDF viewer, Cal.com embed.

### 20.2 No Unnecessary Client-Side JavaScript

If a component renders static content and has no interactivity, it must be a Server Component. Do not add `'use client'` just because it's easier.

### 20.3 Images Are Lazy-Loaded Below the Fold

Only hero/above-the-fold images use `priority` prop. Everything below the fold uses default lazy loading.

```typescript
// Above the fold
<Image src="..." priority />

// Below the fold (default: lazy)
<Image src="..." />
```

### 20.4 Fonts Are Locally Hosted

All fonts are loaded via `next/font/local` from `public/fonts/`. No Google Fonts CDN requests.

### 20.5 ISR for Blog Posts

Blog posts and case studies use Incremental Static Regeneration with a revalidation interval of 3600 seconds (1 hour).

```typescript
export const revalidate = 3600;
```

### 20.6 Bundle Size Vigilance

Before adding any new dependency, check its bundle size on [bundlephobia.com](https://bundlephobia.com). If it adds more than 20KB gzipped and there's a lighter alternative, use the lighter one.

---

## 21. Security Rules

### 21.1 Environment Variable Discipline

| Prefix | Exposed To | Use For |
|--------|-----------|---------|
| `NEXT_PUBLIC_` | Browser + Server | Non-sensitive public values (Supabase URL, Cal username, site URL) |
| No prefix | Server only | API keys, secrets, service role keys |

**Never** put an API key or secret in a `NEXT_PUBLIC_` variable.

### 21.2 No Secrets in Code

Do not hardcode API keys, secrets, or credentials anywhere in the codebase. Always use `process.env`.

```typescript
// ✅ CORRECT
const apiKey = process.env.OPENAI_API_KEY!;

// ❌ WRONG
const apiKey = 'sk-abc123...';
```

### 21.3 Sanitise User Inputs for LLM Prompts

Before sending user-provided text to OpenAI, strip HTML tags and limit character counts:

```typescript
const sanitisedKeywords = keywords.map(k => 
  k.replace(/<[^>]*>/g, '').slice(0, 50).trim()
);
```

### 21.4 Webhook Signatures Are Mandatory

The Lemon Squeezy webhook handler must verify the `X-Signature` header using HMAC-SHA256 before processing. If verification fails, return 401 immediately.

### 21.5 Rate Limiting on All Public-Facing Mutation Endpoints

Every API route and Server Action that accepts public input (no auth required) must be rate-limited to prevent abuse.

---

## 22. Git & Workflow Rules

### 22.1 Branch Strategy

```
main              → Production (auto-deploys to peakseen.com)
feature/{name}    → Feature branches (create PR to main)
fix/{name}        → Bug fix branches (create PR to main)
```

### 22.2 Commit Message Format

```
type: short description

Types:
- feat: New feature
- fix: Bug fix
- style: Styling/UI changes (no logic change)
- refactor: Code restructuring (no behaviour change)
- content: Blog posts, copy changes, MDX updates
- config: Configuration changes (env, tailwind, tsconfig)
- docs: Documentation updates
- chore: Maintenance (dependency updates, cleanup)

Examples:
feat: build brand clarity score quiz
fix: correct score calculation for dimension 3
style: adjust hero headline font size on mobile
content: add blog post on brand identity for startups
config: add Lemon Squeezy webhook env variables
```

### 22.3 No Direct Pushes to Main

All changes go through a Pull Request. Even for solo development, this ensures Vercel creates a preview deployment for testing.

### 22.4 .gitignore Must Include

```
node_modules/
.next/
.env.local
.env*.local
.vercel
*.tsbuildinfo
```

---

## 23. Naming Conventions

### Files

| Type | Convention | Example |
|------|-----------|---------|
| Component files | `kebab-case.tsx` | `progress-bar.tsx`, `cta-block.tsx` |
| Page files | `page.tsx` (always) | `src/app/about/page.tsx` |
| Layout files | `layout.tsx` (always) | `src/app/layout.tsx` |
| API route files | `route.ts` (always) | `src/app/api/quiz/submit/route.ts` |
| Library files | `kebab-case.ts` | `supabase-server.ts`, `rate-limit.ts` |
| Type files | `kebab-case.ts` | `src/types/index.ts` |
| MDX content | `kebab-case.mdx` | `brand-identity-startup.mdx` |
| Email templates | `kebab-case.tsx` | `quiz-results.tsx` |
| CSS files | `kebab-case.css` | `globals.css` |

### Components (in code)

| Type | Convention | Example |
|------|-----------|---------|
| Component names | `PascalCase` | `Button`, `ProgressBar`, `CTABlock` |
| Props interfaces | `PascalCase` + `Props` | `ButtonProps`, `CardProps` |
| Hook names | `camelCase` with `use` prefix | `useQuizState`, `useScrollPosition` |

### Variables and Functions

| Type | Convention | Example |
|------|-----------|---------|
| Functions | `camelCase` | `submitContactForm`, `generateNames` |
| Constants | `UPPER_SNAKE_CASE` | `MOTION`, `MAX_RETRIES`, `SCORE_BANDS` |
| Boolean variables | `is/has/should` prefix | `isLoading`, `hasError`, `shouldAnimate` |
| Event handlers | `handle` prefix | `handleSubmit`, `handleSelect` |

### Database

| Type | Convention | Example |
|------|-----------|---------|
| Table names | `snake_case` (plural) | `leads`, `brand_quiz_results`, `orders` |
| Column names | `snake_case` | `created_at`, `business_name`, `report_url` |

### Routes / URLs

| Type | Convention | Example |
|------|-----------|---------|
| Page routes | `kebab-case` | `/brand-report`, `/brand-clarity-score` |
| API routes | `kebab-case` | `/api/tools/name-generator` |
| Blog slugs | `kebab-case` | `/blog/brand-identity-startup` |

---

## 24. Anti-Patterns (Never Do This)

This section lists specific mistakes AI coding assistants frequently make. Each entry exists because the failure has been observed.

### Code Organisation

| ❌ Never | ✅ Instead |
|----------|-----------|
| Define components inline inside page files | Extract to `components/features/{page}/` |
| Create `utils/`, `helpers/`, `common/` folders | Use `src/lib/utils.ts` for utilities, `src/lib/constants.ts` for constants |
| Create barrel `index.ts` re-export files | Import directly from source files |
| Put UI components in `src/app/` | UI components go in `src/components/ui/` |
| Create a second Supabase client file | Use the two canonical files in `src/lib/` |
| Duplicate a component that already exists | Check `src/components/ui/` first |
| Create `_components/` folders inside route segments | Use `src/components/features/{page}/` |

### Styling

| ❌ Never | ✅ Instead |
|----------|-----------|
| Use raw hex values in className | Use design system colour tokens |
| Write CSS modules or .scss files | Use Tailwind classes only |
| Use `@apply` in CSS files | Keep styles in JSX className |
| Use inline `style={{}}` for static styles | Use Tailwind classes |
| Use `!important` | Fix the specificity issue properly |
| Make entire pages desktop-first and override down | Mobile-first: base = mobile, `md:` `lg:` = larger |

### TypeScript

| ❌ Never | ✅ Instead |
|----------|-----------|
| Use `any` | Use `unknown` and narrow with Zod |
| Use `as` type assertions | Narrow types properly |
| Use `// @ts-ignore` or `// @ts-expect-error` | Fix the type error |
| Define shared types in component files | Put shared types in `src/types/index.ts` |
| Use enum | Use `as const` objects or union types |

### Next.js

| ❌ Never | ✅ Instead |
|----------|-----------|
| Create files in `pages/` or `src/pages/` | Use `src/app/` (App Router only) |
| Use `getServerSideProps` or `getStaticProps` | Use Server Components, `fetch()` in components, or ISR |
| Use `useRouter` from `next/router` | Use `useRouter` from `next/navigation` |
| Use `<Head>` from `next/head` | Use the `metadata` export |
| Add `'use client'` to a component that doesn't need it | Default to Server Components |
| Use `<img>` tags | Use `next/image` `<Image>` component |
| Use `<a>` tags for internal links | Use `next/link` `<Link>` component |

### Data & API

| ❌ Never | ✅ Instead |
|----------|-----------|
| Call Supabase directly from Client Components | Use Server Actions or API Routes |
| Call OpenAI from a Server Action | Call from an API Route (allows streaming, rate limiting) |
| Trust unvalidated form data | Validate with Zod in every Server Action |
| Skip webhook signature verification | Always verify before processing |
| Hardcode API keys in source code | Use environment variables |
| Send emails from Client Components | Send from Server Actions or API Routes |
| Create a new API route for form submissions | Use Server Actions |

### Dependencies

| ❌ Never | ✅ Instead |
|----------|-----------|
| Install `next-seo` | Use native Next.js Metadata API |
| Install `styled-components` or `emotion` | Use Tailwind CSS |
| Install `axios` | Use native `fetch()` |
| Install `moment` or `dayjs` for simple formatting | Use `Intl.DateTimeFormat` or native Date methods |
| Install `lodash` for one utility function | Write the function yourself |
| Install a state management library (Redux, Zustand, Jotai) | Use `useState` + URL search params for V1 |
| Install `react-icons` | Use `lucide-react` |
| Install a form library (react-hook-form, formik) for simple forms | Use native HTML forms + Server Actions |
| Install any dependency not in TECH-STACK.md | Ask first |

---

## 25. Reference Documents

When generating code for any part of PeakSeen, consult the relevant companion document:

| Task | Document | Section |
|------|----------|---------|
| Building a UI component | DESIGN-SYSTEM.md | Section 10 (Component Library) |
| Choosing colours | DESIGN-SYSTEM.md | Section 2 (Color System) |
| Setting typography | DESIGN-SYSTEM.md | Section 3 (Typography) |
| Writing animations | DESIGN-SYSTEM.md | Section 7 (Animation & Motion) |
| Writing page copy | CONTENT-STRATEGY.md | Sections 3–17 (per page) |
| Writing metadata | CONTENT-STRATEGY.md | Section 20 (SEO Metadata Master Sheet) |
| Setting up integrations | TECH-STACK.md | Sections 7–18 |
| Database schema | TECH-STACK.md | Section 7.3 (Database Schema) |
| Environment variables | TECH-STACK.md | Section 21 |
| Writing email copy | CONTENT-STRATEGY.md | Section 19 (Email Copy) |
| Understanding user flows | PRD.md | Section 8 (Interactive Tools) |
| Understanding business goals | PRD.md | Section 2 (Product Vision & Goals) |

---

## 26. Pre-Commit Checklist

Before committing any code or presenting it as complete, verify every item:

### Code Quality
- [ ] No `any` types in the changeset
- [ ] No `as` type assertions (unless `as const`)
- [ ] No `// @ts-ignore` or `// @ts-expect-error`
- [ ] No `console.log` (use `console.error` for error logging only)
- [ ] All imports use the `@/` path alias
- [ ] No unused imports or variables
- [ ] No duplicate component definitions

### Architecture
- [ ] Components are in the correct folder (`ui/`, `layout/`, `features/`, `motion/`)
- [ ] No components defined inline in page files
- [ ] `'use client'` is present only where required
- [ ] Server-only code is not imported in Client Components
- [ ] No `NEXT_PUBLIC_` prefix on secret environment variables
- [ ] All external API calls are wrapped in try/catch

### Design System Compliance
- [ ] Uses design system colour tokens (no raw hex in className)
- [ ] Uses design system font families (font-display, font-body, font-mono)
- [ ] Uses design system spacing (py-16 lg:py-24, p-6 lg:p-8, gap-6 lg:gap-8)
- [ ] Uses design system border radius tokens
- [ ] Uses the `<Button>` component (no custom styled buttons)
- [ ] Uses the `<Image>` component (no `<img>` tags)
- [ ] Uses `<Link>` for internal navigation (no `<a>` tags)

### Accessibility
- [ ] All form inputs have associated `<label>` elements
- [ ] All icon-only buttons have `aria-label`
- [ ] All images have descriptive `alt` text
- [ ] Colour is not the sole information indicator
- [ ] Interactive elements are keyboard-accessible
- [ ] Focus indicators are visible

### SEO
- [ ] Page has a `metadata` export with `title` and `description`
- [ ] Page has exactly one `<h1>` element
- [ ] Heading levels are not skipped (H1 → H2 → H3)

### Performance
- [ ] Heavy components are dynamically imported
- [ ] Images below the fold do not use `priority`
- [ ] No unnecessary Client Component boundaries

### Content
- [ ] Copy matches CONTENT-STRATEGY.md for this page/component
- [ ] CTA text starts with a verb
- [ ] No placeholder "Lorem ipsum" text in committed code

---

*AI Rules prepared for PeakSeen — Brand & Product Studio*
*Version 1.0 · Load this file at the start of every AI coding session.*
*These rules are non-negotiable. Follow them without exception.*