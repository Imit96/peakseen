import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full min-h-[120px] rounded-md border border-grey-100 bg-white px-4 py-3 text-base text-charcoal placeholder:text-grey-400 transition-colors duration-150',
          'focus:border-accent focus:ring-1 focus:ring-accent focus:bg-accent-subtle/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error bg-error-light',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
