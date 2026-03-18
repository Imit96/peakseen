import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CASE_STUDIES = [
  {
    slug: 'fintech-brand-identity',
    name: 'Fintech Brand Identity',
    badges: ['Branding', 'Strategy'],
    outcome: 'A complete rebrand that increased user trust by 40%',
    image: '/images/work/fintech-brand-identity.png'
  },
  {
    slug: 'ecommerce-brand-identity',
    name: 'E-commerce Brand Identity',
    badges: ['Branding', 'Web Design'],
    outcome: 'A premium brand experience that doubled mobile conversions',
    image: '/images/work/ecommerce-brand-identity.png'
  },
  {
    slug: 'saas-product-brand',
    name: 'SaaS Product Brand',
    badges: ['Branding', 'Product Design'],
    outcome: 'A unified brand and design system for a growing SaaS platform',
    image: '/images/work/saas-product-brand.png'
  },
];

export function WorkGrid() {
  return (
    <Section>
      <FadeInOnScroll>
        <p className="font-body text-sm text-grey-400 mb-8 text-center lg:text-left">
          These are concept projects — designed to demonstrate our process and
          capabilities. Paid client work is on the way.
        </p>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {CASE_STUDIES.map((study, index) => (
          <FadeInOnScroll key={study.slug} delay={index * 0.1}>
            <Card variant="default">
              <div className="relative aspect-video w-full rounded-t-lg overflow-hidden bg-charcoal">
                <Image 
                  src={study.image} 
                  alt={study.name} 
                  fill 
                  className="object-cover transition-transform duration-500 hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {study.badges.map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal tracking-tight">
                  {study.name}
                </h3>
                <p className="font-body text-sm text-grey-600 mt-2">
                  {study.outcome}
                </p>
                <Link
                  href={`/work/${study.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'mt-4 px-0 hover:bg-transparent hover:text-accent'
                  )}
                >
                  View Case Study &rarr;
                </Link>
              </div>
            </Card>
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
