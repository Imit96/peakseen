'use client';

import { motion, type Variants } from 'framer-motion';
import { MOTION } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION.stagger,
    },
  },
};

export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION.duration.normal,
      ease: MOTION.ease.out,
    },
  },
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = MOTION.stagger,
}: StaggerChildrenProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants =
    staggerDelay === MOTION.stagger
      ? containerVariants
      : {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}
