'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Target, Palette, MessageSquare, Globe, Users } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ui/progress-bar';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuizOption {
  label: string;
  weight: number;
}

interface QuizQuestion {
  id: number;
  dimension: DimensionKey;
  text: string;
  options: QuizOption[];
}

type DimensionKey = 'purpose' | 'visual' | 'voice' | 'digital' | 'audience';

interface DimensionMeta {
  label: string;
  icon: React.ElementType;
}

interface Answer {
  questionId: number;
  selectedOption: number;
}

interface DimensionScores {
  purpose: number;
  visual: number;
  voice: number;
  digital: number;
  audience: number;
}

interface EmailFormData {
  email: string;
  name: string;
  businessName: string;
  consentMarketing: boolean;
}

type QuizPhase = 'questions' | 'email-gate' | 'results';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DIMENSIONS: Record<DimensionKey, DimensionMeta> = {
  purpose: { label: 'Purpose & Positioning', icon: Target },
  visual: { label: 'Visual Identity', icon: Palette },
  voice: { label: 'Brand Voice & Messaging', icon: MessageSquare },
  digital: { label: 'Digital Presence', icon: Globe },
  audience: { label: 'Audience Clarity', icon: Users },
} as const;

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    dimension: 'purpose',
    text: "Can you explain your brand's core purpose in one sentence?",
    options: [
      { label: "Not really \u2014 we haven't defined it yet", weight: 0 },
      { label: 'I have a rough idea, but it changes often', weight: 1 },
      { label: 'I know what we do, but not the deeper why', weight: 2 },
      { label: 'Yes, I can say it clearly in under 10 words', weight: 3 },
    ],
  },
  {
    id: 2,
    dimension: 'purpose',
    text: 'How well does your brand stand apart from competitors?',
    options: [
      { label: 'We look and sound like everyone else', weight: 0 },
      { label: "We have some unique qualities but haven't articulated them", weight: 1 },
      { label: "We know what makes us different but don't communicate it well", weight: 2 },
      { label: 'Our positioning is clear, unique, and communicated consistently', weight: 3 },
    ],
  },
  {
    id: 3,
    dimension: 'visual',
    text: 'How would you describe your logo?',
    options: [
      { label: "We don't have one yet", weight: 0 },
      { label: 'We have one but it was made quickly/cheaply', weight: 1 },
      { label: "It's decent but not consistent across our materials", weight: 2 },
      { label: "It's professional, consistent, and memorable", weight: 3 },
    ],
  },
  {
    id: 4,
    dimension: 'visual',
    text: 'Do you have a defined colour palette and typography?',
    options: [
      { label: 'No \u2014 we pick colours and fonts randomly', weight: 0 },
      { label: 'We have preferences but nothing documented', weight: 1 },
      { label: "We have a basic palette but it's not always followed", weight: 2 },
      { label: 'Yes \u2014 documented and used consistently everywhere', weight: 3 },
    ],
  },
  {
    id: 5,
    dimension: 'voice',
    text: 'Does your brand have a defined tone of voice?',
    options: [
      { label: "We haven't thought about it", weight: 0 },
      { label: 'We have a vague sense but nothing written down', weight: 1 },
      { label: "We have guidelines but they're inconsistently applied", weight: 2 },
      { label: 'We have documented voice guidelines used by the whole team', weight: 3 },
    ],
  },
  {
    id: 6,
    dimension: 'voice',
    text: 'How consistent is your messaging across platforms?',
    options: [
      { label: "It's different everywhere \u2014 no consistency", weight: 0 },
      { label: "We try to be consistent but it depends on who's writing", weight: 1 },
      { label: 'Mostly consistent with occasional drift', weight: 2 },
      { label: 'Highly consistent \u2014 same message, same tone, everywhere', weight: 3 },
    ],
  },
  {
    id: 7,
    dimension: 'digital',
    text: 'How would you rate your website?',
    options: [
      { label: "We don't have one / it's severely outdated", weight: 0 },
      { label: "We have a basic one but it doesn't represent us well", weight: 1 },
      { label: "It's decent but could use improvement", weight: 2 },
      { label: 'Professional, on-brand, and performs well', weight: 3 },
    ],
  },
  {
    id: 8,
    dimension: 'digital',
    text: 'How active and consistent is your social media presence?',
    options: [
      { label: "We're not on social media / inactive", weight: 0 },
      { label: 'We post occasionally with no strategy', weight: 1 },
      { label: 'We post regularly but without a cohesive brand look', weight: 2 },
      { label: 'Active, strategic, and visually consistent with our brand', weight: 3 },
    ],
  },
  {
    id: 9,
    dimension: 'audience',
    text: 'How well do you know your target audience?',
    options: [
      { label: 'We sell to everyone \u2014 no specific target', weight: 0 },
      { label: "We have a rough idea but haven't researched deeply", weight: 1 },
      { label: "We know our audience but haven't created detailed personas", weight: 2 },
      { label: 'We have detailed personas with data to back them up', weight: 3 },
    ],
  },
  {
    id: 10,
    dimension: 'audience',
    text: 'Do your customers describe your brand the way you intend?',
    options: [
      { label: "We've never asked them", weight: 0 },
      { label: 'Their perception is very different from our intent', weight: 1 },
      { label: 'Somewhat aligned but with gaps', weight: 2 },
      { label: 'Closely aligned \u2014 our brand promise matches their experience', weight: 3 },
    ],
  },
];

