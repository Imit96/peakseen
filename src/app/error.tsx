'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <p className="font-mono text-sm text-error">Error</p>
        <h1 className="font-display text-5xl lg:text-7xl font-bold text-charcoal tracking-[-0.025em] mt-4">
          Something went wrong
        </h1>
        <p className="font-body text-lg text-grey-500 mt-6 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="mt-8">
          <Button onClick={reset} variant="primary" size="lg">
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
}
