import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function BrandReportCta() {
  return (
    <section className="bg-accent py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeInOnScroll>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
            Not sure where your brand stands?
          </h2>
          <p className="text-lg text-white/90 mt-4 max-w-2xl mx-auto">
            Get a free, personalised Brand Report — a 6-page PDF that scores
            your brand across 5 areas and tells you exactly what to fix.
          </p>
          <div className="mt-8">
            <Link
              href="/brand-report"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-white text-accent hover:bg-white/90 hover:shadow-md'
              )}
            >
              Get My Free Brand Report &rarr;
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6">
            No spam. No sales call unless you want one. Delivered within 24
            hours.
          </p>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
