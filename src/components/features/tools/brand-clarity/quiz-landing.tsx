import Link from 'next/link';
import { CheckCircle, Clock } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const benefits = [
  'A score out of 100',
  'Dimension breakdown across 5 brand pillars',
  'Top action items to improve your brand',
  'Optional PDF report for your team',
];

export function QuizLanding() {
  return (
    <Section dark>
      <div className="mx-auto max-w-3xl text-center">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-8xl font-bold tracking-tight text-ivory mb-6">
            Brand Clarity Score
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.1}>
          <p className="text-lg lg:text-xl text-grey-400 max-w-2xl mx-auto mb-10">
            How clear is your brand? Take our 10-question quiz and get a score
            out of 100 — with personalised recommendations to improve.
          </p>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.2}>
          <div className="mx-auto max-w-md text-left mb-10">
            <h2 className="font-display text-sm font-bold text-grey-400 uppercase tracking-wider mb-4">
              What you will get
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-ivory"
                >
                  <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.3}>
          <Link
            href="#quiz"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
          >
            Start the Quiz &rarr;
          </Link>
          <p className="flex items-center justify-center gap-2 text-sm text-grey-500 mt-4">
            <Clock className="h-4 w-4" />
            Takes 3 minutes. No sign-up required.
          </p>
        </FadeInOnScroll>
      </div>
    </Section>
  );
}
