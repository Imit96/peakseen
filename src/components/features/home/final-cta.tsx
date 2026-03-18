import { CTABlock } from '@/components/ui/cta-block';

export function FinalCta() {
  return (
    <CTABlock
      variant="dark"
      headline="Ready to reach your peak?"
      primaryCta={{ label: 'Start a Project', href: '/start' }}
      secondaryCta={{ label: 'Book a Free Call', href: '/contact' }}
    />
  );
}
