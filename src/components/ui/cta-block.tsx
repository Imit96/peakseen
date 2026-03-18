import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

const ctaBlockVariants = cva('w-full px-6 lg:px-8', {
  variants: {
    variant: {
      dark: 'bg-charcoal py-16 lg:py-24',
      accent: 'bg-accent py-16 lg:py-24',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});

interface CtaLink {
  label: string;
  href: string;
}

interface CTABlockProps extends VariantProps<typeof ctaBlockVariants> {
  headline: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
}

export function CTABlock({
  variant,
  headline,
  primaryCta,
  secondaryCta,
  className,
}: CTABlockProps) {
  const resolvedVariant = variant ?? 'dark';

  return (
    <section className={cn(ctaBlockVariants({ variant }), className)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={cn(
            'font-display text-3xl lg:text-5xl font-bold tracking-tight mb-8',
            resolvedVariant === 'dark' ? 'text-ivory' : 'text-white'
          )}
        >
          {headline}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {resolvedVariant === 'dark' ? (
            <>
              <Link
                href={primaryCta.href}
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                {primaryCta.label}
              </Link>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'lg' }),
                    'border-grey-600 text-ivory hover:bg-grey-800'
                  )}
                >
                  {secondaryCta.label}
                </Link>
              )}
            </>
          ) : (
            <Link
              href={primaryCta.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'lg' }),
                'border border-white text-white hover:bg-white/10 hover:text-white'
              )}
            >
              {primaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export { ctaBlockVariants };
export type { CTABlockProps };
