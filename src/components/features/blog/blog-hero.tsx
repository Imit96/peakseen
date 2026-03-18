import { Input } from '@/components/ui/input';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function BlogHero() {
  return (
    <section className="bg-charcoal py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-8xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
            The Peak Brief
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
            Brand strategy, design thinking, and growth insights for startups
            and businesses.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md">
            <Input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-grey-800 border-grey-600 text-ivory placeholder:text-grey-400"
              aria-label="Email address for newsletter"
              disabled
            />
            <span className="font-display text-sm font-bold text-grey-400 px-4 py-3 text-center whitespace-nowrap">
              Subscribe &rarr;
            </span>
          </div>
          <p className="text-sm text-grey-500 mt-2">
            Newsletter coming soon.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
