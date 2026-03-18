# PeakSeen — Design System

**Version:** 1.0
**Status:** Ready for Implementation
**Last Updated:** 2025
**Aesthetic Direction:** Luxury studio × creative tech lab — editorial precision meets digital sophistication.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Border Radius](#5-border-radius)
6. [Shadows & Elevation](#6-shadows--elevation)
7. [Animation & Motion](#7-animation--motion)
8. [Iconography](#8-iconography)
9. [Imagery & Art Direction](#9-imagery--art-direction)
10. [Component Library](#10-component-library)
    - [10.1 Button](#101-button)
    - [10.2 Card](#102-card)
    - [10.3 Badge](#103-badge)
    - [10.4 Input](#104-input)
    - [10.5 Modal](#105-modal)
    - [10.6 Toast](#106-toast)
    - [10.7 Skeleton](#107-skeleton)
    - [10.8 ProgressBar](#108-progressbar)
    - [10.9 Avatar](#109-avatar)
    - [10.10 Tag](#1010-tag)
    - [10.11 Tooltip](#1011-tooltip)
    - [10.12 CTA Block](#1012-cta-block)
    - [10.13 Navbar](#1013-navbar)
    - [10.14 Footer](#1014-footer)
11. [Responsive Breakpoints & Mobile UX](#11-responsive-breakpoints--mobile-ux)
12. [Accessibility Standards](#12-accessibility-standards)
13. [Dark & Light Surface Rules](#13-dark--light-surface-rules)
14. [File & Folder Structure](#14-file--folder-structure)
15. [Implementation Checklist](#15-implementation-checklist)

---

## 1. Design Philosophy

PeakSeen's design language communicates **clarity, elevation, and technical sophistication**. Every visual decision should feel intentional — as if a fashion editorial art director and a senior product engineer built it together.

### Core Principles

| Principle | What It Means in Practice |
|-----------|---------------------------|
| **Clarity over decoration** | Every element earns its place. No ornamental UI. If it doesn't communicate or guide, remove it. |
| **Space is a material** | Generous whitespace is not emptiness — it's breathing room that signals premium quality. Let sections breathe. |
| **Typography is the hero** | Large, confident type drives every page. Imagery supports; headlines lead. |
| **Motion is communication** | Animation is never decorative. It guides attention, reveals hierarchy, and communicates state changes. |
| **Mobile is the primary canvas** | The African founder audience is mobile-first. Design for thumbs, constrained bandwidth, and small viewports first — then expand to desktop. |

### Anti-Patterns (Never Do This)

- Generic stock photography (handshakes, people pointing at screens)
- Rainbow gradients or more than one accent color used simultaneously
- Spinners for content loading (use skeleton shimmers instead)
- Centered paragraph text longer than 3 lines
- Borders where spacing alone creates separation
- More than 2 typefaces on a single page
- Decorative animations that don't respond to user action or scroll position
- Tooltips or hover-only content that hides critical information on mobile

---

## 2. Color System

The palette is rooted in a **neutral base** — charcoal and ivory — with a single bold accent that provides energy. The system supports both dark-surface sections (heroes, tool sections, CTAs) and light-surface sections (body content, forms, blog) within the same page.

### 2.1 Palette Definition

```css
:root {
  /* ─── Primary Palette (Neutral Base) ─── */
  --color-charcoal:      #1A1A1A;   /* Deep black — primary dark backgrounds, trust & depth */
  --color-ivory:         #F9F8F6;   /* Warm off-white — light backgrounds, premium warmth */
  --color-warm-grey:     #EBEBEB;   /* Soft grey — borders, dividers, subtle UI surfaces */

  /* ─── Accent Color ─── */
  --color-burnt-orange:  #D95C3C;   /* The signature accent — energy, visibility, action */

  /* ─── Alternative Accents (choose ONE per brand expression) ─── */
  /* --color-electric-blue: #2B5BEE; */
  /* --color-forest-green:  #1B4D3E; */

  /* ─── Extended Neutrals ─── */
  --color-grey-900:      #1A1A1A;   /* Same as charcoal — alias for consistency */
  --color-grey-800:      #2C2C2C;   /* Card surfaces on dark backgrounds */
  --color-grey-700:      #3D3D3D;   /* Hover states on dark surfaces */
  --color-grey-600:      #4A4A4A;   /* Body text on light backgrounds */
  --color-grey-500:      #6B6B6B;   /* Secondary text */
  --color-grey-400:      #8C8C8C;   /* Muted/placeholder text */
  --color-grey-300:      #ABABAB;   /* Disabled states */
  --color-grey-200:      #D4D4D4;   /* Subtle borders */
  --color-grey-100:      #EBEBEB;   /* Same as warm-grey — dividers, input borders */
  --color-grey-50:       #F4F4F2;   /* Lightest surface — card backgrounds on ivory pages */

  /* ─── Feedback Colors ─── */
  --color-success:       #1B7A4A;   /* Green — confirmations, positive states */
  --color-success-light: #E8F5EE;   /* Green tint — success backgrounds */
  --color-warning:       #C4841D;   /* Amber — caution states */
  --color-warning-light: #FFF5E0;   /* Amber tint — warning backgrounds */
  --color-error:         #C93B3B;   /* Red — error states, destructive actions */
  --color-error-light:   #FDECEC;   /* Red tint — error backgrounds */
  --color-info:          #2B5BEE;   /* Blue — informational states */
  --color-info-light:    #EBF0FF;   /* Blue tint — info backgrounds */
}
```

### 2.2 Semantic Tokens

Semantic tokens abstract raw colors into purpose-driven variables. **Always use semantic tokens in components** — never reference raw palette values directly.

```css
:root {
  /* ─── Backgrounds ─── */
  --bg-primary:          var(--color-charcoal);      /* Dark hero sections, navbars */
  --bg-surface:          var(--color-ivory);          /* Page body, light sections */
  --bg-surface-raised:   var(--color-grey-50);        /* Cards on ivory backgrounds */
  --bg-surface-dark:     var(--color-grey-800);        /* Cards on dark backgrounds */
  --bg-overlay:          rgba(26, 26, 26, 0.6);       /* Modal/menu overlays */

  /* ─── Text ─── */
  --text-primary:        var(--color-ivory);           /* Headlines on dark backgrounds */
  --text-primary-inverse:var(--color-charcoal);        /* Headlines on light backgrounds */
  --text-body:           var(--color-grey-600);         /* Body copy on light backgrounds */
  --text-body-dark:      var(--color-grey-300);         /* Body copy on dark backgrounds */
  --text-muted:          var(--color-grey-400);         /* Captions, timestamps, placeholders */
  --text-link:           var(--color-burnt-orange);     /* Inline links */

  /* ─── Accent ─── */
  --accent:              var(--color-burnt-orange);     /* Primary CTA, active states, highlights */
  --accent-hover:        #C14E31;                       /* Darkened accent for hover/press */
  --accent-subtle:       rgba(217, 92, 60, 0.10);      /* Accent tint for backgrounds */

  /* ─── Borders ─── */
  --border:              var(--color-grey-100);          /* Default border on light surfaces */
  --border-dark:         var(--color-grey-700);          /* Border on dark surfaces */
  --border-focus:        var(--color-burnt-orange);      /* Focus ring color */
}
```

### 2.3 Contrast & Accessibility Reference

All text/background pairings must meet **WCAG 2.1 AA** minimum. Key pairings verified:

| Foreground | Background | Contrast Ratio | Pass |
|------------|------------|---------------|------|
| `--color-ivory` (#F9F8F6) | `--color-charcoal` (#1A1A1A) | 15.5:1 | AAA |
| `--color-grey-600` (#4A4A4A) | `--color-ivory` (#F9F8F6) | 7.2:1 | AAA |
| `--color-grey-400` (#8C8C8C) | `--color-ivory` (#F9F8F6) | 3.3:1 | AA Large |
| `--color-burnt-orange` (#D95C3C) | `--color-charcoal` (#1A1A1A) | 4.7:1 | AA |
| `--color-burnt-orange` (#D95C3C) | `--color-ivory` (#F9F8F6) | 3.3:1 | AA Large only |
| `--color-ivory` (#F9F8F6) | `--color-grey-800` (#2C2C2C) | 12.8:1 | AAA |

> **Rule:** Never use `--color-burnt-orange` as text on `--color-ivory` for body copy — only for large text (≥18px bold / ≥24px regular) or interactive elements with additional visual indicators (underline, icon).

---

## 3. Typography

Two typefaces create the **"tech × editorial"** contrast central to PeakSeen's personality. The display font carries authority and modernity; the body font carries warmth and storytelling.

### 3.1 Typeface Selection

| Role | Font | Fallback Stack | Use |
|------|------|----------------|-----|
| **Display** | Satoshi | `'Satoshi', -apple-system, 'Helvetica Neue', sans-serif` | Headlines, navigation, buttons, labels, UI elements |
| **Body** | Editorial New | `'Editorial New', 'Georgia', 'Times New Roman', serif` | Blog articles, long-form descriptions, testimonials, storytelling sections |
| **Mono** | JetBrains Mono | `'JetBrains Mono', 'Fira Code', monospace` | Code blocks, technical labels, data values (scores, hex codes) |

### 3.2 Loading Strategy

All fonts **must** be loaded via `next/font` to eliminate render-blocking and layout shift.

```typescript
// src/lib/fonts.ts
import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [
    { path: '../fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});

export const editorialNew = localFont({
  src: [
    { path: '../fonts/EditorialNew-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/EditorialNew-Italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const jetbrainsMono = localFont({
  src: [
    { path: '../fonts/JetBrainsMono-Regular.woff2', weight: '400', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
});
```

```typescript
// src/app/layout.tsx
import { satoshi, editorialNew, jetbrainsMono } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html className={`${satoshi.variable} ${editorialNew.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### 3.3 Type Scale

The scale uses a **modular ratio** that creates clear visual hierarchy. Sizes are defined as CSS custom properties and mapped to Tailwind utilities.

```css
:root {
  --text-xs:     0.75rem;    /* 12px — Fine print, legal text */
  --text-sm:     0.875rem;   /* 14px — Captions, badges, timestamps */
  --text-base:   1rem;       /* 16px — Body copy (minimum readable size) */
  --text-lg:     1.125rem;   /* 18px — Body copy (preferred for long-form) */
  --text-xl:     1.25rem;    /* 20px — Lead paragraphs, subheadlines */
  --text-2xl:    1.5rem;     /* 24px — Section subheadings (H4) */
  --text-3xl:    1.875rem;   /* 30px — Section headings (H3) */
  --text-4xl:    2.25rem;    /* 36px — Page subheadings (H2) */
  --text-5xl:    3rem;       /* 48px — Page headings (H1) on mobile */
  --text-6xl:    3.75rem;    /* 60px — Page headings (H1) on tablet */
  --text-7xl:    4.5rem;     /* 72px — Hero headlines on desktop */
  --text-8xl:    6rem;       /* 96px — Hero headlines on large desktop */
}
```

### 3.4 Type Styles (Predefined Compositions)

Each composition defines the font family, size, weight, line-height, letter-spacing, and responsive behaviour. **Use these compositions — don't freestyle type styles.**

| Token Name | Font | Desktop Size | Mobile Size | Weight | Line Height | Letter Spacing | Use Case |
|------------|------|-------------|-------------|--------|-------------|---------------|----------|
| `hero-headline` | Display | `--text-8xl` (96px) | `--text-5xl` (48px) | 900 (Black) | 1.0 | -0.03em | Homepage hero, max 1 per page |
| `page-headline` | Display | `--text-7xl` (72px) | `--text-4xl` (36px) | 700 (Bold) | 1.05 | -0.025em | Page H1 (About, Services, etc.) |
| `section-headline` | Display | `--text-4xl` (36px) | `--text-3xl` (30px) | 700 (Bold) | 1.15 | -0.015em | H2 — section titles |
| `section-subheadline` | Display | `--text-2xl` (24px) | `--text-xl` (20px) | 500 (Medium) | 1.3 | -0.01em | H3 — subsection titles |
| `card-title` | Display | `--text-xl` (20px) | `--text-lg` (18px) | 700 (Bold) | 1.3 | -0.01em | Card headings, product names |
| `body-large` | Body | `--text-lg` (18px) | `--text-base` (16px) | 400 (Regular) | 1.7 | 0 | Hero subheadlines, lead paragraphs |
| `body` | Body | `--text-base` (16px) | `--text-base` (16px) | 400 (Regular) | 1.7 | 0 | Standard body copy, descriptions |
| `body-small` | Display | `--text-sm` (14px) | `--text-sm` (14px) | 400 (Regular) | 1.6 | 0 | Captions, metadata, timestamps |
| `label` | Display | `--text-sm` (14px) | `--text-sm` (14px) | 500 (Medium) | 1.4 | 0.02em | Form labels, badges, navigation |
| `overline` | Display | `--text-xs` (12px) | `--text-xs` (12px) | 700 (Bold) | 1.4 | 0.1em | Tier labels ("TIER 1"), category overlines — always uppercase |
| `button` | Display | `--text-sm` (14px) | `--text-sm` (14px) | 700 (Bold) | 1.0 | 0.02em | Button labels |
| `mono` | Mono | `--text-sm` (14px) | `--text-sm` (14px) | 400 (Regular) | 1.6 | 0 | Scores, hex codes, technical values |

### 3.5 Tailwind Configuration (Typography)

```typescript
// tailwind.config.ts (partial)
{
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'Helvetica Neue', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.4' }],
        'sm':   ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem',     { lineHeight: '1.7' }],
        'lg':   ['1.125rem', { lineHeight: '1.7' }],
        'xl':   ['1.25rem',  { lineHeight: '1.5' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.3' }],
        '3xl':  ['1.875rem', { lineHeight: '1.3' }],
        '4xl':  ['2.25rem',  { lineHeight: '1.15' }],
        '5xl':  ['3rem',     { lineHeight: '1.1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1.05' }],
        '7xl':  ['4.5rem',   { lineHeight: '1.05' }],
        '8xl':  ['6rem',     { lineHeight: '1.0' }],
      },
    },
  },
}
```

### 3.6 Typography Rules

1. **One H1 per page.** Always. This is both a design and SEO requirement.
2. **Never skip heading levels.** H1 → H2 → H3. No jumping from H1 to H4.
3. **Body copy max-width: 680px** (`max-w-prose`). Never let body text span a full 12-column width.
4. **Display font for UI, Body font for reading.** If the user scans it, use Satoshi. If they read it, use Editorial New.
5. **Minimum body text size: 16px.** Never smaller for content paragraphs. 14px is acceptable only for captions, metadata, and labels.
6. **Responsive headlines are mandatory.** Every headline composition has a mobile and desktop size. Use Tailwind responsive prefixes (`text-5xl md:text-7xl lg:text-8xl`).
7. **Uppercase is reserved for `overline` style only.** Tier labels, category tags. Never uppercase entire headlines or buttons.

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Based on a **4px base unit**. All spacing values are multiples of 4.

```css
:root {
  --space-0:    0;
  --space-1:    0.25rem;   /*  4px */
  --space-2:    0.5rem;    /*  8px */
  --space-3:    0.75rem;   /* 12px */
  --space-4:    1rem;      /* 16px */
  --space-5:    1.25rem;   /* 20px */
  --space-6:    1.5rem;    /* 24px */
  --space-8:    2rem;      /* 32px */
  --space-10:   2.5rem;    /* 40px */
  --space-12:   3rem;      /* 48px */
  --space-16:   4rem;      /* 64px */
  --space-20:   5rem;      /* 80px */
  --space-24:   6rem;      /* 96px */
  --space-32:   8rem;      /* 128px */
}
```

### 4.2 Layout Constants

| Property | Value | Tailwind Class | Notes |
|----------|-------|---------------|-------|
| **Container max-width** | 1280px | `max-w-7xl` | All page content sits within this width |
| **Container horizontal padding** | 24px (mobile) / 32px (desktop) | `px-6 lg:px-8` | Prevents content touching screen edges |
| **Section vertical padding** | 64px (mobile) / 96px (desktop) | `py-16 lg:py-24` | Vertical breathing room between page sections |
| **Grid columns** | 12 | CSS Grid or Tailwind `grid-cols-12` | Standard web grid |
| **Grid gap** | 24px (mobile) / 32px (desktop) | `gap-6 lg:gap-8` | Space between grid items |
| **Card internal padding** | 24px (mobile) / 32px (desktop) | `p-6 lg:p-8` | Space inside card containers |
| **Content max-width (prose)** | 680px | `max-w-prose` | Long-form text blocks (blog, descriptions) |
| **Form max-width** | 560px | `max-w-xl` | Single-column forms |

### 4.3 Section Container Pattern

Every page section follows this structure:

```tsx
<section className="py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

For full-bleed background sections (heroes, dark CTAs), wrap the container inside a styled section:

```tsx
<section className="bg-[--bg-primary] py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Content with light text */}
  </div>
</section>
```

### 4.4 Grid Patterns

**3-column cards (Services, Products, Blog, Tools):**
```tsx
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {/* Card components */}
</div>
```

**2-column layout (Case studies, split content):**
```tsx
<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
  {/* Left / Right blocks */}
</div>
```

**Asymmetric split (Text left + cards right — homepage "What We Do"):**
```tsx
<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
  <div className="lg:col-span-4">
    {/* Text block */}
  </div>
  <div className="lg:col-span-8">
    {/* Card grid */}
  </div>
</div>
```

---

## 5. Border Radius

A consistent radius scale prevents visual inconsistency across components.

```css
:root {
  --radius-sm:    4px;     /* Small badges, tags, inline code */
  --radius-md:    8px;     /* Buttons, inputs, small cards */
  --radius-lg:    16px;    /* Standard cards, image containers */
  --radius-xl:    24px;    /* Hero cards, featured content, modals */
  --radius-full:  9999px;  /* Pill shapes, avatars, round buttons */
}
```

### Radius Usage Rules

| Component | Radius Token |
|-----------|-------------|
| Buttons (all sizes) | `--radius-md` (8px) |
| Input fields | `--radius-md` (8px) |
| Cards (standard) | `--radius-lg` (16px) |
| Cards (hero/featured) | `--radius-xl` (24px) |
| Badges & Tags | `--radius-full` (pill) |
| Avatar | `--radius-full` (circle) |
| Modals | `--radius-xl` (24px) |
| Toast notifications | `--radius-lg` (16px) |
| Tooltips | `--radius-md` (8px) |
| Images (inline) | `--radius-lg` (16px) |
| Images (hero/full-width) | `0` or `--radius-lg` (no radius at full bleed) |

---

## 6. Shadows & Elevation

Shadows create depth hierarchy. PeakSeen uses **three elevation levels** and one accent shadow.

```css
:root {
  --shadow-sm:     0 1px 3px rgba(26, 26, 26, 0.08);
  --shadow-md:     0 4px 16px rgba(26, 26, 26, 0.12);
  --shadow-lg:     0 8px 32px rgba(26, 26, 26, 0.16);
  --shadow-accent: 0 4px 24px rgba(217, 92, 60, 0.25);
}
```

### Elevation Usage

| Level | Token | Use |
|-------|-------|-----|
| **Resting** | `--shadow-sm` | Cards at rest on light backgrounds, subtle depth |
| **Elevated** | `--shadow-md` | Cards on hover, dropdown menus, floating elements |
| **Prominent** | `--shadow-lg` | Modals, image lightboxes, active overlays |
| **Accent glow** | `--shadow-accent` | Primary CTA buttons on hover, accent-highlighted cards |

### Shadow Rules

1. **Never use shadows on dark backgrounds.** They're invisible. Use `border` (`--border-dark`) or subtle background changes instead.
2. **Cards transition from `--shadow-sm` to `--shadow-md` on hover.** This is the standard interactive lift.
3. **Modals always use `--shadow-lg`** combined with `--bg-overlay` backdrop.
4. **`--shadow-accent` is reserved for the primary CTA button hover state.** Never apply it to content cards.

---

## 7. Animation & Motion

Motion in PeakSeen communicates **technical sophistication** — it's smooth, purposeful, and never gratuitous. All animation is built with **Framer Motion** in React.

### 7.1 Timing Tokens

```css
:root {
  --duration-fast:     150ms;   /* Hover states, color changes, opacity */
  --duration-normal:   300ms;   /* Page transitions, element reveals */
  --duration-slow:     500ms;   /* Hero animations, score count-ups */
  --duration-stagger:  100ms;   /* Delay between sequential items */

  --ease-out:          cubic-bezier(0.16, 1, 0.3, 1);     /* Entrance — fast start, gentle stop */
  --ease-in-out:       cubic-bezier(0.65, 0, 0.35, 1);    /* Continuous motion */
  --ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1); /* Playful overshoot */
}
```

### 7.2 Standard Animation Patterns

**Fade In + Slide Up (Default entrance for all elements):**
```typescript
// Framer Motion variant
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};
```

**Staggered List (Tool cards, service tiers, blog grids):**
```typescript
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// Apply fadeInUp to each child
```

**Hero Headline Word Stagger:**
```typescript
// Split headline into words, animate each with 0.08s stagger
const wordStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
```

**Hover Lift (Cards):**
```typescript
const cardHover = {
  rest: { scale: 1, boxShadow: 'var(--shadow-sm)' },
  hover: {
    scale: 1.02,
    boxShadow: 'var(--shadow-md)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};
```

**Score Count-Up (Quiz results, stat numbers):**
```typescript
// Animate number from 0 to final value over 1.5s
// Use framer-motion's useMotionValue + useTransform + animate
// Combined with an easeOut curve
```

**Skeleton Shimmer:**
```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-grey-100) 25%,
    var(--color-grey-50) 50%,
    var(--color-grey-100) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

### 7.3 Scroll-Triggered Animations

Use Framer Motion's `whileInView` with `viewport={{ once: true, margin: '-80px' }}` to trigger entrance animations as elements scroll into view. The `once: true` ensures they don't replay on scroll-up.

### 7.4 Page Transitions

Between route changes, apply a fade + subtle slide:

```typescript
// Wrap page content in AnimatePresence + motion.div
const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
```

### 7.5 Reduced Motion

**Always** wrap non-essential animations in a reduced-motion check:

```typescript
const prefersReducedMotion = 
  typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// In Framer Motion: use `layout` prop sparingly, disable decorative animations
```

In CSS:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

### 7.6 Motion Rules

1. **Entrances only** — elements animate *in*, never *out* (except modals/toasts). Page exits get a simple fast fade.
2. **Duration cap: 500ms.** No single animation exceeds this. Hero word staggers may total more, but each word is ≤500ms.
3. **No animation on scroll-up replay.** Use `once: true` on all `whileInView` triggers.
4. **Loading states are shimmers, never spinners.** The only exception is tool processing (audit, name generation) which uses a branded progress indicator.
5. **Hover animations are instant-feel.** Keep to 150–200ms. Users should never "wait" for a hover state.

---

## 8. Iconography

### Icon Set: Lucide React

**Why:** Consistent 24×24 stroke-based icons, lightweight tree-shakeable package, MIT license.

**Install:**
```bash
npm install lucide-react
```

### Usage Rules

| Property | Standard | Compact |
|----------|----------|---------|
| Size | 24×24px | 16×16px (badges, inline) |
| Stroke width | 2px | 1.5px (compact only) |
| Color | `currentColor` (inherits text color) | — |

### Accessibility

Every icon-only button or interactive icon **must** have an `aria-label`:

```tsx
<button aria-label="Close navigation menu">
  <X className="h-6 w-6" />
</button>
```

When an icon accompanies visible text, the icon is decorative — add `aria-hidden="true"`:

```tsx
<a href="/services">
  <Layers className="h-5 w-5 aria-hidden="true" />
  <span>Services</span>
</a>
```

### Recommended Icon Mapping

| Context | Lucide Icon |
|---------|-------------|
| Brand Identity service | `Palette` |
| Digital Products service | `Package` |
| Software/Build service | `Code2` |
| Strategy service | `Target` |
| External link | `ArrowUpRight` |
| CTA arrow | `ArrowRight` |
| Menu (mobile) | `Menu` |
| Close | `X` |
| Search | `Search` |
| Email | `Mail` |
| Calendar/Booking | `CalendarDays` |
| Download | `Download` |
| Check/Success | `Check` |
| Error/Warning | `AlertTriangle` |
| Star (rating) | `Star` |
| Share | `Share2` |
| Copy | `Copy` |
| LinkedIn | Custom SVG (Lucide doesn't include brand icons) |
| Instagram | Custom SVG |
| Twitter/X | Custom SVG |

> **Social media icons:** Lucide does not include brand logos. Use hand-crafted SVGs or the `simple-icons` package, sized to 20×20px and aligned to the same stroke weight visually.

---

## 9. Imagery & Art Direction

### 9.1 Visual Direction

PeakSeen imagery communicates **vision and elevation**. The tone is *fashion editorial × architecture* — minimal, high-contrast, structural.

**Subjects that work:**
- Architectural structures and geometric patterns
- Abstract landscapes with dramatic light/shadow
- Modern cityscape silhouettes (rooftops, skylines, bridges)
- Clean minimal interiors (studios, workspaces)
- Creative culture moments (hands sketching, design tools, studio environments)
- Abstract 3D renders with soft lighting and muted tones

**Subjects to avoid:**
- Stock photos of people shaking hands or pointing at whiteboards
- Overly saturated, busy compositions
- Clip art or flat illustration styles
- Emoji-heavy visuals
- Generic SaaS product screenshots

### 9.2 Image Treatment

| Property | Rule |
|----------|------|
| Aspect ratios | Hero: 16:9 or full-viewport. Cards: 4:3 or 3:2. Product previews: 1:1 or 4:5. |
| Border radius | `--radius-lg` (16px) on standard images. `0` on full-bleed/hero images. |
| Overlay (dark sections) | Use a semi-transparent gradient overlay (`linear-gradient(rgba(26,26,26,0.5), rgba(26,26,26,0.8))`) when placing text on photos. |
| Placeholder | Before images load, show a blurred low-res placeholder or neutral grey skeleton matching the container's aspect ratio. |
| Format | Always serve via Next.js `<Image>` component. WebP auto-conversion, lazy loading, explicit `width`/`height` or `fill` to prevent CLS. |

### 9.3 Empty State Imagery

For launch, many sections will lack real client work. Use **concept/spec work** styled identically to real portfolio pieces, clearly labeled "Concept Work" with a subtle badge. Never show broken image placeholders or "coming soon" grey boxes.

---

## 10. Component Library

All components live in `src/components/ui/`. Each component is a standalone file with co-located types. Components accept a `className` prop for context-specific overrides via Tailwind.

### Implementation Principles

1. **Semantic HTML first.** A `<Button>` renders a `<button>`. A `<Card>` renders an `<article>`. A `<Badge>` renders a `<span>`.
2. **Composable, not monolithic.** Components expose slots/children for flexibility, not rigid prop-based content.
3. **Variants via `class-variance-authority` (CVA).** Every component with multiple visual states uses CVA for type-safe variant management.
4. **`forwardRef` on all interactive components.** Enables external focus management and ref access.
5. **All interactive elements are keyboard-accessible by default.** No exceptions.
6. **Never define UI components inline within page files.** Every reusable component is its own file inside `src/components/`. Page files (`page.tsx`) compose and import components — they do not define them. If you find yourself writing a styled, reusable block directly inside a page file, extract it into `components/ui/` or `components/features/` immediately.

```bash
npm install class-variance-authority clsx tailwind-merge
```

Utility helper:
```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### 10.1 Button

The primary interactive element across the entire site. Used for CTAs, form submissions, navigation triggers, and tool actions.

**Variants:**

| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| `primary` | `--accent` (burnt orange) | White | None | Primary CTAs: "Start a Project", "Get My Free Brand Report" |
| `secondary` | Transparent | `--text-primary-inverse` | 1px `--border` | Secondary actions: "View all services", "Learn more" |
| `ghost` | Transparent | `--text-body` | None | Tertiary actions, inline links styled as buttons |
| `destructive` | `--color-error` | White | None | Delete actions (dashboard settings) |

**Sizes:**

| Size | Height | Padding (x) | Font Size | Icon Size |
|------|--------|------------|-----------|-----------|
| `sm` | 36px | 12px | 14px | 16px |
| `md` | 44px | 20px | 14px | 18px |
| `lg` | 52px | 28px | 16px | 20px |

**States:** Default → Hover (darken 8%, `--shadow-accent` on primary) → Focus (2px offset ring `--border-focus`) → Active (scale 0.98) → Disabled (opacity 0.5, cursor not-allowed) → Loading (spinner replaces text, width locked).

**Interaction:**
- Minimum touch target: 44×44px (even if visual size is smaller, pad the hit area).
- Buttons with trailing arrows (`→`) use the `ArrowRight` icon, which slides 4px right on hover.
- Focus ring: 2px solid `--border-focus`, 2px offset. Always visible on keyboard focus.

```tsx
// Usage
<Button variant="primary" size="lg">
  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
</Button>

<Button variant="ghost" size="sm">
  Learn more
</Button>
```

---

### 10.2 Card

The universal content container used across portfolio, products, blog, tools, services, and testimonials.

**Structure:**
```
┌──────────────────────────────────┐
│  [Image / Thumbnail]             │  ← Optional. Aspect ratio: 3:2 or 4:3. Radius top-left + top-right only.
├──────────────────────────────────┤
│  [Badge]  Category               │  ← Optional overline/badge.
│                                  │
│  Card Title                      │  ← `card-title` type style.
│  Short description or excerpt    │  ← `body-small` type style. Max 2 lines, then truncate.
│                                  │
│  [Metadata]  Price · Rating      │  ← Optional. `body-small` muted text.
│                                  │
│  [CTA Link] View Case Study →   │  ← Optional. `label` style, accent color.
└──────────────────────────────────┘
```

**Specs:**
- Background: `--bg-surface-raised` (on light pages) or `--bg-surface-dark` (on dark sections)
- Padding: `p-6 lg:p-8` (content area below image)
- Border radius: `--radius-lg` (16px)
- Border: `1px solid --border` (on light surfaces) or `1px solid --border-dark` (on dark surfaces)
- Shadow: `--shadow-sm` resting → `--shadow-md` on hover
- Hover: `scale(1.02)`, shadow lift, 200ms ease
- Image: Full-width inside card, `object-cover`, border-radius applies to top corners only

**Variants:**
| Variant | Notes |
|---------|-------|
| `default` | Standard card with optional image, title, description, CTA. |
| `compact` | No image. Used for tool cards and service bullet items. Padding `p-6`. |
| `featured` | Larger. Used for featured blog post and hero case study. Radius `--radius-xl`. |

---

### 10.3 Badge

Small pill-shaped labels for categorization and status indication.

**Variants:**

| Variant | Background | Text Color | Use Case |
|---------|-----------|------------|----------|
| `default` | `--color-grey-100` | `--color-grey-600` | Blog categories, service tags |
| `accent` | `--accent-subtle` | `--accent` | "Most Popular", "New" labels |
| `success` | `--color-success-light` | `--color-success` | Audit passed, good score |
| `warning` | `--color-warning-light` | `--color-warning` | Needs improvement |
| `error` | `--color-error-light` | `--color-error` | Poor score, urgent |

**Specs:**
- Font: `label` type style (14px, Medium weight, 0.02em tracking)
- Padding: `px-3 py-1`
- Border radius: `--radius-full` (pill)
- No border. Background provides the container.
- Height: 28px

---

### 10.4 Input

All form inputs follow a unified style. Used on Contact, Brand Report, Newsletter, Quiz email capture, and tool forms.

**Types:** `text`, `email`, `textarea`, `select` (custom dropdown)

**Specs:**
- Height: 48px (text/email/select), auto for textarea (min-height: 120px)
- Background: White (`#FFFFFF`) on light surfaces; `--color-grey-800` on dark surfaces
- Border: `1px solid --border`
- Border radius: `--radius-md` (8px)
- Padding: `px-4 py-3`
- Font: `body` style (16px) — **must be 16px to prevent iOS zoom on focus**
- Placeholder: `--text-muted` color

**States:**
| State | Appearance |
|-------|-----------|
| Default | `--border` border |
| Focus | `--border-focus` border (2px), subtle `--accent-subtle` background tint |
| Error | `--color-error` border, `--color-error-light` background, error message below in `--color-error` text |
| Success | `--color-success` border with check icon |
| Disabled | `opacity-0.5`, `cursor-not-allowed` |

**Label:**
- Every input **must** have a visible `<label>` above it.
- Font: `label` type style.
- Label and input are connected via `htmlFor` / `id`.

**Error Message:**
- Appears directly below the input.
- Font: `body-small` in `--color-error`.
- Prefix with `AlertTriangle` icon (16px).

---

### 10.5 Modal

Accessible dialog for confirmations, lightbox image viewing, and email capture gates.

**Specs:**
- Backdrop: `--bg-overlay` (semi-transparent charcoal)
- Container: `--bg-surface`, `--radius-xl`, `--shadow-lg`, max-width 560px, padding `p-8`
- Entrance: Fade in (backdrop 200ms) + scale up from 0.95 (content 300ms, ease-out)
- Exit: Fade out 150ms

**Accessibility Requirements:**
- Focus is trapped inside the modal while open.
- Pressing `Escape` closes the modal.
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` pointing to the title.
- On close, focus returns to the triggering element.
- Background content receives `aria-hidden="true"` and `inert` while modal is open.

---

### 10.6 Toast

Non-blocking notification for form submissions, copy actions, and error states.

**Specs:**
- Position: Bottom-right (desktop), bottom-center full-width (mobile)
- Background: `--bg-primary` (charcoal) with white text for all types
- Left accent bar: 4px width, colored per type (success green / error red / info blue / warning amber)
- Border radius: `--radius-lg`
- Shadow: `--shadow-md`
- Entrance: Slide up + fade in (300ms)
- Exit: Fade out (200ms) — auto-dismiss after 5 seconds
- Action button (optional): ghost style, right-aligned

**Types:** `success`, `error`, `info`, `warning`

---

### 10.7 Skeleton

Loading placeholder that replaces all server-fetched content during load.

**Specs:**
- Background: Shimmer animation (see Section 7.2)
- Shape: Matches the content it replaces (rectangle for text lines, rounded rectangle for images, circle for avatars)
- Border radius: Match the target component's radius
- Height: Match the target component's height
- No text, no icons — pure shape placeholder

**Rule:** Every component that fetches data must have a corresponding skeleton variant. A page should **never** show blank space or layout shift during loading.

---

### 10.8 ProgressBar

Used in the Brand Clarity Score quiz, Brand Report form, and Start onboarding flow to indicate step completion.

**Specs:**
- Track: Full-width, height 4px, background `--color-grey-100`, radius `--radius-full`
- Fill: Height 4px, background `--accent`, radius `--radius-full`
- Fill animates width change with `transition: width 300ms ease-out`
- Label: Optional — "Question 3 of 10" in `body-small` above or below the bar

---

### 10.9 Avatar

User or author profile image with initials fallback.

**Specs:**
- Shape: Circle (`--radius-full`)
- Sizes: `sm` (32px), `md` (40px), `lg` (56px)
- Image: `object-cover`, fills the circle
- Fallback: Background `--accent`, white initials in `label` style, centered
- Border: `2px solid --bg-surface` (creates a subtle lift when placed on backgrounds)

---

### 10.10 Tag

Clickable filter labels used on Portfolio and Blog index pages.

**Specs:**
- Font: `label` type style
- Padding: `px-4 py-2`
- Border radius: `--radius-full`
- Default state: Background `transparent`, border `1px solid --border`, text `--text-body`
- Active state: Background `--accent`, text white, border `--accent`
- Hover (inactive): Background `--color-grey-50`, border `--border`
- Transition: 150ms ease

---

### 10.11 Tooltip

Contextual information on hover/focus for icons and truncated labels.

**Specs:**
- Background: `--bg-primary` (charcoal)
- Text: White, `body-small` style
- Border radius: `--radius-md`
- Padding: `px-3 py-2`
- Shadow: `--shadow-md`
- Arrow: 6px CSS triangle pointing toward the trigger
- Entrance: Fade in 150ms with 200ms delay (prevent flash on accidental hover)
- Max width: 240px

**Accessibility:**
- Trigger has `aria-describedby` pointing to the tooltip ID.
- Tooltip is also accessible on keyboard focus (not just hover).
- Tooltip content must never contain interactive elements.

---

### 10.12 CTA Block

A reusable call-to-action section placed at the bottom of most pages. Two variants.

**Variant A — Dark (Default):**
- Background: `--bg-primary` (charcoal)
- Headline: `page-headline` style, `--text-primary` (ivory)
- Two buttons side by side: Primary ("Start a Project") + Secondary ("Book a Free Call")
- Full-section padding: `py-16 lg:py-24`

**Variant B — Accent:**
- Background: `--accent` (burnt orange)
- Headline: White, `page-headline` style
- Single white ghost button with white border
- Used for high-contrast sections like the Brand Report CTA

---

### 10.13 Navbar

The persistent global navigation.

**Desktop Specs:**
- Position: Fixed top, full-width, `z-50`
- Initial state: Transparent background (over hero sections)
- Scroll state (past 80px): `--bg-primary` background, `--shadow-sm`, backdrop-blur
- Height: 72px
- Logo: `PEAKSEEN` SVG wordmark, links to `/`. Display font, 20px, bold, `--text-primary`.
- Nav links: `label` style, `--text-primary`, 8px gaps. Hover: `--accent` color. Active: `--accent` with 2px bottom indicator.
- Right side: "Free Brand Report" text link (ghost, subtle) + "Start a Project →" primary button (`sm` size)
- Transition: Background and shadow animate over 200ms

**Mobile Specs (below `lg` breakpoint):**
- Height: 64px
- Logo left, hamburger icon right (44×44px touch target)
- On tap: Full-screen overlay, `--bg-primary`, links stack vertically
- Links animate in with 80ms stagger, `fadeInUp`
- Close button (X icon) top-right, 44×44px
- Social links row at bottom of overlay
- Body scroll locked while menu is open

---

### 10.14 Footer

**Desktop Layout:** 4-column grid inside `max-w-7xl` container.

| Column 1 — Brand | Column 2 — Studio | Column 3 — Resources | Column 4 — Contact |
|-------------------|-------------------|---------------------|-------------------|
| PeakSeen logo + tagline | About | Tools | hello@peakseen.com |
| 2-line studio description | Work | Products | Book a free call |
| Social icons row | Services | Free Brand Report | "Remote-first. Based in Nigeria." |
| | Blog | Brand Quiz | |

**Specs:**
- Background: `--bg-primary`
- Text: `--text-body-dark` (grey-300) for body, `--text-primary` for headings
- Column headings: `label` style, `--text-primary`, margin-bottom `--space-4`
- Links: `body-small` style, `--text-body-dark`. Hover: `--text-primary`.
- Social icons: 20×20px, `--text-body-dark`. Hover: `--text-primary`. Gap: 16px.
- Divider: 1px `--border-dark` above bottom bar
- Bottom bar: `body-small`, `--text-muted`. Contains copyright, legal links, "Built by PeakSeen"
- Section padding: `py-16 lg:py-20`

**Mobile:** Columns stack vertically. Each column heading is a collapsible accordion (tap to expand links). Social icons and bottom bar remain visible.

---

## 11. Responsive Breakpoints & Mobile UX

### 11.1 Breakpoints

Aligned with Tailwind CSS defaults:

| Token | Width | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large monitors |

**Design approach: Mobile-first.** Base styles target the smallest screen. Add complexity with `md:`, `lg:`, `xl:` prefixes.

### 11.2 Mobile-First Rules

| Rule | Detail |
|------|--------|
| **Touch targets** | Minimum 44×44px for all buttons, links, form controls, and interactive elements. Even if the visual element is smaller, pad the hit area. |
| **No drag-and-drop** | All tool interfaces must use tappable chips/pills, not drag interactions. |
| **Single-question screens** | The Brand Quiz and onboarding flow display one question per screen with large buttons — no scrolling long forms. |
| **No auto-playing video** | Hero sections default to static images or CSS gradients on mobile. Desktop may use subtle canvas/video. |
| **Bottom sticky CTA** | On key conversion pages (Home, Services, Tools), show a fixed bottom bar with "Start a Project" button on mobile. Appears after scrolling past the hero. |
| **Font sizes never below 16px** | Body text, input text. Prevents iOS auto-zoom on focus. |
| **Reduced payload** | Lazy-load all images below the fold. Dynamically import heavy components (quiz engine, chart libraries). |

---

## 12. Accessibility Standards

PeakSeen targets **WCAG 2.1 Level AA** compliance across all pages and components.

### Checklist (applied to every component)

| Requirement | Standard |
|-------------|----------|
| **Keyboard navigation** | All interactive elements reachable via Tab. Logical tab order follows visual order. |
| **Focus indicators** | 2px solid `--border-focus` ring, 2px offset. Visible on all focusable elements. Never suppressed. |
| **Color contrast** | Body text ≥ 4.5:1. Large text (≥18px bold / ≥24px) ≥ 3:1. See Section 2.3 for verified pairings. |
| **Alt text** | All `<img>` elements have descriptive `alt`. Decorative images use `alt=""`. |
| **Form labels** | Every input has a visible `<label>` connected via `htmlFor`/`id`. No placeholder-only inputs. |
| **Error messages** | Form errors are announced via `aria-live="polite"` and are adjacent to the input, not in a separate summary. |
| **Focus trapping** | Modals and mobile menu trap focus while open. Escape key closes. Focus returns to trigger on close. |
| **ARIA labels** | Icon-only buttons have `aria-label`. Decorative icons have `aria-hidden="true"`. |
| **Skip link** | First focusable element on every page: "Skip to main content" link. Visually hidden until focused. |
| **Heading hierarchy** | One `<h1>` per page. No skipped levels. Headings reflect content structure. |
| **Reduced motion** | All decorative animations disabled when `prefers-reduced-motion: reduce` is set. See Section 7.5. |
| **Semantic HTML** | Use `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>` — not generic `<div>` wrappers. |
| **Color independence** | No information conveyed through color alone. Error states use icon + text + color. Score bands use text labels. |

---

## 13. Dark & Light Surface Rules

PeakSeen pages alternate between dark and light sections within a single page. This creates the editorial rhythm central to the brand. Apply these rules consistently.

### When to Use Each Surface

| Surface | Background | Text Colors | Borders | Use |
|---------|-----------|-------------|---------|-----|
| **Dark** | `--bg-primary` (charcoal) | `--text-primary` (ivory) headlines, `--text-body-dark` (grey-300) body | `--border-dark` (grey-700) | Heroes, tool sections, CTA blocks, Navbar (scrolled), Footer |
| **Light** | `--bg-surface` (ivory) | `--text-primary-inverse` (charcoal) headlines, `--text-body` (grey-600) body | `--border` (grey-100) | Body content, forms, blog articles, product details |
| **Raised** | `--bg-surface-raised` (grey-50) | Same as Light | Same as Light | Cards on ivory backgrounds, sidebar blocks |

### Rules

1. **Adjacent sections should alternate.** Hero (dark) → Value Props (dark) → Services (light) → Featured Work (light or dark) → Tools (dark). The goal is visual rhythm, not rigid alternation.
2. **Cards adopt the surface context.** On dark sections, cards use `--bg-surface-dark`. On light sections, cards use `--bg-surface-raised`.
3. **Accent color works on both surfaces.** `--accent` (burnt orange) is readable on both charcoal and ivory — but only for large text, buttons, and badges (see Section 2.3 contrast rules).
4. **Shadows only on light surfaces.** On dark backgrounds, use borders or background-color changes instead of shadows for elevation.
5. **Transparent navbar** starts on dark hero → transitions to solid `--bg-primary` after 80px scroll. This means the navbar is **always dark** once scrolled, regardless of the section below.

---

## 14. File & Folder Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout: fonts, metadata, Navbar, Footer
│   ├── page.tsx                   # Home page
│   ├── about/
│   ├── services/
│   ├── work/
│   │   └── [slug]/
│   ├── products/
│   │   └── [slug]/
│   ├── tools/
│   │   ├── brand-clarity-score/
│   │   ├── brand-name-generator/
│   │   └── color-palette-generator/
│   ├── blog/
│   │   └── [slug]/
│   ├── brand-quiz/                # Redirects to /tools/brand-clarity-score
│   ├── brand-report/
│   ├── contact/
│   ├── start/
│   ├── legal/
│   │   ├── privacy/
│   │   └── terms/
│   └── api/                       # API routes
│       ├── quiz/
│       ├── tools/
│       └── webhooks/
│
├── components/
│   ├── ui/                        # Design system components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── progress-bar.tsx
│   │   ├── avatar.tsx
│   │   ├── tag.tsx
│   │   ├── tooltip.tsx
│   │   └── cta-block.tsx
│   │
│   ├── layout/                    # Structural components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── section.tsx            # Standard section wrapper (padding, container)
│   │   └── mobile-menu.tsx
│   │
│   └── features/                  # Page-specific or feature-specific
│       ├── quiz/
│       ├── name-generator/
│       ├── color-palette/
│       ├── blog/
│       └── products/
│
├── lib/
│   ├── fonts.ts                   # Font loader configuration
│   ├── utils.ts                   # cn() helper, formatters
│   ├── supabase.ts                # Supabase client initialization
│   └── constants.ts               # Site-wide constants (nav links, social links, etc.)
│
├── styles/
│   └── globals.css                # CSS variables, base resets, Tailwind directives
│
├── content/                       # MDX content files
│   ├── blog/
│   └── work/
│
├── public/
│   ├── fonts/                     # Self-hosted .woff2 files
│   ├── images/
│   └── og/                        # Static OG images (fallback)
│
└── types/
    └── index.ts                   # Shared TypeScript interfaces
```

---

## 15. Implementation Checklist

Use this as a task sequence when building the design system. Complete these **before** starting any page work.

### Phase 0 — Project Setup

- [ ] Initialize Next.js 14+ (App Router) with TypeScript and Tailwind CSS
- [ ] Install dependencies: `framer-motion`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- [ ] Add self-hosted font files (`.woff2`) to `public/fonts/`
- [ ] Configure `next/font` in `src/lib/fonts.ts`
- [ ] Apply font CSS variables in root layout

### Phase 1 — Tokens & Globals

- [ ] Define all CSS custom properties in `src/styles/globals.css` (colors, spacing, radii, shadows, animation tokens)
- [ ] Configure `tailwind.config.ts`: extend `colors`, `fontFamily`, `fontSize`, `borderRadius`, `boxShadow`, `spacing`
- [ ] Add `prefers-reduced-motion` global CSS reset
- [ ] Add skip-to-content link in root layout
- [ ] Add base typographic styles (heading resets, prose defaults)

### Phase 2 — Core Components

Build in this order (each subsequent component may depend on the previous):

1. [ ] `Button` — all 4 variants, 3 sizes, loading state, icon support
2. [ ] `Badge` — all 5 variants
3. [ ] `Input` — text, email, textarea, select, all states (focus, error, success, disabled)
4. [ ] `Card` — default, compact, featured variants with image slot
5. [ ] `Tag` — default and active states
6. [ ] `Avatar` — 3 sizes, image + initials fallback
7. [ ] `Skeleton` — rectangle, circle, text-line variants
8. [ ] `ProgressBar` — with animated fill and optional label
9. [ ] `Tooltip` — with delay, positioning, arrow
10. [ ] `Toast` — 4 types, auto-dismiss, action button slot
11. [ ] `Modal` — focus trap, escape key, backdrop, enter/exit animation
12. [ ] `CTA Block` — dark and accent variants

### Phase 3 — Layout Components

13. [ ] `Section` wrapper — standardized padding + container
14. [ ] `Navbar` — transparent → solid scroll behavior, mobile hamburger, overlay menu
15. [ ] `Footer` — 4-column grid, mobile accordion, bottom bar

### Phase 4 — Validation

- [ ] Verify all color contrast pairings against WCAG AA (use browser devtools or axe)
- [ ] Keyboard-test every interactive component (Tab, Enter, Escape, Arrow keys)
- [ ] Test all components at 320px viewport width (smallest supported)
- [ ] Run Lighthouse accessibility audit — target ≥ 90
- [ ] Confirm all animations are disabled with `prefers-reduced-motion: reduce`
- [ ] Confirm no layout shift on font load (check CLS in devtools)

---

*Design System prepared for PeakSeen — Brand & Product Studio*
*Version 1.0 · Ready for Implementation · 2025*
*This document is the single source of truth for all visual and component decisions. When in doubt, refer here — not to external design tools or ad hoc decisions.*