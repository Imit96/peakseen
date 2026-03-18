import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PRODUCTS = [
  {
    slug: 'brand-identity-starter-kit',
    name: 'Brand Identity Starter Kit',
    price: '$29',
    description:
      'Everything you need to launch a basic brand identity — in one Figma file.',
    badges: [{ label: 'Design Templates', variant: 'default' as const }],
  },
  {
    slug: 'social-media-content-pack',
    name: 'Social Media Content Pack',
    price: '$19',
    description:
      '30 days of social media templates. Just add your words.',
    badges: [{ label: 'Design Templates', variant: 'default' as const }],
  },
  {
    slug: 'brand-clarity-workbook',
    name: 'Brand Clarity Workbook',
    price: '$19',
    description:
      'The questions every founder should answer before designing anything.',
    badges: [{ label: 'Strategy Toolkits', variant: 'default' as const }],
  },
  {
    slug: 'complete-brand-starter-bundle',
    name: 'Complete Brand Starter Bundle',
    price: '$59',
    description:
      'All three products. One price. Everything you need to start.',
    badges: [
      { label: 'Bundles', variant: 'default' as const },
      { label: 'Save 25%', variant: 'accent' as const },
    ],
  },
];

export function ProductGrid() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {PRODUCTS.map((product, index) => (
          <FadeInOnScroll key={product.slug} delay={index * 0.1}>
            <Card variant="default">
              <div className="aspect-video bg-grey-100" />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.badges.map((badge) => (
                    <Badge key={badge.label} variant={badge.variant}>
                      {badge.label}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal tracking-tight">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-grey-600 mt-2">
                  {product.description}
                </p>
                <p className="font-display text-2xl font-bold text-charcoal mt-4">
                  {product.price}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'mt-3 px-0 hover:bg-transparent hover:text-accent'
                  )}
                >
                  View Product &rarr;
                </Link>
              </div>
            </Card>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
