import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { QuizLanding } from '@/components/features/tools/brand-clarity/quiz-landing';
import { CTABlock } from '@/components/ui/cta-block';
import { Skeleton } from '@/components/ui/skeleton';

const QuizEngine = dynamic(
  () => import('@/components/features/tools/brand-clarity/quiz-engine').then((mod) => ({ default: mod.QuizEngine })),
  { loading: () => <div className="mx-auto max-w-2xl py-16 px-4"><Skeleton className="h-96" /></div> }
);

export const metadata: Metadata = {
  title: 'Brand Clarity Score — Free Quiz | PeakSeen',
  description:
    'How strong is your brand? Take our 10-question quiz, get a score out of 100, and download a PDF report.',
};

export default function BrandClarityScorePage() {
  return (
    <>
      <QuizLanding />
      <QuizEngine />
      <CTABlock
        variant="dark"
        headline="Want a deeper brand analysis?"
        primaryCta={{ label: 'Get your Brand Report', href: '/brand-report' }}
        secondaryCta={{ label: 'Start a project', href: '/start' }}
      />
    </>
  );
}
