import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getOpenAI } from '@/lib/openai';
import { nameGeneratorLimiter } from '@/lib/rate-limit';

const nameGeneratorSchema = z.object({
  industry: z.string().min(1).max(50),
  keywords: z.array(z.string().max(50)).min(1).max(3),
  personality: z.array(z.string().max(30)).min(1).max(7),
  market: z.string().max(50).optional(),
});

const SYSTEM_PROMPT = `You are a professional brand naming consultant. Given the user's industry, keywords, and personality traits, generate exactly 10 creative, memorable, and domain-friendly brand names. For each name, provide: the name, type (abstract/descriptive/portmanteau/metaphorical/invented), and a one-sentence rationale. Return ONLY a valid JSON array with no markdown or preamble. Example format: [{"name": "Example", "type": "abstract", "rationale": "Reason why this works."}]`;

interface GeneratedName {
  name: string;
  type: string;
  rationale: string;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const { success } = await nameGeneratorLimiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "You've reached your free limit for today. Try again tomorrow." },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const result = nameGeneratorSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { industry, keywords, personality } = result.data;

    // Sanitize inputs before sending to LLM
    const sanitizedKeywords = keywords.map(k =>
      k.replace(/<[^>]*>/g, '').slice(0, 50).trim()
    );

    const completion = await getOpenAI().chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Industry: ${industry}\nKeywords: ${sanitizedKeywords.join(', ')}\nPersonality: ${personality.join(', ')}`,
        },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI', message: 'Please try again.' },
        { status: 502 }
      );
    }

    // Parse the JSON response
    let names: GeneratedName[];
    try {
      names = JSON.parse(content) as GeneratedName[];
    } catch {
      console.error('[Name Generator] Failed to parse AI response:', content);
      return NextResponse.json(
        { error: 'Invalid AI response', message: 'Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ names }, { status: 200 });
  } catch (error) {
    console.error('[Name Generator] Failed to generate:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Failed to generate names', message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
