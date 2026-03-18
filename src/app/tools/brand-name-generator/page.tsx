import type { Metadata } from 'next';
import { NameGeneratorLanding } from '@/components/features/tools/name-generator/name-generator-landing';
import { NameGeneratorForm } from '@/components/features/tools/name-generator/name-generator-form';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Free Brand Name Generator — AI-Powered | PeakSeen',
  description:
    'Generate 10 brand name ideas in seconds. Enter your industry and keywords. AI-powered. Free.',
};

export default function BrandNameGeneratorPage() {
  return (
    <>
      <NameGeneratorLanding />
      <NameGeneratorForm />
      <CTABlock
        variant="dark"
        headline="Love the name? Let us build the brand."
        primaryCta={{ label: 'Start a project', href: '/start' }}
        secondaryCta={{ label: 'See our work', href: '/work' }}
      />
    </>
  );
}
