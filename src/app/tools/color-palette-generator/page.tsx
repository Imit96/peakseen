import type { Metadata } from 'next';
import { PaletteLanding } from '@/components/features/tools/color-palette/palette-landing';
import { PaletteGenerator } from '@/components/features/tools/color-palette/palette-generator';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Free Brand Color Palette Generator | PeakSeen',
  description:
    'Build a 5-colour brand palette with hex codes, contrast ratings, and font pairings. Free, no sign-up.',
};

export default function ColorPaletteGeneratorPage() {
  return (
    <>
      <PaletteLanding />
      <PaletteGenerator />
      <CTABlock
        variant="dark"
        headline="Need a full visual identity?"
        primaryCta={{ label: 'Start a project', href: '/start' }}
        secondaryCta={{ label: 'See our work', href: '/work' }}
      />
    </>
  );
}
