import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function WorkHero() {
  return (
    <Section dark className="py-24 lg:py-32">
      <FadeInOnScroll>
        <h1 className="font-display text-5xl lg:text-8xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
          Work that speaks for itself
        </h1>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
          Every project starts with purpose. Here is what purpose looks like
          when it is designed well.
        </p>
      </FadeInOnScroll>
    </Section>
  );
}
