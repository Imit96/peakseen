import type { Metadata } from 'next';
import { WorkHero } from '@/components/features/work/work-hero';
import { WorkGrid } from '@/components/features/work/work-grid';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Our Work — Brand Design Portfolio | PeakSeen',
  description:
    "Explore PeakSeen's portfolio of brand identity, web design, strategy, and software projects. See real results and measurable outcomes.",
};

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkGrid />
      <CTABlock
        variant="dark"
        headline="Want to be our next case study?"
        primaryCta={{ label: 'Start a Project \u2192', href: '/start' }}
        secondaryCta={{ label: 'View Services \u2192', href: '/services' }}
      />
    </>
  );
}
