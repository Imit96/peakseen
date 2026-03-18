import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { CalBookingEmbed } from '@/components/features/contact/cal-booking-embed';

export function ContactDetails() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FadeInOnScroll>
          <h2 className="font-display text-3xl font-bold text-charcoal">
            Prefer to talk?
          </h2>
          <p className="font-body text-lg text-grey-600 mt-4 max-w-lg">
            Book a free 30-minute Brand Discovery Call. We&apos;ll listen to your
            goals, ask the right questions, and recommend a starting point — no
            pressure.
          </p>
          <div className="space-y-4 mt-8">
            <a
              href="mailto:hello@peakseen.com"
              className="font-display text-lg font-bold text-charcoal hover:text-accent transition-colors block"
            >
              hello@peakseen.com
            </a>
            <p className="text-sm text-grey-500">
              Instagram · LinkedIn · X
            </p>
            <p className="text-sm text-grey-400">
              Remote-first. Based in Nigeria.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <CalBookingEmbed />
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
