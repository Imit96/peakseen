import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

export function AboutBrief() {
  return (
    <Section id="about-brief" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <FadeInOnScroll direction="up">
          <h2 className="font-display text-4xl lg:text-6xl font-black tracking-[-0.02em] text-charcoal leading-[1.1]">
            We are a design-first creative studio.
          </h2>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2} direction="up">
          <p className="font-body text-xl lg:text-2xl text-grey-600 mt-8 leading-relaxed">
            PeakSeen exists to bridge the gap between strategic brand identity and flawless digital execution. We don&apos;t just build beautiful websites—we architect complete product experiences that drive business growth and force your competitors to pay attention.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.4} direction="up">
          <div className="mt-12">
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-ivory px-8')}
            >
              Our Story &rarr;
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
