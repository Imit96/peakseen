import type { Metadata } from 'next';
import { ProductsHero } from '@/components/features/products/products-hero';
import { ProductGrid } from '@/components/features/products/product-grid';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'Brand Templates & Digital Products | PeakSeen Shop',
  description:
    'Download professional brand identity kits, social media templates, and strategy workbooks. Buy once, use forever. No designer needed.',
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductGrid />
      <CTABlock
        variant="dark"
        headline="Need something custom?"
        primaryCta={{ label: 'Start a Project \u2192', href: '/start' }}
        secondaryCta={{ label: 'View Services \u2192', href: '/services' }}
      />
    </>
  );
}
