import type { Metadata } from 'next';
import { ToolsHero } from '@/components/features/tools/tools-hero';
import { ToolsGrid } from '@/components/features/tools/tools-grid';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Free Brand Tools — PeakSeen',
  description:
    'Check your brand score, generate names, build palettes. Free interactive tools. No sign-up required.',
};

export default function ToolsPage() {
  return (
    <>
      <ToolsHero />
      <ToolsGrid />
      <CTABlock
        variant="dark"
        headline="Need more than a free tool?"
        primaryCta={{ label: 'Start a project', href: '/start' }}
        secondaryCta={{ label: 'Get your Brand Report', href: '/brand-report' }}
      />
    </>
  );
}
