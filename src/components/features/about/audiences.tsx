import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const audiences = [
  {
    title: 'Early-Stage Startups',
    description:
      'You have the idea. Maybe a prototype. But no brand yet.',
    tier: 'Brand Foundation',
    href: '/services',
  },
  {
    title: 'Small & Medium Businesses',
    description:
      'You have been running for a while. Your brand is inconsistent — or invisible.',
    tier: 'Brand Expression',
    href: '/services',
  },
  {
    title: 'Corporates & Large Brands',
    description:
      'You have the budget and the ambition. You need a studio that thinks at your level.',
    tier: 'Build',
    href: '/services',
  },
] as const;

export function Audiences() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-charcoal mb-12 lg:mb-16">
          Who We Work With
        </h2>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {audiences.map((audience, index) => (
          <FadeInOnScroll key={audience.title} delay={index * 0.1}>
            <Card className="flex flex-col justify-between p-6 lg:p-8 h-full">
              <div>
                <Badge variant="accent" className="mb-4">
                  {audience.tier}
                </Badge>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3">
                  {audience.title}
                </h3>
                <p className="text-grey-600 text-base leading-relaxed mb-6">
                  {audience.description}
                </p>
              </div>
              <Link
                href={audience.href}
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'sm' }),
                  'self-start'
                )}
              >
                Learn more
              </Link>
            </Card>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
