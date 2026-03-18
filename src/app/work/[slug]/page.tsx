export const revalidate = 3600;

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { Badge } from '@/components/ui/badge';
import { CTABlock } from '@/components/ui/cta-block';
import { getCaseStudy, getCaseStudies } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/mdx-content';

interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  badges: string[];
  overview: string;
  challenge: string;
  approach: string;
  work: string;
  outcome: string;
  services: string[];
  image: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  'fintech-brand-identity': {
    slug: 'fintech-brand-identity',
    name: 'Fintech Brand Identity',
    tagline: 'Building trust through design in a crowded financial market',
    badges: ['Branding', 'Strategy'],
    overview:
      'A fast-growing fintech startup needed a brand identity that would communicate trust, innovation, and accessibility. They had a strong product but no visual language to match.',
    challenge:
      'The financial technology space is saturated with brands that either look too corporate or too casual. The client needed to stand out while still feeling trustworthy enough for users to hand over their financial data.',
    approach:
      'We started with a deep positioning workshop to define the brand personality: modern, confident, and approachable. From there, we developed a visual identity system rooted in clean geometry and a colour palette that balances authority with warmth.',
    work:
      'The deliverables included a primary logo and icon system, a comprehensive colour palette with light and dark mode variants, a typography system built around two complementary typefaces, brand guidelines covering tone of voice and visual usage, and a suite of social media templates.',
    outcome:
      'The rebrand launched alongside a product update, resulting in a 40% increase in user trust scores in post-launch surveys. Sign-up conversion rates improved by 22% within the first quarter.',
    services: [
      'Purpose & Positioning Workshop',
      'Logo & Visual Identity Design',
      'Typography & Colour System',
      'Brand Voice & Messaging Guide',
      'Brand Guidelines Document',
    ],
    image: '/images/work/fintech-brand-identity.png',
  },
  'ecommerce-brand-identity': {
    slug: 'ecommerce-brand-identity',
    name: 'E-commerce Brand Identity',
    tagline: 'A premium brand experience that doubled mobile conversions',
    badges: ['Branding', 'Web Design'],
    overview:
      'An established retail brand was losing online sales to competitors with better digital experiences. They needed a complete brand overhaul and platform redesign that would feel premium without sacrificing performance.',
    challenge:
      'The existing site was slow, cluttered, and had a checkout flow that lost 68% of users before completion. The brand identity felt dated and inconsistent across touchpoints, undermining the quality of their products.',
    approach:
      'We started with brand strategy to define the premium positioning, then redesigned the visual identity and e-commerce experience in parallel. The new design prioritised mobile-first browsing, simplified navigation, and a streamlined checkout.',
    work:
      'Deliverables included a refreshed brand identity with new logo, colour system, and typography, a fully redesigned e-commerce experience with intelligent product filtering, persistent cart, and a visual size guide that reduced returns by 15%.',
    outcome:
      'The new platform launched with a 3x improvement in page load speed. Mobile conversion rates doubled in the first month, and average order value increased by 18% thanks to improved product discovery and brand trust.',
    services: [
      'Purpose & Positioning Workshop',
      'Logo & Visual Identity Design',
      'Website Design & Development',
      'Content Strategy & Planning',
    ],
    image: '/images/work/ecommerce-brand-identity.png',
  },
  'saas-product-brand': {
    slug: 'saas-product-brand',
    name: 'SaaS Product Brand',
    tagline: 'A unified brand and design system for a growing SaaS platform',
    badges: ['Branding', 'Product Design'],
    overview:
      'A B2B SaaS startup had outgrown its initial branding. With a growing team and expanding product suite, they needed a cohesive brand identity and design system that could scale.',
    challenge:
      'The product UI was inconsistent — every new feature looked different. The marketing site did not match the product. The team was shipping fast but the brand felt fragmented and unprofessional.',
    approach:
      'We audited every touchpoint, identified the core brand attributes, and built a unified design system from the ground up. Brand and product design happened in parallel so neither felt bolted on.',
    work:
      'Deliverables included a complete brand identity refresh, a Figma design system with 200+ components, brand guidelines covering voice, tone, and visual usage, and updated marketing materials aligned with the new product experience.',
    outcome:
      'Design velocity increased by 40% after the system launched. The consistent brand experience helped close enterprise deals, and the team reported significantly less design debt in quarterly reviews.',
    services: [
      'Purpose & Positioning Workshop',
      'Logo & Visual Identity Design',
      'Brand Voice & Messaging Guide',
      'Brand Guidelines Document',
    ],
    image: '/images/work/saas-product-brand.png',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const hardcoded = Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
  const mdxStudies = getCaseStudies().map((s) => ({ slug: s.slug }));
  const slugs = new Set([...hardcoded.map((h) => h.slug), ...mdxStudies.map((m) => m.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check MDX first
  const mdx = getCaseStudy(slug);
  if (mdx) {
    return {
      title: `${mdx.frontmatter.title} — Case Study | PeakSeen`,
      description: mdx.frontmatter.outcome,
    };
  }

  const study = CASE_STUDIES[slug];
  if (!study) {
    return { title: 'Project Not Found | PeakSeen' };
  }

  return {
    title: `${study.name} — Case Study | PeakSeen`,
    description: study.overview,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;

  // Try MDX first
  const mdx = getCaseStudy(slug);
  if (mdx) {
    return (
      <>
        <Section dark className="py-24 lg:py-32">
          <FadeInOnScroll>
            <Link
              href="/work"
              className="font-body text-sm text-grey-400 hover:text-grey-300 transition-colors"
            >
              &larr; All Projects
            </Link>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="flex flex-wrap gap-2 mt-8">
              {mdx.frontmatter.services.map((service) => (
                <Badge key={service} variant="accent">{service}</Badge>
              ))}
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.0] mt-4">
              {mdx.frontmatter.title}
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
              {mdx.frontmatter.outcome}
            </p>
          </FadeInOnScroll>
        </Section>

        <Section>
          <FadeInOnScroll>
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-charcoal">
              <Image 
                src={mdx.frontmatter.coverImage || `/images/work/${slug}.png`} 
                alt={mdx.frontmatter.title} 
                fill 
                className="object-cover" 
              />
            </div>
          </FadeInOnScroll>
        </Section>

        <Section>
          <FadeInOnScroll>
            <MDXContent source={mdx.content} />
          </FadeInOnScroll>
        </Section>

        <Section>
          <FadeInOnScroll>
            <div className="flex justify-between items-center">
              <Link href="/work" className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}>
                &larr; All Projects
              </Link>
              <Link href="/start" className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>
                Start a Project &rarr;
              </Link>
            </div>
          </FadeInOnScroll>
        </Section>

        <CTABlock
          variant="dark"
          headline="Want to be our next case study?"
          primaryCta={{ label: 'Start a Project \u2192', href: '/start' }}
          secondaryCta={{ label: 'View Services \u2192', href: '/services' }}
        />
      </>
    );
  }

  // Fall back to hardcoded data
  const study = CASE_STUDIES[slug];

  if (!study) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <Section dark className="py-24 lg:py-32">
        <FadeInOnScroll>
          <Link
            href="/work"
            className="font-body text-sm text-grey-400 hover:text-grey-300 transition-colors"
          >
            &larr; All Projects
          </Link>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="flex flex-wrap gap-2 mt-8">
            {study.badges.map((badge) => (
              <Badge key={badge} variant="accent">
                {badge}
              </Badge>
            ))}
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.0] mt-4">
            {study.name}
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.3}>
          <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
            {study.tagline}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* Project Image Placeholder */}
      <Section>
        <FadeInOnScroll>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-charcoal">
            <Image 
              src={study.image} 
              alt={study.name} 
              fill 
              className="object-cover" 
            />
          </div>
        </FadeInOnScroll>
      </Section>

      {/* Overview */}
      <Section>
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Overview
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {study.overview}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* The Challenge */}
      <Section className="bg-grey-50">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            The Challenge
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {study.challenge}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* The Approach */}
      <Section>
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            The Approach
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {study.approach}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* The Work */}
      <Section className="bg-grey-50">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            The Work
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {study.work}
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="aspect-video bg-grey-100 rounded-lg" />
            <div className="aspect-video bg-grey-100 rounded-lg" />
          </div>
        </FadeInOnScroll>
      </Section>

      {/* The Outcome */}
      <Section>
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            The Outcome
          </h2>
          <p className="font-body text-grey-600 text-lg mt-4 max-w-3xl">
            {study.outcome}
          </p>
        </FadeInOnScroll>
      </Section>

      {/* Services Used */}
      <Section className="bg-grey-50">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            Services Used
          </h2>
          <ul className="mt-6 space-y-3">
            {study.services.map((service) => (
              <li
                key={service}
                className="font-body text-grey-600 flex items-center gap-3"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                {service}
              </li>
            ))}
          </ul>
        </FadeInOnScroll>
      </Section>

      {/* Navigation */}
      <Section>
        <FadeInOnScroll>
          <div className="flex justify-between items-center">
            <Link
              href="/work"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'md' })
              )}
            >
              &larr; All Projects
            </Link>
            <Link
              href="/start"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'md' })
              )}
            >
              Start a Project &rarr;
            </Link>
          </div>
        </FadeInOnScroll>
      </Section>

      <CTABlock
        variant="dark"
        headline="Want to be our next case study?"
        primaryCta={{ label: 'Start a Project \u2192', href: '/start' }}
        secondaryCta={{ label: 'View Services \u2192', href: '/services' }}
      />
    </>
  );
}
