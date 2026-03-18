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

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16">
        {SERVICES.map((service, index) => (
          <Card key={service.title} variant="default" className="p-8 lg:p-12 border-0 bg-white ring-1 ring-grey-100 group">
            <div className="flex flex-col h-full justify-between gap-12">
              <div>
                <span className="font-display font-black text-6xl text-grey-100 block mb-6 transition-colors duration-300 group-hover:text-accent/20">
                  0{index + 1}
                </span>
                <h3 className="font-display text-2xl lg:text-3xl font-black text-charcoal tracking-tight">
                  {service.title}
                </h3>
                <ul className="mt-6 space-y-3">
                  {service.items.map((item) => (
                    <li key={item} className="text-base text-grey-500 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={service.href}
                className="inline-flex items-center text-sm font-display font-bold text-accent group-hover:underline"
              >
                Explore this service <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
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
