import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const beliefs = [
  "Every business deserves a brand that reflects its real value.",
  "Purpose-first design isn't a luxury — it's a strategy.",
  "Good branding isn't expensive. Bad branding is.",
  "Clarity beats cleverness. Every time.",
  "The best brands don't just exist. They're impossible to ignore.",
] as const;

export function Beliefs() {
  return (
    <Section className="bg-grey-50">
      <FadeInOnScroll>
        <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-charcoal mb-12 lg:mb-16 text-center">
          What We Believe
        </h2>
      </FadeInOnScroll>

      <div className="mx-auto max-w-3xl space-y-8 lg:space-y-10">
        {beliefs.map((belief, index) => (
          <FadeInOnScroll key={belief} delay={index * 0.1}>
            <p className="font-display text-xl lg:text-3xl font-bold tracking-tight text-charcoal text-center leading-snug">
              {belief}
            </p>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
