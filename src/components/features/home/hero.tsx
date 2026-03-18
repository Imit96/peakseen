'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';
import { WordReveal } from '@/components/motion/word-reveal';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Set up a scroll tracker on the [200vh] parent section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'], // 0 when top is at top, 1 when bottom hits top
  });

  // Typography animations (fade out and slide up between 0% and 30% scroll depth)
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const textScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);

  // Media animations (scale out to full screen from 15% to 65% scroll depth)
  const mediaWidth = useTransform(scrollYProgress, [0.15, 0.65], ['75vw', '100vw']);
  const mediaHeight = useTransform(scrollYProgress, [0.15, 0.65], ['50vh', '100vh']);
  const mediaRadius = useTransform(scrollYProgress, [0.15, 0.65], ['2rem', '0rem']);

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-charcoal">
      
      {/* Sticky wrapper locking the content to the screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Dynamic Background Noise */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-grey-900 via-charcoal to-charcoal opacity-60"></div>

        {/* The Text Layer (Slides Up & Fades) */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="absolute z-20 mx-auto max-w-5xl px-6 lg:px-8 w-full flex flex-col items-center text-center mt-[-20vh] md:mt-[-15vh]"
        >
          <WordReveal
            text="Reach Your Peak. Be Seen."
            tag="h1"
            className="font-display text-5xl md:text-8xl lg:text-[8rem] font-black tracking-[-0.04em] text-ivory leading-[0.95] max-w-4xl drop-shadow-2xl"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-lg md:text-2xl text-grey-300 max-w-2xl mt-8 drop-shadow-md"
          >
            Brand strategy, design, and development for startups that refuse to blend in. No fluff. Just impact.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mt-12 justify-center w-full"
          >
            <Link
              href="/start"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'w-full sm:w-auto px-8 shadow-xl')}
            >
              Start a Project &rarr;
            </Link>
            <Link
              href="/brand-report"
              className={cn(
                buttonVariants({ variant: 'secondary', size: 'lg' }),
                'text-ivory border-grey-700 hover:bg-grey-800 bg-charcoal/50 backdrop-blur-md w-full sm:w-auto px-8'
              )}
            >
              Get a Free Brand Report
            </Link>
          </motion.div>
        </motion.div>

        {/* The Expanding Media Layer */}
        <motion.div 
          style={{ 
            width: mediaWidth,
            height: mediaHeight, 
            borderRadius: mediaRadius,
          }}
          className="relative z-10 overflow-hidden shadow-2xl flex items-center justify-center mt-[30vh]"
        >
           {/* Dark overlay specifically to dim the image when text is present, fading out as it gets big */}
           <motion.div 
             style={{ opacity: textOpacity }} 
             className="absolute inset-0 bg-charcoal/40 z-10 transition-colors"
           />
           
           <Image
             src="/images/work/saas-product-brand.png"
             alt="PeakSeen Premium Interface"
             fill
             priority
             className="object-cover object-top"
           />
        </motion.div>

      </div>
    </section>
  );
}
