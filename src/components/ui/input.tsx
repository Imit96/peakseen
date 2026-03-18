import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-12 w-full rounded-md border border-grey-100 bg-white px-4 py-3 text-base text-charcoal placeholder:text-grey-400 transition-colors duration-150',
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

Input.displayName = 'Input';

export { Input };
export type { InputProps };
