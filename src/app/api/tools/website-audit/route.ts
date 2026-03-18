import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getOpenAI } from '@/lib/openai';
import { websiteAuditLimiter } from '@/lib/rate-limit';

const auditSchema = z.object({
  url: z
    .string()
    .url('Please enter a valid URL (include https://)')
    .max(500),
});

const SYSTEM_PROMPT = `You are a professional website auditor. Given a website URL, analyse the site based on your training knowledge and return a scored audit across 5 categories. Return ONLY valid JSON with no markdown or preamble.

Format:
{
  "overallScore": <0-100 integer>,
  "summary": "<2-3 sentence overview of the site's brand and web presence>",
  "categories": [
    {
      "name": "<category name>",
      "score": <0-100 integer>,
      "status": "<good|fair|needs-work>",
      "findings": ["<finding 1>", "<finding 2>", "<finding 3>"]
    }
  ]
}

Categories to evaluate (in this order):
1. Brand Clarity — Is the brand purpose, value proposition, and target audience immediately clear?
2. Visual Design — Logo quality, colour palette, typography, visual consistency
3. SEO Basics — Page title, meta description, headings structure, image alt tags
4. Trust Signals — Testimonials, social proof, contact info, SSL, professional copy
5. Conversion Optimisation — Clear CTAs, user journey, above-the-fold messaging

Score guidelines: 80+ = good, 60-79 = fair, below 60 = needs-work. Be honest and specific.`;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const { success } = await websiteAuditLimiter.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "You've reached your free audit limit for today. Try again tomorrow." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const parsed = auditSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors.url?.[0] ?? 'Invalid URL.' },
        { status: 400 }
      );
    }

    const { url } = parsed.data;

    // Sanitize — strip any potential injections in the URL before sending to LLM
    const safeUrl = url.replace(/[<>"']/g, '').slice(0, 200);

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Audit this website: ${safeUrl}` },
      ],
      temperature: 0.4,
      max_tokens: 1200,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No audit response. Please try again.' },
        { status: 502 }
      );
    }

    let auditData: unknown;
    try {
      auditData = JSON.parse(content);
    } catch {
      console.error('[Website Audit] Failed to parse AI response:', content.slice(0, 200));
      return NextResponse.json(
        { error: 'Audit parsing failed. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ audit: auditData }, { status: 200 });
  } catch (error) {
    console.error('[Website Audit] Error:', error instanceof Error ? error.message : 'Unknown');
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
