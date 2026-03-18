'use client';

import { Card } from '@/components/ui/card';
import { NewsletterForm } from '@/components/features/newsletter/newsletter-form';
import { cn } from '@/lib/utils';

interface NewsletterInlineProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterInline({
  title = 'Get more insights like this',
  description = 'Join the PeakSeen newsletter for brand strategy, design thinking, and growth tips.',
  className,
}: NewsletterInlineProps) {
  return (
    <Card className={cn('p-6 lg:p-8 bg-charcoal border-charcoal not-prose', className)}>
      <h3 className="font-display text-lg font-bold text-ivory">{title}</h3>
      <p className="text-sm text-grey-300 mt-2">{description}</p>
      <div className="mt-4">
        <NewsletterForm />
      </div>
    </Card>
  );
}
