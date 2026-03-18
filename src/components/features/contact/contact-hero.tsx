import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function ContactHero() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-ivory tracking-[-0.025em]">
            Let&apos;s build something great
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="font-body text-lg text-grey-300 max-w-2xl mt-6">
            Tell us what you&apos;re building. We&apos;ll tell you how we can help.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
