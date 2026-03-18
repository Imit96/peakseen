import React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-14 w-14 text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const avatarSizeMap: Record<string, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  name: string;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ?? '';
  if (parts.length === 1) {
    return first.charAt(0).toUpperCase();
  }
  const last = parts[parts.length - 1] ?? '';
  return (first.charAt(0) + last.charAt(0)).toUpperCase();
}

export function Avatar({ src, name, size, className }: AvatarProps) {
  const resolvedSize = size ?? 'md';
  const dimension = avatarSizeMap[resolvedSize] ?? 40;

  if (src) {
    return (
      <div className={cn(avatarVariants({ size }), 'border-2 border-ivory', className)}>
        <Image
          src={src}
          alt={name}
          width={dimension}
          height={dimension}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        avatarVariants({ size }),
        'bg-accent text-white font-display font-bold',
        className
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}

export { avatarVariants };
export type { AvatarProps };
