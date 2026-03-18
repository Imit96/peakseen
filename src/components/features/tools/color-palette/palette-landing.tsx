import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function PaletteLanding() {
  return (
    <Section dark>
      <div className="mx-auto max-w-3xl text-center">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-8xl font-bold tracking-tight text-ivory mb-6">
            Brand Color Palette Generator
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="text-lg lg:text-xl text-grey-400 max-w-2xl mx-auto">
            Build a 5-colour brand palette with hex codes, contrast ratings, and
            font pairings. Free, no sign-up required.
          </p>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
