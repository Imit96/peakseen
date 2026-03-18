import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const PRODUCTS = [
  {
    slug: 'brand-starter-kit',
    name: 'Brand Starter Kit',
    price: 'From $29',
    description: 'Logo templates, colour guides, and brand board — everything to launch your look.',
  },
  {
    slug: 'social-media-template-pack',
    name: 'Social Media Template Pack',
    price: 'From $29',
    description: 'Scroll-stopping templates for Instagram, LinkedIn, and X — fully editable.',
  },
  {
    slug: 'pitch-deck-template',
    name: 'Pitch Deck Template',
    price: 'From $29',
    description: 'Investor-ready slides with clean layouts and built-in storytelling structure.',
  },
] as const;

export function ProductsPreview() {
  return (
    <Section id="products-preview">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal tracking-[-0.015em]">
          Ready-made tools for your brand
        </h2>
        <p className="text-lg text-grey-500 mt-4 max-w-2xl">
          Buy once. Use forever. No designer needed.
        </p>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {PRODUCTS.map((product) => (
          <Card key={product.slug}>
            <div className="bg-grey-200 aspect-[3/2] rounded-t-lg" />
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-charcoal">
                {product.name}
              </h3>
              <p className="text-sm font-display font-bold text-accent mt-1">
                {product.price}
              </p>
              <p className="text-sm text-grey-500 mt-2">
                {product.description}
              </p>
            </div>
          </Card>
        ))}
      </StaggerChildren>

      <FadeInOnScroll className="mt-12 text-center">
        <Link
          href="/products"
          className="font-display font-bold text-accent hover:underline"
        >
          Browse the shop &rarr;
        </Link>
      </FadeInOnScroll>
    </Section>
  );
}