const SCORE_BANDS = [
  { min: 0, max: 39, label: 'Your brand needs urgent attention', colour: 'bg-error' },
  { min: 40, max: 59, label: 'Your brand has potential \u2014 with some key gaps', colour: 'bg-warning' },
  { min: 60, max: 79, label: 'Solid foundation with room to grow', colour: 'bg-accent' },
  { min: 80, max: 100, label: 'Strong brand \u2014 let\u2019s take it further', colour: 'bg-success' },
] as const;

const EMAIL_GATE_AFTER_QUESTION = 5;
const MAX_RAW_SCORE = 60;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function computeScores(answers: Answer[]): { total: number; dimensions: DimensionScores } {
  const rawDimensions: DimensionScores = {
    purpose: 0,
    visual: 0,
    voice: 0,
    digital: 0,
    audience: 0,
  };

  for (const answer of answers) {
    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;
    const option = question.options[answer.selectedOption];
    if (option) {
      rawDimensions[question.dimension] += option.weight;
    }
  }

  // Each dimension has 2 questions, max 6 points -> normalize to 100
  const dimensionScores: DimensionScores = {
    purpose: Math.round((rawDimensions.purpose / 6) * 100),
    visual: Math.round((rawDimensions.visual / 6) * 100),
    voice: Math.round((rawDimensions.voice / 6) * 100),
    digital: Math.round((rawDimensions.digital / 6) * 100),
    audience: Math.round((rawDimensions.audience / 6) * 100),
  };

  const rawTotal = Object.values(rawDimensions).reduce((sum, v) => sum + v, 0);
  const total = Math.round((rawTotal / MAX_RAW_SCORE) * 100);

  return { total, dimensions: dimensionScores };
}

