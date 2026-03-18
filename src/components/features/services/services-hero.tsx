import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function ServicesHero() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-ivory tracking-[-0.025em]">
            Everything your brand needs — under one studio
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="font-body text-lg text-grey-300 max-w-2xl mt-6">
            Four tiers of service. From your first logo to a full product launch.
            Pick where you are — we&apos;ll take you to your peak.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
