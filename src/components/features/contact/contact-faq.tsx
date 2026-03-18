import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const FAQ_ITEMS = [
  {
    question: 'How quickly do you respond?',
    answer: 'Within 24 hours on business days. Usually faster.',
  },
  {
    question: 'Is the discovery call really free?',
    answer:
      "Yes. 30 minutes. No obligation. We use it to understand your needs and see if we're the right fit.",
  },
  {
    question: 'What happens after I send a brief?',
    answer:
      'We review it, ask follow-up questions if needed, and send you a tailored proposal with scope, timeline, and pricing within 3 business days.',
  },
] as const;

export function ContactFaq() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-3xl font-bold text-charcoal">
          Common questions
        </h2>
      </FadeInOnScroll>

      <div className="mt-8 space-y-8 max-w-3xl">
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
