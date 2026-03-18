import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const PROJECTS = [
  {
    slug: 'fintech-brand-identity',
    title: 'Fintech Brand Identity',
    description:
      'A complete brand system for an early-stage fintech startup — from naming to investor deck.',
  },
  {
    slug: 'ecommerce-redesign',
    title: 'E-Commerce Redesign',
    description:
      'A conversion-focused redesign that increased checkout completions by 35%.',
  },
  {
    slug: 'saas-mvp-launch',
    title: 'SaaS MVP Launch',
    description:
      'From idea to live product in 8 weeks — strategy, design, and full-stack development.',
  },
] as const;

export function FeaturedWork() {
  return (
    <Section id="featured-work">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal tracking-[-0.015em]">
          Selected work
        </h2>
        <p className="text-lg text-grey-500 mt-4 max-w-2xl">
          Real results. Measurable impact. Every project starts with purpose.
        </p>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {PROJECTS.map((project) => (
          <Card key={project.slug}>
            <div className="bg-grey-200 aspect-[3/2] rounded-t-lg" />
            <div className="p-6">
              <Badge>Concept Work</Badge>
              <h3 className="font-display text-xl font-bold text-charcoal mt-3">
                {project.title}
              </h3>
              <p className="text-sm text-grey-500 mt-2">
                {project.description}
              </p>
              <Link
                href={`/work/${project.slug}`}
                className="inline-block mt-4 text-sm font-display font-bold text-accent hover:underline"
              >
                View case study &rarr;
              </Link>
            </div>
          </Card>
        ))}
      </StaggerChildren>

      <FadeInOnScroll className="mt-12 text-center">
        <Link
          href="/work"
          className="font-display font-bold text-accent hover:underline"
        >
          See all work &rarr;
        </Link>
      </FadeInOnScroll>
    </Section>
  );
}
