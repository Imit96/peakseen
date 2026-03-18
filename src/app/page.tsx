import type { Metadata } from 'next';
import { Hero } from '@/components/features/home/hero';
import { ValueStrip } from '@/components/features/home/value-strip';
import { ServicesOverview } from '@/components/features/home/services-overview';
import { FeaturedWork } from '@/components/features/home/featured-work';
import { ToolsPreview } from '@/components/features/home/tools-preview';
import { ProductsPreview } from '@/components/features/home/products-preview';
import { Testimonials } from '@/components/features/home/testimonials';
import { BrandReportCta } from '@/components/features/home/brand-report-cta';
import { BlogPreview } from '@/components/features/home/blog-preview';
import { FinalCta } from '@/components/features/home/final-cta';

export const metadata: Metadata = {
  title: 'PeakSeen — Brand & Product Studio',
  description:
    'We build brands that people remember and products that people use. Strategy, design, and development — done right.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <ServicesOverview />
      <FeaturedWork />
      <ToolsPreview />
      <ProductsPreview />
      <Testimonials />
      <BrandReportCta />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
