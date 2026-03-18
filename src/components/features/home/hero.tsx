import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { WordReveal } from '@/components/motion/word-reveal';

export function Hero() {
  return (
    <section className="bg-charcoal min-h-[95vh] flex flex-col justify-center items-center py-24 lg:py-32 relative overflow-hidden text-center">
      
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/home/hero-bg.jpg"
          alt="PeakSeen Studio Environment"
          fill
          priority
          className="object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/60 to-charcoal"></div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 w-full z-10 flex flex-col items-center">
        
        <WordReveal
          text="Reach Your Peak. Be Seen."
          tag="h1"
          className="font-display text-6xl md:text-8xl lg:text-[8rem] font-black tracking-[-0.04em] text-ivory leading-[0.95] max-w-4xl"
        />

        <FadeInOnScroll delay={0.2} direction="up">
          <p className="font-body text-lg md:text-2xl text-grey-400 max-w-2xl mt-8">
            Brand strategy, design, and development for startups that refuse to blend in. No fluff. Just impact.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.4} direction="up">
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center w-full">
            <Link
              href="/start"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto px-8')}
            >
              Start a Project &rarr;
            </Link>
            <Link
              href="/brand-report"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'text-ivory border-grey-700 hover:bg-grey-800 w-full sm:w-auto px-8'
              )}
            >
              Get a Free Brand Report
            </Link>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.6} direction="up">
          <div className="mt-20 pt-10 border-t border-grey-800 w-full max-w-lg">
            <p className="font-display text-sm tracking-widest uppercase text-grey-500 font-bold">
              Trusted by tech-forward businesses
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
