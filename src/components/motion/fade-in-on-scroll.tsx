'use client';

import { motion } from 'framer-motion';
import { MOTION } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const directionOffset: Record<
  NonNullable<FadeInOnScrollProps['direction']>,
  { x?: number; y?: number }
> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -40 },
  right: { x: 40 },
};

export function FadeInOnScroll({
  children,
  className,
  delay = 0,
  direction = 'up',
}: FadeInOnScrollProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = directionOffset[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: MOTION.duration.normal,
        ease: MOTION.ease.spring,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
