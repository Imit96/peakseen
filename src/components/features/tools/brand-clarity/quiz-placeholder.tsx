'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const sampleOptions = [
  'Yes, I can say it clearly in under 10 words',
  'I have a rough idea, but it changes often',
  'I know what we do, but not the deeper why',
  "Not really — we haven't defined it yet",
];

export function QuizPlaceholder() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  return (
    <Section id="quiz">
      <div className="mx-auto max-w-2xl">
        <FadeInOnScroll>
          <ProgressBar value={10} label="Question 1 of 10" className="mb-8" />
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-8">
            {"Can you explain your brand's core purpose in one sentence?"}
          </h2>
        </FadeInOnScroll>

        <div className="space-y-3 mb-8">
          {sampleOptions.map((option, index) => (
            <FadeInOnScroll key={option} delay={0.15 + index * 0.05}>
              <button
                type="button"
                onClick={() => setSelectedOption(index)}
                className={cn(
                  'w-full text-left p-4 rounded-lg border transition-all duration-150',
                  'hover:border-accent hover:bg-accent-subtle/50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                  selectedOption === index
                    ? 'border-accent bg-accent-subtle/50'
                    : 'border-grey-100 bg-white'
                )}
              >
                <span className="text-sm text-charcoal">{option}</span>
              </button>
            </FadeInOnScroll>
          ))}
        </div>

        <FadeInOnScroll delay={0.4}>
          <div className="flex items-center justify-between">
            <Button variant="primary" size="lg" disabled={selectedOption === null}>
              Next &rarr;
            </Button>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.5}>
          <Card className="mt-12 p-6 text-center bg-accent-subtle/30 border-accent/20">
            <p className="text-sm text-grey-600 mb-3">
              Full quiz coming soon. Get your Brand Report instead.
            </p>
            <Link
              href="/brand-report"
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
            >
              Get your Brand Report &rarr;
            </Link>
          </Card>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
