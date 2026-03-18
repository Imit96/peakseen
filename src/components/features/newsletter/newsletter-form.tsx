'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/app/newsletter/actions';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormState {
  success: boolean;
  error?: string;
}

export function NewsletterForm({ className }: { className?: string }) {
  const [state, setState] = useState<FormState>({ success: false });
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      const result = await subscribeNewsletter(formData);
      setState(result);
    } catch {
      setState({ success: false, error: 'Something went wrong. Please try again.' });
    } finally {
      setIsPending(false);
    }
  }

  if (state.success) {
    return (
      <div className={cn('text-sm text-accent font-medium', className)}>
        Subscribed! Check your inbox.
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <form action={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-9 flex-1 rounded-md border border-grey-600 bg-charcoal px-3 text-sm text-ivory placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-charcoal"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isPending}
            disabled={isPending}
          >
            Subscribe
          </Button>
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="newsletter-consent"
            name="consentMarketing"
            required
            className="mt-0.5 h-3.5 w-3.5 rounded border-grey-600 bg-charcoal text-accent focus:ring-accent focus:ring-offset-charcoal"
          />
          <label htmlFor="newsletter-consent" className="text-xs text-grey-400">
            I agree to receive the PeakSeen newsletter and marketing emails.
          </label>
        </div>
      </form>
      {state.error && (
        <p className="mt-2 text-sm text-error">{state.error}</p>
      )}
    </div>
  );
}
