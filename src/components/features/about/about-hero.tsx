import { Section } from '@/components/layout/section';
import { WordReveal } from '@/components/motion/word-reveal';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function AboutHero() {
  return (
    <Section dark>
      <div className="py-8 lg:py-16">
        <WordReveal
          text="We help brands find their peak — and make the world see them"
          tag="h1"
          className="font-display text-4xl lg:text-7xl font-bold tracking-tight text-ivory mb-6 lg:mb-8 max-w-4xl"
        />
        <FadeInOnScroll delay={0.3}>
          <p className="text-lg lg:text-xl text-grey-400 max-w-2xl leading-relaxed">
            PeakSeen is a brand &amp; product studio built on one belief: every
            business has a peak — a version of itself that is clearer, bolder,
            and impossible to ignore. We help you get there.
          </p>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
