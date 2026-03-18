import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { ReportHero } from '@/components/features/brand-report/report-hero';
import { ReportForm } from '@/components/features/brand-report/report-form';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Get a Free Brand Report — PeakSeen',
  description:
    'Fill in a 5-minute form and receive a personalised 6-page Brand Report scoring your brand across 5 areas — with specific action steps. Free. Delivered within 24 hours.',
};

export default function BrandReportPage() {
  return (
    <>
      <ReportHero />
      <Section>
        <ReportForm />
      </Section>
      <CTABlock
        headline="Want custom help?"
        primaryCta={{ label: 'Start a Project', href: '/start' }}
        secondaryCta={{ label: 'View Services', href: '/services' }}
      />
    </>
  );
}
