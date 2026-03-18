import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function NameGeneratorLanding() {
  return (
    <Section dark>
      <div className="mx-auto max-w-3xl text-center">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-8xl font-bold tracking-tight text-ivory mb-6">
            Brand Name Generator
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="text-lg lg:text-xl text-grey-400 max-w-2xl mx-auto">
            Enter your industry and keywords. Get 10 AI-powered brand name ideas
            in seconds.
          </p>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
