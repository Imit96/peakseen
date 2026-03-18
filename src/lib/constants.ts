export const SITE = {
  name: 'PeakSeen',
  tagline: 'Brand & Product Studio',
  url: 'https://peakseen.com',
  email: 'hello@peakseen.com',
  description:
    'We build brands that people remember and products that people use. Strategy, design, and development — done right.',
} as const;

export const MOTION = {
  duration: { fast: 0.15, normal: 0.3, slow: 0.5 },
  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
  },
  stagger: 0.1,
} as const;

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Products', href: '/products' },
  { label: 'Tools', href: '/tools' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const LEMON_SQUEEZY = {
  products: {
    'brand-identity-starter-kit': {
      variantId: 'REPLACE_WITH_VARIANT_ID',
      checkoutUrl: 'https://peakseen.lemonsqueezy.com/buy/brand-identity-starter-kit',
    },
    'social-media-content-pack': {
      variantId: 'REPLACE_WITH_VARIANT_ID',
      checkoutUrl: 'https://peakseen.lemonsqueezy.com/buy/social-media-content-pack',
    },
    'brand-clarity-workbook': {
      variantId: 'REPLACE_WITH_VARIANT_ID',
      checkoutUrl: 'https://peakseen.lemonsqueezy.com/buy/brand-clarity-workbook',
    },
    'complete-brand-starter-bundle': {
      variantId: 'REPLACE_WITH_VARIANT_ID',
      checkoutUrl: 'https://peakseen.lemonsqueezy.com/buy/complete-brand-starter-bundle',
    },
  },
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/peakseen',
  linkedin: 'https://linkedin.com/company/peakseen',
  twitter: 'https://x.com/peakseen',
  behance: 'https://behance.net/peakseen',
} as const;
