import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'h-12 w-full rounded-md border border-grey-100 bg-white px-4 py-3 text-base text-charcoal transition-colors duration-150 appearance-none',
          'focus:border-accent focus:ring-1 focus:ring-accent focus:bg-accent-subtle/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-error bg-error-light',
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
