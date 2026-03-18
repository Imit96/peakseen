import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <p className="mb-2 text-sm font-display text-grey-500">{label}</p>
      )}
      <div className="w-full h-1 bg-grey-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? 'Progress'}
        />
      </div>
    </div>
  );
}

export type { ProgressBarProps };
