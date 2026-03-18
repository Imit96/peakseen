import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { CTABlock } from '@/components/ui/cta-block';
import { OnboardingForm } from '@/components/features/start/onboarding-form';

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
              Fill in your brief below and we&apos;ll come back to you within 24 hours
              with a tailored proposal.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      <Section>
        <OnboardingForm />
      </Section>

      <CTABlock
        headline="Not ready to commit? Explore our free tools."
        primaryCta={{ label: 'Explore Tools', href: '/tools' }}
        secondaryCta={{ label: 'Book a free call', href: '/contact' }}
      />
    </>
  );
}
