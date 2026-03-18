import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const FAQ_ITEMS = [
  {
    question: 'How long does a brand identity project take?',
    answer:
      'Most Brand Foundation projects take 2–4 weeks from kickoff to final delivery. Complex projects with naming and extensive research may take 4–6 weeks.',
  },
  {
    question: 'Can I start with just a logo?',
    answer:
      "Yes, but we'd encourage you to consider the full Brand Foundation package. A logo without a strategy behind it is a drawing — not a brand.",
  },
  {
    question: 'Do you work with international clients?',
    answer:
      "Absolutely. We're remote-first and have worked with clients across Nigeria, the UK, and the US. Time zones are never a problem.",
  },
  {
    question: "What's the minimum project budget?",
    answer:
      'Our smallest engagements start at around $500 for standalone deliverables. Full brand projects start at $1,500.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Yes. For projects over $2,000, we offer a 50/50 split — half upfront, half on delivery. Custom arrangements are available for larger builds.',
  },
  {
    question: "What if I'm not sure what I need?",
    answer:
      "That's what the discovery call is for. Book a free 20-minute call and we'll help you figure out the right starting point.",
  },
] as const;

export function ServicesFaq() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-4xl font-bold text-charcoal tracking-[-0.015em]">
          Common questions
        </h2>
      </FadeInOnScroll>

      <div className="mt-12 space-y-8 max-w-3xl">
        {FAQ_ITEMS.map((item) => (
          <FadeInOnScroll key={item.question}>
            <div>
              <h3 className="font-display text-lg font-bold text-charcoal">
                {item.question}
              </h3>
              <p className="text-grey-600 mt-2">{item.answer}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
