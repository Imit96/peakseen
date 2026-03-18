import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const TESTIMONIALS = [
  {
    quote:
      "PeakSeen didn't just design a logo — they gave us a complete brand system that made investors take us seriously for the first time.",
    name: 'Adaeze O.',
    role: 'Co-founder',
  },
  {
    quote:
      "More stories coming soon. We're just getting started.",
    name: 'PeakSeen Team',
    role: '',
  },
  {
    quote:
      "More stories coming soon. We're just getting started.",
    name: 'PeakSeen Team',
    role: '',
  },
] as const;

export function Testimonials() {
  return (
    <Section id="testimonials">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal tracking-[-0.015em]">
          What our clients say
        </h2>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {TESTIMONIALS.map((testimonial, index) => (
          <div
            key={index}
            className="bg-grey-50 rounded-lg p-6 lg:p-8"
          >
            <blockquote className="font-body text-lg italic text-charcoal">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="font-display text-sm text-grey-500 mt-4">
              {testimonial.name}
              {testimonial.role && `, ${testimonial.role}`}
            </p>
          </div>
        ))}
      </StaggerChildren>
    </Section>
  );
}
