import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button-variants';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ToolPromoProps {
  title: string;
  description: string;
  href: string;
  cta?: string;
  className?: string;
}

export function ToolPromo({
  title,
  description,
  href,
  cta = 'Try it free',
  className,
}: ToolPromoProps) {
  return (
    <Card className={cn('p-6 lg:p-8 not-prose', className)}>
      <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
      <p className="text-sm text-grey-500 mt-2">{description}</p>
      <div className="mt-4">
        <Link
          href={href}
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          {cta} →
        </Link>
      </div>
    </Card>
  );
}
