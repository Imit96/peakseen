import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'border border-grey-100 bg-grey-50 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:shadow-xl',
  {
    variants: {
      variant: {
        default: 'rounded-lg overflow-hidden',
        compact: 'rounded-lg p-6',
        featured: 'rounded-xl overflow-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, children, ...props }: CardProps) {
  return (
    <article className={cn(cardVariants({ variant }), className)} {...props}>
      {children}
    </article>
  );
}

export { cardVariants };
export type { CardProps };
