import type { Metadata } from 'next';
import Link from 'next/link';
import { ServicesHero } from '@/components/features/services/services-hero';
import { ServiceTier } from '@/components/features/services/service-tier';
import { PricingExplainer } from '@/components/features/services/pricing-explainer';
import { ServicesFaq } from '@/components/features/services/services-faq';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Brand & Design Services — From Identity to Software',
  description:
    'Full-service brand identity, website design, growth strategy, and software development. Four tiers. One studio. See our services and pricing.',
};

const TIER_1_SERVICES = [
  { name: 'Purpose & Positioning Workshop', description: 'A guided session to define why your business exists, who it serves, and what makes it different. This becomes the foundation everything else is built on.' },
  { name: 'Brand Naming & Strategy', description: 'Need a name? We develop options rooted in your positioning — names that are memorable, domain-friendly, and built to last.' },
  { name: 'Logo & Visual Identity Design', description: 'More than a logo. A complete visual system — primary mark, icon, wordmark, and usage rules that make you recognisable everywhere.' },
  { name: 'Typography & Colour System', description: 'A defined set of typefaces and colours with clear rules for when and how to use each one. No more guessing.' },
  { name: 'Brand Voice & Messaging Guide', description: 'How your brand speaks. Tone rules, key messages, taglines, and examples your team can follow consistently.' },
  { name: 'Brand Guidelines Document', description: 'Everything above, delivered as a professional PDF document your team and partners can reference for years.' },
];

const TIER_2_SERVICES = [
  { name: 'Website Design & Development', description: 'A custom-designed, high-performance website built in Next.js. Fast, SEO-optimised, and designed to convert visitors into clients.' },
  { name: 'Social Media Aesthetic & Template Kit', description: 'A visual system for Instagram, LinkedIn, and Twitter — with 15–30 ready-to-use templates in Canva or Figma.' },
  { name: 'Email / Newsletter Template Design', description: 'Branded email templates that look professional in every inbox. Built as responsive HTML or designed for your platform.' },
  { name: 'Pitch Deck & Presentation Design', description: 'A 10–20 slide deck that tells your story with clarity and visual impact. Designed for investors, clients, or internal teams.' },
  { name: 'Business Card & Stationery Design', description: 'Print-ready business cards, letterheads, and branded documents that carry your identity offline.' },
  { name: 'Product Packaging Design', description: 'Label, box, and packaging design for physical products — from concept to print-ready files.' },
];

const TIER_3_SERVICES = [
  { name: 'Content Strategy & Planning', description: 'A documented plan for what to publish, where, and when — aligned to your business goals and audience behaviour.' },
  { name: 'Social Media Launch Strategy', description: 'A 90-day playbook for launching or relaunching your social presence. Includes content pillars, posting cadence, and engagement tactics.' },
  { name: 'SEO & Digital Presence Strategy', description: 'Keyword research, technical audit, and a roadmap to improve your search rankings and organic visibility.' },
  { name: 'Brand Launch Campaign Planning', description: 'A coordinated launch plan across channels — website, social, email, PR. Designed to make noise on day one.' },
  { name: 'Audience Research & Persona Development', description: 'Data-driven profiles of your ideal customers. Who they are, where they are, what they care about, and how to reach them.' },
  { name: 'Competitor Analysis & Market Positioning', description: "A clear picture of your competitive landscape — who's doing what, where the gaps are, and how to position yourself to win." },
];

const TIER_4_SERVICES = [
  { name: 'Custom Software & Web Application Development', description: 'Full-stack web applications built with modern frameworks. From dashboards to marketplaces — production-grade code, delivered.' },
  { name: 'Mobile App Development', description: 'Cross-platform mobile apps designed for iOS and Android. From concept to App Store.' },
  { name: 'SaaS Product Design & Development', description: 'End-to-end SaaS builds — product strategy, UX/UI design, development, and launch. For founders who want to ship fast and learn faster.' },
  { name: 'E-commerce Store Build', description: 'Custom e-commerce experiences on Shopify, WooCommerce, or headless platforms. Designed to sell.' },
  { name: 'Business-in-a-Box', description: 'Everything from idea to launch: brand identity, website, social presence, and launch strategy — bundled into one engagement.' },
  { name: 'MVP Development', description: 'A minimum viable product built in 4–8 weeks. Enough to validate your idea, attract users, and raise funding.' },
];

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a brand identity project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Brand Foundation projects take 2–4 weeks from kickoff to final delivery. Complex projects with naming and extensive research may take 4–6 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I start with just a logo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, but we'd encourage you to consider the full Brand Foundation package. A logo without a strategy behind it is a drawing — not a brand.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolutely. We're remote-first and have worked with clients across Nigeria, the UK, and the US. Time zones are never a problem.",
      },
    },
    {
      '@type': 'Question',
      name: "What's the minimum project budget?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our smallest engagements start at around $500 for standalone deliverables. Full brand projects start at $1,500.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer payment plans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For projects over $2,000, we offer a 50/50 split — half upfront, half on delivery. Custom arrangements are available for larger builds.',
      },
    },
    {
      '@type': 'Question',
      name: "What if I'm not sure what I need?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "That's what the discovery call is for. Book a free 20-minute call and we'll help you figure out the right starting point.",
      },
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      <ServicesHero />

      <ServiceTier
        id="brand-foundation"
        overline="TIER 1"
        title="Brand Foundation"
        description="For startups and new businesses that need a brand identity from scratch. You have the idea — we give it a face, a voice, and a strategy."
        services={TIER_1_SERVICES}
        pricing={{ startingAt: '$1,500', timeline: '2–4 weeks' }}
      />

      <ServiceTier
        id="brand-expression"
        overline="TIER 2"
        title="Brand Expression"
        description="For brands that have a foundation but need to show up — online, on social, in meetings, and in inboxes. This is where your brand becomes visible."
        services={TIER_2_SERVICES}
        pricing={{ startingAt: '$2,000', timeline: '3–6 weeks' }}
        popular
      />

      <ServiceTier
        id="strategy-growth"
        overline="TIER 3"
        title="Strategy & Growth"
        description="For brands ready to grow intentionally. You have the identity — now you need a plan to reach the right people and stay visible."
        services={TIER_3_SERVICES}
        pricing={{ startingAt: '$1,000', timeline: '2–4 weeks' }}
      />

      <ServiceTier
        id="build"
        overline="TIER 4"
        title="Build"
        description="For founders who need more than a brand — they need the thing itself. Websites, apps, SaaS platforms, and full product launches. We build it."
        services={TIER_4_SERVICES}
        pricing={{ startingAt: '$3,500', timeline: '4–12 weeks' }}
      />

      <PricingExplainer />
      <ServicesFaq />

      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeInOnScroll>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-ivory tracking-[-0.015em]">
              Not sure which tier you need?
            </h2>
            <p className="font-body text-lg text-grey-300 max-w-2xl mx-auto mt-6">
              Book a free 20-minute discovery call. We&apos;ll listen to your goals
              and recommend the right starting point — no pressure, no commitment.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                Book a Free Call →
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </>
  );
}
