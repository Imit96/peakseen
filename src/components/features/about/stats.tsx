import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const stats = [
  { value: '5+', label: 'Projects Delivered' },
  { value: '3', label: 'Industries Served' },
  { value: '1', label: 'Mission' },
] as const;

export function Stats() {
  return (
    <Section className="bg-grey-50">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 text-center">
        {stats.map((stat, index) => (
          <FadeInOnScroll key={stat.label} delay={index * 0.1}>
            <div>
              <p className="font-display text-6xl lg:text-8xl font-bold tracking-tight text-charcoal mb-2">
                {stat.value}
              </p>
              <p className="font-display text-base lg:text-lg text-grey-500 tracking-wide">
                {stat.label}
              </p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
