import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { CTABlock } from '@/components/ui/cta-block';
import { AuditForm } from '@/components/features/tools/website-audit/audit-form';

export const metadata: Metadata = {
  title: 'Free Website Audit Checker — PeakSeen',
  description:
    'Scan your website instantly and get an AI-powered score based on brand clarity, SEO, accessibility, and trust signals.',
};

export default function WebsiteAuditPage() {
  return (
    <>
      <section className="bg-charcoal pt-32 pb-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <FadeInOnScroll>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm font-medium text-ivory tracking-wide">
                  AI TOOL
                </span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.05]">
                Free Website <span className="text-accent italic pr-2">Audit</span> Checker
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <p className="font-body text-lg lg:text-xl text-grey-300 mt-6 max-w-2xl leading-relaxed">
                Scan your website instantly. We evaluate brand clarity, visual design, basic SEO, trust signals, and conversion optimization to give you an actionable score.
              </p>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      <Section className="bg-ivory -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto w-full">
          <AuditForm />
        </div>
      </Section>

      <CTABlock
        headline="Ready for a custom strategy?"
        primaryCta={{ label: 'Start a Project', href: '/start' }}
        secondaryCta={{ label: 'Back to Tools', href: '/tools' }}
      />
    </>
  );
}