function getScoreBand(score: number) {
  return SCORE_BANDS.find((b) => score >= b.min && score <= b.max) ?? SCORE_BANDS[0];
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function QuizEngine() {
  const [phase, setPhase] = useState<QuizPhase>('questions');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState(1);

  // Email gate state
  const [emailForm, setEmailForm] = useState<EmailFormData>({
    email: '',
    name: '',
    businessName: '',
    consentMarketing: false,
  });
  const [emailError, setEmailError] = useState('');

  // Results state
  const [totalScore, setTotalScore] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<DimensionScores>({
    purpose: 0,
    visual: 0,
    voice: 0,
    digital: 0,
    audience: 0,
  });
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + (phase === 'results' ? 1 : 0)) / QUESTIONS.length) * 100;

  // Restore selected option when navigating back
  useEffect(() => {
    const existingAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
    setSelectedOption(existingAnswer ? existingAnswer.selectedOption : null);
  }, [currentIndex, answers, currentQuestion?.id]);

  // Animated score counter
  useEffect(() => {
    if (phase !== 'results') return;

    let frame: number;
    const duration = 1200;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * totalScore));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, totalScore]);

  const handleSelectOption = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex);
  }, []);

  const finishQuiz = useCallback(
    async (finalAnswers: Answer[]) => {
      const scores = computeScores(finalAnswers);
      setTotalScore(scores.total);
      setDimensionScores(scores.dimensions);
      setPhase('results');

      // Submit to API
      setIsSubmitting(true);
      setSubmitError('');

      try {
        const response = await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailForm.email.trim(),
            name: emailForm.name.trim() || null,
            businessName: emailForm.businessName.trim() || null,
            score: scores.total,
            dimensionScores: scores.dimensions,
            answers: finalAnswers.map((a) => ({
              questionId: a.questionId,
              selectedOption: a.selectedOption,
            })),
            consentMarketing: emailForm.consentMarketing,
          }),
        });

        if (!response.ok) {
          console.error('[Quiz Submit] Server responded with status:', response.status);
          setSubmitError('We saved your results locally, but there was an issue sending them. You can still view your score.');
        }
      } catch (err) {
        console.error('[Quiz Submit] Network error:', err instanceof Error ? err.message : 'Unknown error');
        setSubmitError('We saved your results locally, but there was an issue sending them. You can still view your score.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [emailForm]
  );

  const handleNext = useCallback(() => {
    if (selectedOption === null || !currentQuestion) return;

    // Record the answer
    const newAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOption },
    ];
    setAnswers(newAnswers);

    // Check if we should show email gate
    if (currentIndex + 1 === EMAIL_GATE_AFTER_QUESTION && phase === 'questions') {
      setPhase('email-gate');
      return;
    }

    // Check if quiz is complete
    if (currentIndex + 1 >= QUESTIONS.length) {
      finishQuiz(newAnswers);
      return;
    }

    // Go to next question
    setSlideDirection(1);
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
  }, [selectedOption, answers, currentQuestion, currentIndex, phase, finishQuiz]);

  const handleBack = useCallback(() => {
    if (currentIndex === 0) return;
    setSlideDirection(-1);
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex]);

  const handleEmailContinue = useCallback(() => {
    setEmailError('');

    // Validate email
    const emailTrimmed = emailForm.email.trim();
    if (!emailTrimmed) {
      setEmailError('Please enter your email to see your results.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    // Continue to next question
    setPhase('questions');
    setSlideDirection(1);
    setCurrentIndex(EMAIL_GATE_AFTER_QUESTION);
    setSelectedOption(null);
  }, [emailForm.email]);

  /* ---------------------------------------------------------------- */
  /*  Render: Email Gate                                               */
  /* ---------------------------------------------------------------- */

  if (phase === 'email-gate') {
    return (
      <Section id="quiz">
        <div className="mx-auto max-w-2xl">
          <ProgressBar value={50} label="Halfway there" className="mb-8" />

          <FadeInOnScroll>
            <Card className="p-6 lg:p-8 bg-white border-grey-100 hover:scale-100">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-3">
                You are halfway through
              </h2>
              <p className="text-grey-600 mb-8">
                Enter your email to unlock your full score and personalised brand report.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="quiz-email" className="block text-sm font-display font-bold text-charcoal mb-1.5">
                    Email address <span className="text-error">*</span>
                  </label>
                  <Input
                    id="quiz-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={emailForm.email}
                    error={!!emailError}
                    onChange={(e) => {
                      setEmailForm((prev) => ({ ...prev, email: e.target.value }));
                      if (emailError) setEmailError('');
                    }}
                  />
                  {emailError && (
                    <p className="mt-1.5 text-sm text-error">{emailError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="quiz-name" className="block text-sm font-display font-bold text-charcoal mb-1.5">
                    Your name <span className="text-grey-400">(optional)</span>
                  </label>
                  <Input
                    id="quiz-name"
                    type="text"
                    placeholder="Jane Doe"
                    value={emailForm.name}
                    onChange={(e) => setEmailForm((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label htmlFor="quiz-business" className="block text-sm font-display font-bold text-charcoal mb-1.5">
                    Business name <span className="text-grey-400">(optional)</span>
                  </label>
                  <Input
                    id="quiz-business"
                    type="text"
                    placeholder="Acme Inc."
                    value={emailForm.businessName}
                    onChange={(e) => setEmailForm((prev) => ({ ...prev, businessName: e.target.value }))}
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    id="quiz-consent"
                    type="checkbox"
                    checked={emailForm.consentMarketing}
                    onChange={(e) => setEmailForm((prev) => ({ ...prev, consentMarketing: e.target.checked }))}
                    className="mt-1 h-4 w-4 rounded border-grey-200 text-accent focus:ring-accent"
                  />
                  <label htmlFor="quiz-consent" className="text-sm text-grey-600">
                    I agree to receive the PeakSeen newsletter and marketing emails.
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleEmailContinue}
                >
                  Continue to my results
                </Button>
              </div>
            </Card>
          </FadeInOnScroll>
        </div>
      </Section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render: Results                                                  */
  /* ---------------------------------------------------------------- */

  if (phase === 'results') {
    const band = getScoreBand(totalScore);

    return (
      <Section id="quiz">
        <div className="mx-auto max-w-2xl">
          <ProgressBar value={100} label="Complete" className="mb-8" />

          <FadeInOnScroll>
            <div className="text-center mb-10">
              <p className="font-display text-sm font-bold text-grey-400 uppercase tracking-wider mb-3">
                Your Brand Clarity Score
              </p>
              <p className="font-display text-7xl lg:text-9xl font-bold text-charcoal mb-2">
                {animatedScore}
              </p>
              <p className="text-sm text-grey-500">out of 100</p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.15}>
            <Card className="p-6 lg:p-8 mb-8 bg-white border-grey-100 hover:scale-100">
              <div className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-display font-bold text-white mb-4',
                band.colour
              )}>
                <CheckCircle className="h-4 w-4" />
                {band.label}
              </div>

              <h2 className="font-display text-xl lg:text-2xl font-bold text-charcoal mb-6">
                Dimension Breakdown
              </h2>

              <div className="space-y-5">
                {(Object.keys(DIMENSIONS) as DimensionKey[]).map((key) => {
                  const meta = DIMENSIONS[key];
                  const score = dimensionScores[key];
                  const Icon = meta.icon;

                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-grey-500" />
                          <span className="text-sm font-display font-bold text-charcoal">
                            {meta.label}
                          </span>
                        </div>
                        <span className="text-sm font-display font-bold text-charcoal">
                          {score}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-grey-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{
                            duration: MOTION.duration.slow,
                            ease: MOTION.ease.out,
                            delay: 0.3,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </FadeInOnScroll>

          {submitError && (
            <FadeInOnScroll delay={0.2}>
              <p className="text-sm text-error text-center mb-6">{submitError}</p>
            </FadeInOnScroll>
          )}

          <FadeInOnScroll delay={0.25}>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/brand-report"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                Get your Brand Report
              </Link>
              <Link
                href="/start"
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
              >
                Book a free call
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </Section>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Render: Questions                                                */
  /* ---------------------------------------------------------------- */

  if (!currentQuestion) return null;

  return (
    <Section id="quiz">
      <div className="mx-auto max-w-2xl">
        <ProgressBar
          value={progress}
          label={`Question ${currentIndex + 1} of ${QUESTIONS.length}`}
          className="mb-8"
        />

        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={currentQuestion.id}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: MOTION.duration.normal,
              ease: MOTION.ease.out,
            }}
          >
            <p className="text-xs font-display font-bold text-grey-400 uppercase tracking-wider mb-3">
              {DIMENSIONS[currentQuestion.dimension].label}
            </p>

            <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-8">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleSelectOption(index)}
                  className={cn(
                    'w-full text-left p-4 rounded-lg border transition-all duration-150',
                    'hover:border-accent hover:bg-accent-subtle/50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                    selectedOption === index
                      ? 'border-accent bg-accent-subtle/50'
                      : 'border-grey-100 bg-white'
                  )}
                >
                  <span className="text-sm text-charcoal">{option.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              {currentIndex > 0 ? (
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                variant="primary"
                size="lg"
                disabled={selectedOption === null}
                onClick={handleNext}
              >
                {currentIndex + 1 >= QUESTIONS.length ? 'See my score' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
