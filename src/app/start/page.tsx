import type { Metadata } from 'next';
import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { CTABlock } from '@/components/ui/cta-block';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Start a Project — PeakSeen',
  description:
    'Tell us about your project and we will get back to you within 24 hours with a tailored proposal.',
};

export default function StartPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInOnScroll>
            <h1 className="font-display text-5xl lg:text-8xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
              Start a Project
            </h1>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <p className="font-body text-lg lg:text-xl text-grey-300 max-w-2xl mt-6">
              Tell us about your project and we will get back to you within 24
              hours with a tailored proposal.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Placeholder content */}
      <Section>
        <div className="mx-auto max-w-xl text-center">
          <FadeInOnScroll>
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal tracking-tight">
              Our onboarding flow is coming soon.
            </h2>
            <p className="font-body text-lg text-grey-500 mt-4">
              In the meantime, reach out directly.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                Contact us &rarr;
              </Link>
              <Link
                href={`https://cal.com/${process.env.NEXT_PUBLIC_CAL_USERNAME ?? 'peakseen'}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
              >
                Book a 30-min call &rarr;
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </Section>

      <CTABlock
        headline="Not ready to start? Explore our free tools."
        primaryCta={{ label: 'Explore Tools', href: '/tools' }}
      />
    </>
  );
}
