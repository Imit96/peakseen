import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { WordReveal } from '@/components/motion/word-reveal';

export function Hero() {
  return (
    <section className="bg-charcoal min-h-[90vh] flex items-center py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <WordReveal
          text="Reach Your Peak. Be Seen."
          tag="h1"
          className="font-display text-5xl lg:text-8xl font-black tracking-[-0.03em] text-ivory leading-[1.0]"
        />

        <FadeInOnScroll delay={0.3}>
          <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
            PeakSeen is a brand &amp; product studio that helps startups and
            businesses define their purpose — and makes the world see it.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/start"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              Start a Project &rarr;
            </Link>
            <Link
              href="/brand-report"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'text-ivory border-grey-700 hover:bg-grey-800'
              )}
            >
              Get a Free Brand Report
            </Link>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.7}>
          <p className="text-sm text-grey-400 mt-12">
            Trusted by startups, SMEs, and growing brands
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
