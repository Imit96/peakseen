import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductPromoProps {
  title: string;
  description: string;
  href: string;
  price?: string;
  cta?: string;
  className?: string;
}

export function ProductPromo({
  title,
  description,
  href,
  price,
  cta = 'View product',
  className,
}: ProductPromoProps) {
  return (
    <Card className={cn('p-6 lg:p-8 not-prose', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
          <p className="text-sm text-grey-500 mt-2">{description}</p>
        </div>
        {price && (
          <Badge variant="accent" className="shrink-0">
            {price}
          </Badge>
        )}
      </div>
      <div className="mt-4">
        <Link
          href={href}
          className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
        >
          {cta} →
        </Link>
      </div>
    </Card>
  );
}
