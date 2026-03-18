import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const SERVICES = [
  {
    title: 'Brand Foundation',
    items: [
      'Logo & visual identity',
      'Brand voice & messaging',
      'Brand guidelines document',
    ],
    href: '/services#brand-foundation',
  },
  {
    title: 'Brand Expression',
    items: [
      'Website design & development',
      'Social media template kit',
      'Pitch deck design',
    ],
    href: '/services#brand-expression',
  },
  {
    title: 'Strategy & Growth',
    items: [
      'Content & SEO strategy',
      'Launch campaign planning',
      'Audience research',
    ],
    href: '/services#strategy-growth',
  },
  {
    title: 'Build',
    items: [
      'Web & mobile apps',
      'SaaS product development',
      'MVP builds',
    ],
    href: '/services#build',
  },
] as const;

export function ServicesOverview() {
  return (
    <Section id="services-overview">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal tracking-[-0.015em]">
          Everything your brand needs to succeed
        </h2>
        <p className="text-lg text-grey-500 mt-4 max-w-2xl">
          Four tiers. One studio. From first logo to full-stack software — we
          cover the entire journey.
        </p>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
        {SERVICES.map((service) => (
          <Card key={service.title} variant="compact">
            <h3 className="font-display text-xl font-bold text-charcoal">
              {service.title}
            </h3>
            <ul className="mt-4 space-y-2">
              {service.items.map((item) => (
                <li key={item} className="text-sm text-grey-500">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={service.href}
              className="inline-block mt-4 text-sm font-display font-bold text-accent hover:underline"
            >
              Learn more &rarr;
            </Link>
          </Card>
        ))}
      </StaggerChildren>

      <FadeInOnScroll className="mt-12 text-center">
        <Link
          href="/services"
          className="font-display font-bold text-accent hover:underline"
        >
          View all services &rarr;
        </Link>
      </FadeInOnScroll>
    </Section>
  );
}
