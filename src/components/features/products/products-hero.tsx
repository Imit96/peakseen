import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function ProductsHero() {
  return (
    <Section dark className="py-24 lg:py-32">
      <FadeInOnScroll>
        <h1 className="font-display text-5xl lg:text-8xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
          Ready-made brand tools
        </h1>
      </FadeInOnScroll>

      <FadeInOnScroll delay={0.2}>
        <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
          Buy once. Download instantly. No designer needed.
        </p>
      </FadeInOnScroll>
    </Section>
  );
}
