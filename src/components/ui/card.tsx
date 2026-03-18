import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'border border-grey-100 bg-grey-50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]',
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
