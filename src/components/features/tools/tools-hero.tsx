import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function ToolsHero() {
  return (
    <Section dark>
      <div className="mx-auto max-w-3xl text-center">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-8xl font-bold tracking-tight text-ivory mb-6">
            Free brand tools. Real results.
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="text-lg lg:text-xl text-grey-400 max-w-2xl mx-auto">
            Built by PeakSeen to help you understand and grow your brand — at no cost.
          </p>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
