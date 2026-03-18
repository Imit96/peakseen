'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, active = false, onClick, className }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-display text-sm font-medium tracking-[0.02em] px-4 py-2 rounded-full border transition-colors duration-150 cursor-pointer',
        active
          ? 'bg-accent border-accent text-white'
          : 'bg-transparent border-grey-100 text-grey-600 hover:bg-grey-50',
        className
      )}
    >
      {children}
    </button>
  );
}

export type { TagProps };
