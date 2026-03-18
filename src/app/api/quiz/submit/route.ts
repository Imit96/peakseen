import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';
import { createOrUpdateContact } from '@/lib/brevo';
import { quizSubmitLimiter } from '@/lib/rate-limit';
import { QuizResults } from '@/emails/quiz-results';

const quizSubmitSchema = z.object({
  email: z.string().email(),
  name: z.string().max(100).optional(),
  businessName: z.string().max(100).optional(),
  score: z.number().int().min(0).max(100),
  dimensionScores: z.record(z.string(), z.number()),
  answers: z.array(z.object({
    questionId: z.number(),
    selectedOption: z.number(),
  })),
  consentMarketing: z.boolean().optional(),
});

function getScoreBand(score: number): string {
  if (score >= 80) return 'Strong Brand Clarity';
  if (score >= 60) return 'Growing Brand Clarity';
  if (score >= 40) return 'Developing Brand Clarity';
  return 'Early Stage Brand';
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const { success: rateLimitOk } = await quizSubmitLimiter.limit(ip);
    if (!rateLimitOk) {
      return NextResponse.json(
        { error: "You've reached your submission limit. Try again later." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const result = quizSubmitSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const scoreBand = getScoreBand(result.data.score);

    // Save quiz results
    const { error: dbError } = await supabase.from('brand_quiz_results').insert({
      email: result.data.email,
      name: result.data.name || null,
      business_name: result.data.businessName || null,
      score: result.data.score,
      score_band: scoreBand,
      dimension_scores: result.data.dimensionScores,
      answers: result.data.answers,
    });

    if (dbError) {
      console.error('[Quiz Submit] Supabase error:', dbError.message);
    }

    // Save as lead
    const { error: leadError } = await supabase.from('leads').insert({
      email: result.data.email,
      name: result.data.name || null,
      source: 'quiz',
      tool_used: 'brand-clarity-score',
      business_name: result.data.businessName || null,
      consent_marketing: result.data.consentMarketing ?? false,
      tags: ['quiz', scoreBand.toLowerCase().replace(/\s+/g, '-')],
    });

    if (leadError) {
      console.error('[Quiz Submit] Lead save error:', leadError.message);
    }

    // Send results email
    try {
      await resend.emails.send({
        from: 'PeakSeen <hello@peakseen.com>',
        to: result.data.email,
        subject: `Your Brand Clarity Score: ${result.data.score}/100 — PeakSeen`,
        react: QuizResults({ name: result.data.name, score: result.data.score, scoreBand }),
      });
    } catch (emailError) {
      console.error('[Quiz Submit] Email error:', emailError instanceof Error ? emailError.message : 'Unknown');
    }

    // Add to Brevo if consent
    if (result.data.consentMarketing) {
      try {
        await createOrUpdateContact({
          email: result.data.email,
          attributes: {
            ...(result.data.name ? { FIRSTNAME: result.data.name } : {}),
            SOURCE: 'quiz',
            QUIZ_SCORE: result.data.score,
          },
          listIds: [2],
          updateEnabled: true,
        });
      } catch (brevoError) {
        console.error('[Quiz Submit] Brevo error:', brevoError instanceof Error ? brevoError.message : 'Unknown');
      }
    }

    return NextResponse.json(
      { success: true, message: 'Quiz results saved successfully.', scoreBand },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Quiz Submit] Failed to process:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
