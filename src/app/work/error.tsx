'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function WorkError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <Section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
          Something went wrong
        </h2>
        <p className="text-grey-500 mb-8">
          We couldn&apos;t load this page. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
          >
            Try again
          </button>
          <Link
            href="/work"
            className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}
          >
            Back to Work
          </Link>
        </div>
      </div>
    </Section>
  );
}
