import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { WordReveal } from '@/components/motion/word-reveal';

export function AboutBrief() {
  return (
    <Section className="border-b border-grey-100 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-4">
          <FadeInOnScroll>
            <h2 className="font-display text-sm tracking-widest uppercase text-grey-500 font-bold mb-4">
              Who We Are
            </h2>
            <div className="h-1 w-12 bg-accent rounded-full mb-8" />
          </FadeInOnScroll>
        </div>
        
        <div className="lg:col-span-8">
          <WordReveal
            text="We are a design-first creative studio built for tech-forward businesses."
            tag="h3"
            className="font-display text-3xl md:text-5xl font-black text-charcoal tracking-tight leading-[1.1]"
          />
          
          <FadeInOnScroll delay={0.2} direction="up" className="mt-8">
            <p className="font-body text-xl text-grey-500 max-w-2xl leading-relaxed">
              We don&apos;t just create beautiful interfaces—we identify core business problems and engineer brands that command authority. From your initial identity to a fully-scaled software product, we ensure every touchpoint is intentional.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4} direction="up" className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center font-display font-bold text-lg text-accent hover:text-charcoal transition-colors duration-200 group"
            >
              Discover our story
              <span className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </FadeInOnScroll>
        </div>
      </div>
    </Section>
  );
}
