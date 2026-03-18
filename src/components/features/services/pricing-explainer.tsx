import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const PRICING_MODELS = [
  {
    name: 'Project-Based',
    description:
      "Fixed scope, fixed price. You know exactly what you're paying before we start. Best for defined deliverables like brand identities and websites.",
  },
  {
    name: 'Retainer',
    description:
      'A set number of hours per month at a discounted rate. Best for growing businesses that need ongoing design and strategy support.',
  },
  {
    name: 'Equity + Fee',
    description:
      'A reduced project fee in exchange for a small equity stake. Best for early-stage startups where we believe in the vision.',
  },
  {
    name: 'Revenue Share',
    description:
      'We build it. You sell it. We take a percentage of revenue. Best for product launches where both sides share the risk and the reward.',
  },
] as const;

export function PricingExplainer() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-4xl font-bold text-charcoal tracking-[-0.015em]">
          How we price
        </h2>
        <p className="font-body text-lg text-grey-600 max-w-2xl mt-4">
          We believe in transparent pricing that aligns with your stage and goals.
          Here&apos;s how we structure engagements:
        </p>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {PRICING_MODELS.map((model) => (
          <FadeInOnScroll key={model.name}>
            <div className="bg-grey-50 rounded-lg p-6 border border-grey-100">
              <h3 className="font-display text-lg font-bold text-charcoal">
                {model.name}
              </h3>
              <p className="text-sm text-grey-500 mt-2">{model.description}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
