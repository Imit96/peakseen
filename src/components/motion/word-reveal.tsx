'use client';

import { motion, type Variants } from 'framer-motion';
import { MOTION } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TagType = 'h1' | 'h2' | 'h3' | 'p';

interface WordRevealProps {
  text: string;
  className?: string;
  tag?: TagType;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const wordVariants: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: MOTION.duration.slow,
      ease: MOTION.ease.out,
    },
  },
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

export function WordReveal({ text, className, tag = 'h2' }: WordRevealProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    const Tag = tag;
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(' ');
  const MotionTag = motionTags[tag];

  return (
    <MotionTag
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden"
          style={{ marginRight: '0.25em' }}
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
