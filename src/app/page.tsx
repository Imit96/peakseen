import type { Metadata } from 'next';
import { Hero } from '@/components/features/home/hero';
import { AboutBrief } from '@/components/features/home/about-brief';
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
    <main className="relative bg-charcoal">
      {/* 
        This is the fixed Hero background layer. 
        It stays locked in the viewport while the rest of the page scrolls over it.
      */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Hero />
      </div>

      {/* 
        This is the sliding content layer.
        It starts precisely below the hero (mt-[100vh]) and slides *up* over it.
      */}
      <div className="relative z-10 mt-[100vh] bg-ivory rounded-t-[2.5rem] lg:rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.15)] overflow-hidden">
        <AboutBrief />
        <ValueStrip />
        <ServicesOverview />
        <FeaturedWork />
        <ToolsPreview />
        <ProductsPreview />
        <Testimonials />
        <BrandReportCta />
        <BlogPreview />
        <FinalCta />
      </div>
    </main>
  );
}
