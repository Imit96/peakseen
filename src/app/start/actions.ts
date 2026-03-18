'use server';

import { headers } from 'next/headers';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';
import { createOrUpdateContact } from '@/lib/brevo';
import { onboardingLimiter } from '@/lib/rate-limit';
import { z } from 'zod';

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  return url.length > 0 && !url.includes('your-project') && !url.includes('your_project');
};

const onboardingSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  businessName: z.string().max(100).optional(),
  services: z.array(z.string()).min(1),
  projectDescription: z.string().min(10).max(3000),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  consentMarketing: z.boolean().default(false),
});

export async function submitOnboarding(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? 'unknown';
  const { success: withinLimit } = await onboardingLimiter.limit(ip);

  if (!withinLimit) {
    return { success: false as const, error: 'Too many submissions. Please try again later.' };
  }

  let services: string[] = [];
  try {
    const raw = formData.get('services');
    if (typeof raw === 'string') {
      services = JSON.parse(raw) as string[];
    }
  } catch {
    return { success: false as const, error: 'Invalid services selection.' };
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || undefined,
    businessName: formData.get('businessName') || undefined,
    services,
    projectDescription: formData.get('projectDescription'),
    budget: formData.get('budget'),
    timeline: formData.get('timeline'),
    consentMarketing: formData.get('consentMarketing') === 'true',
  };

  const result = onboardingSchema.safeParse(raw);

  if (!result.success) {
    return { success: false as const, error: 'Please check your form entries and try again.' };
  }

  const { name, email, phone, businessName, services: svcs, projectDescription, budget, timeline, consentMarketing } = result.data;

  try {
    // Save to Supabase only if properly configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = createServerClient();

        // Save to onboarding_submissions
        const { error: dbError } = await supabase.from('onboarding_submissions').insert({
          name,
          email,
          phone: phone || null,
          business_name: businessName || null,
          services_needed: svcs,
          project_description: projectDescription,
          budget_range: budget,
          timeline,
          consent_marketing: consentMarketing,
        });

        if (dbError) {
          console.error('[Onboarding] Supabase error:', dbError.message);
        }

        // Save as lead
        await supabase.from('leads').insert({
          email,
          name,
          source: 'contact',
          business_name: businessName || null,
          tags: ['onboarding', ...svcs],
        });
      } catch (dbErr) {
        console.error('[Onboarding] DB error (skipped):', dbErr instanceof Error ? dbErr.message : 'Unknown');
      }
    } else {
      console.log('[Onboarding] Supabase not configured — skipping DB save.');
    }

    // Send internal notification email to PeakSeen
    try {
      await resend.emails.send({
        from: 'PeakSeen <hello@peakseen.com>',
        to: 'hello@peakseen.com',
        subject: `New project brief from ${name}`,
        html: `
          <h2>New Project Brief</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${businessName ? `<p><strong>Business:</strong> ${businessName}</p>` : ''}
          <p><strong>Services:</strong> ${svcs.join(', ')}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <h3>Project Brief</h3>
          <p>${projectDescription.replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (emailErr) {
      console.error('[Onboarding] Internal notification error:', emailErr instanceof Error ? emailErr.message : 'Unknown');
    }

    // Send acknowledgment email to submitter
    try {
      await resend.emails.send({
        from: 'PeakSeen <hello@peakseen.com>',
        to: email,
        subject: "We've got your brief — PeakSeen",
        html: `
          <p>Hey ${name.split(' ')[0]},</p>
          <p>We've received your project brief and we're reviewing it now. You'll hear from us within 24 hours with a tailored response.</p>
          <p>In the meantime, feel free to explore our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/tools">free brand tools</a>.</p>
          <p>— The PeakSeen Team</p>
        `,
      });
    } catch (emailErr) {
      console.error('[Onboarding] Acknowledgment email error:', emailErr instanceof Error ? emailErr.message : 'Unknown');
    }

    // Add to Brevo
    try {
      await createOrUpdateContact({
        email,
        attributes: {
          FIRSTNAME: name,
          SOURCE: 'onboarding',
          ...(businessName ? { COMPANY: businessName } : {}),
        },
        listIds: [2],
        updateEnabled: true,
      });
    } catch (brevoErr) {
      console.error('[Onboarding] Brevo error:', brevoErr instanceof Error ? brevoErr.message : 'Unknown');
    }

    return { success: true as const };
  } catch (error) {
    console.error('[Onboarding] Failed:', error instanceof Error ? error.message : 'Unknown');
    return { success: false as const, error: 'Something went wrong. Please try again.' };
  }
}
