export const revalidate = 3600;

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { Badge } from '@/components/ui/badge';
import { CTABlock } from '@/components/ui/cta-block';
import { LEMON_SQUEEZY } from '@/lib/constants';

type ProductSlug = keyof typeof LEMON_SQUEEZY.products;

interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  badges: Array<{ label: string; variant: 'default' | 'accent' }>;
  includes: string[];
  whoItsFor: string[];
  faq: Array<{ question: string; answer: string }>;
}

const PRODUCTS: Record<string, Product> = {
  'brand-identity-starter-kit': {
    slug: 'brand-identity-starter-kit',
    name: 'Brand Identity Starter Kit',
    tagline: 'Everything you need to launch a basic brand identity — in one Figma file.',
    price: '$29',
    description:
      'A complete brand identity starter template in Figma. Includes logo placement guides, colour palette setup, typography pairings, and basic brand guidelines. Designed for founders who want to look professional from day one without hiring a designer.',
    badges: [{ label: 'Design Templates', variant: 'default' }],
    includes: [
      'Figma file with editable brand identity template',
      'Logo placement and sizing guidelines',
      'Colour palette with primary, secondary, and neutral tones',
      'Typography pairing recommendations',
      'Basic brand guidelines template',
      'Social media profile image templates',
    ],
    whoItsFor: [
      'Early-stage founders who need a brand identity fast',
      'Solo entrepreneurs launching a side project',
      'Anyone who wants to look professional without a designer',
    ],
    faq: [
      {
        question: 'Do I need Figma to use this?',
        answer:
          'Yes, the kit is built in Figma. You can use the free version of Figma to open and edit the file.',
      },
      {
        question: 'Can I use this for multiple projects?',
        answer:
          'The license covers one brand or business. For additional projects, purchase an additional kit.',
      },
      {
        question: 'Is this a custom brand identity?',
        answer:
          'No, this is a template you customise yourself. For a fully custom brand identity, check out our services.',
      },
    ],
  },
  'social-media-content-pack': {
    slug: 'social-media-content-pack',
    name: 'Social Media Content Pack',
    tagline: '30 days of social media templates. Just add your words.',
    price: '$19',
    description:
      'A collection of 30 ready-to-use social media post templates designed for Instagram, LinkedIn, and Twitter. Each template is fully editable in Figma or Canva. Just swap in your brand colours, add your copy, and post.',
    badges: [{ label: 'Design Templates', variant: 'default' }],
    includes: [
      '30 unique post templates (square and story formats)',
      'Templates for quotes, tips, announcements, and promotions',
      'Figma and Canva versions included',
      'Easy colour and font customisation',
      'Posting schedule suggestion guide',
      'Content pillar planning template',
    ],
    whoItsFor: [
      'Founders who struggle with consistent social media content',
      'Small businesses without a dedicated social media team',
      'Anyone who wants professional-looking posts without design skills',
    ],
    faq: [
      {
        question: 'Which platforms are these designed for?',
        answer:
          'The templates work for Instagram (feed and stories), LinkedIn, and Twitter/X. Sizes are optimised for each platform.',
      },
      {
        question: 'Can I edit these in Canva?',
        answer:
          'Yes, both Figma and Canva versions are included so you can use whichever tool you prefer.',
      },
      {
        question: 'Are these reusable?',
        answer:
          'Absolutely. The templates are designed to be reused month after month. Just update the copy and images.',
      },
    ],
  },
  'brand-clarity-workbook': {
    slug: 'brand-clarity-workbook',
    name: 'Brand Clarity Workbook',
    tagline: 'The questions every founder should answer before designing anything.',
    price: '$19',
    description:
      'A guided workbook that helps you define your brand purpose, positioning, audience, and voice before you spend a penny on design. Work through the exercises at your own pace and come out with a clear brand strategy document.',
    badges: [{ label: 'Strategy Toolkits', variant: 'default' }],
    includes: [
      'Interactive PDF workbook (40+ pages)',
      'Brand purpose and mission exercises',
      'Target audience definition framework',
      'Competitor analysis template',
      'Brand voice and tone guidelines exercise',
      'Positioning statement builder',
      'Action plan template for next steps',
    ],
    whoItsFor: [
      'Pre-launch founders still defining their brand',
      'Existing businesses going through a rebrand',
      'Anyone who wants strategic clarity before investing in design',
    ],
    faq: [
      {
        question: 'Is this a physical book?',
        answer:
          'No, this is a digital PDF workbook that you can fill in on your computer or print and complete by hand.',
      },
      {
        question: 'How long does it take to complete?',
        answer:
          'Most people complete it in 2-3 hours, but you can work through it at your own pace over several sessions.',
      },
      {
        question: 'Will this replace hiring a brand strategist?',
        answer:
          'It covers the same foundational questions a strategist would ask. For deeper, guided strategy work, check out our Tier 1 services.',
      },
    ],
  },
  'complete-brand-starter-bundle': {
    slug: 'complete-brand-starter-bundle',
    name: 'Complete Brand Starter Bundle',
    tagline: 'All three products. One price. Everything you need to start.',
    price: '$59',
    description:
      'Get the Brand Identity Starter Kit, Social Media Content Pack, and Brand Clarity Workbook together at a 25% discount. This bundle gives you everything you need to define your brand strategy, build your visual identity, and start showing up on social media — all without hiring a designer.',
    badges: [
      { label: 'Bundles', variant: 'default' },
      { label: 'Save 25%', variant: 'accent' },
    ],
    includes: [
      'Brand Identity Starter Kit (Figma file)',
      'Social Media Content Pack (30 templates)',
      'Brand Clarity Workbook (40+ page PDF)',
      'Bonus: Quick-start guide for using all three together',
      'Bonus: Brand launch checklist',
    ],
    whoItsFor: [
      'Founders who want the complete package',
      'Anyone launching a new brand from scratch',
      'Small businesses ready to get serious about their brand',
    ],
    faq: [
      {
        question: 'How much do I save with the bundle?',
        answer:
          'The three products purchased separately cost $67. The bundle is $59 — a 25% saving.',
      },
      {
        question: 'Can I buy individual products instead?',
        answer:
          'Yes, all three products are available individually if you only need one or two.',
      },
      {
        question: 'Do I get updates if the products are improved?',
        answer:
          'Yes, all future updates to the included products are free for bundle purchasers.',
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'brand-identity-starter-kit' },
    { slug: 'social-media-content-pack' },
    { slug: 'brand-clarity-workbook' },
    { slug: 'complete-brand-starter-bundle' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    return {
      title: 'Product Not Found | PeakSeen',
    };
  }

  return {
    title: `${product.name} — ${product.price} | PeakSeen Shop`,
    description: product.tagline,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  if (!product) {
    notFound();
  }

  const checkoutUrl = slug in LEMON_SQUEEZY.products
    ? LEMON_SQUEEZY.products[slug as ProductSlug].checkoutUrl
    : '#';

  const priceNumber = product.price.replace('$', '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: priceNumber,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="lazyOnload"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <Section dark className="py-24 lg:py-32">
        <FadeInOnScroll>
          <Link
            href="/products"
            className="font-body text-sm text-grey-400 hover:text-grey-300 transition-colors"
          >
            &larr; All Products
          </Link>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="flex flex-wrap gap-2 mt-8">
            {product.badges.map((badge) => (
              <Badge key={badge.label} variant={badge.variant}>
                {badge.label}
              </Badge>
            ))}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.0] mt-4">
            {product.name}
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
            {product.tagline}
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.4}>
          <div className="flex items-center gap-6 mt-8">
            <span className="font-display text-4xl font-bold text-ivory">
              {product.price}
            </span>
            <a
              href={checkoutUrl}
              className={cn(
                'lemonsqueezy-button',
                buttonVariants({ variant: 'primary', size: 'lg' })
              )}
              data-overlay="true"
            >
              Buy Now &rarr;
            </a>
          </div>
        </FadeInOnScroll>
      </Section>

      {/* Product Image Placeholder */}
      <Section>
        <FadeInOnScroll>
          <div className="aspect-video bg-grey-100 rounded-xl" />
        </FadeInOnScroll>
      </Section>

      {/* Description */}
      <Section>
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            About this product
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {product.description}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* What is Included */}
      <Section className="bg-grey-50">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            What is included
          </h2>
          <ul className="mt-6 space-y-3">
            {product.includes.map((item) => (
              <li
                key={item}
                className="font-body text-grey-600 flex items-start gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </Section>

      {/* Who It is For */}
      <Section>
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Who this is for
          </h2>
          <ul className="mt-6 space-y-3">
            {product.whoItsFor.map((item) => (
              <li
                key={item}
                className="font-body text-grey-600 flex items-start gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                {item}
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </Section>

      {/* FAQ */}
      <Section className="bg-grey-50">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Frequently asked questions
          </h2>
        </FadeInOnScroll>

        <div className="mt-8 space-y-8">
          {product.faq.map((item, index) => (
            <FadeInOnScroll key={item.question} delay={index * 0.1}>
              <div>
                <h3 className="font-display text-lg font-bold text-charcoal">
                  {item.question}
                </h3>
                <p className="font-body text-grey-600 mt-2">{item.answer}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Section>

      {/* Buy CTA */}
      <Section>
        <FadeInOnScroll>
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-charcoal">
              {product.price}
            </p>
            <p className="font-body text-grey-600 mt-2">
              One-time purchase. Instant download. No subscription.
            </p>
            <a
              href={checkoutUrl}
              className={cn(
                'lemonsqueezy-button',
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'mt-6'
              )}
              data-overlay="true"
            >
              Buy Now &rarr;
            </a>
          </div>
        </FadeInOnScroll>
      </Section>

      <CTABlock
        variant="dark"
        headline="Need something custom?"
        primaryCta={{ label: 'Start a Project \u2192', href: '/start' }}
        secondaryCta={{ label: 'View Services \u2192', href: '/services' }}
      />
    </>
  );
}
