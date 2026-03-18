import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

interface ServiceItem {
  name: string;
  description: string;
}

interface ServiceTierProps {
  id: string;
  overline: string;
  title: string;
  description: string;
  services: ServiceItem[];
  pricing: { startingAt: string; timeline: string };
  popular?: boolean;
  className?: string;
}

export function ServiceTier({
  id,
  overline,
  title,
  description,
  services,
  pricing,
  popular = false,
  className,
}: ServiceTierProps) {
  return (
    <Section id={id} className={className}>
      <FadeInOnScroll>
        <p className="font-display text-xs font-bold tracking-[0.1em] text-accent uppercase">
          {overline}
        </p>
        <h2 className="font-display text-4xl font-bold text-charcoal tracking-[-0.015em] mt-3">
          {title}
        </h2>
        <p className="font-body text-lg text-grey-600 max-w-2xl mt-4">
          {description}
        </p>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {services.map((service) => (
          <FadeInOnScroll key={service.name}>
            <div className="bg-grey-50 rounded-lg p-6 border border-grey-100">
              <h3 className="font-display text-lg font-bold text-charcoal">
                {service.name}
              </h3>
              <p className="text-sm text-grey-500 mt-2">{service.description}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll>
        <div className={cn(
          'bg-grey-50 rounded-lg p-6 lg:p-8 border border-grey-100 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
          popular && 'border-accent'
        )}>
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-charcoal">
                Starting at {pricing.startingAt}
              </span>
              {popular && <Badge variant="accent">Most Popular</Badge>}
            </div>
            <p className="text-sm text-grey-500 mt-1">Timeline: {pricing.timeline}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center font-display font-bold text-sm tracking-[0.02em] rounded-md bg-accent text-white h-11 px-5 hover:bg-accent-hover transition-colors"
          >
            Get a Quote →
          </Link>
        </div>
      </FadeInOnScroll>
    </Section>
  );
}
