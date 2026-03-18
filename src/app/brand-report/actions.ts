'use server';

import { headers } from 'next/headers';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';
import { createOrUpdateContact } from '@/lib/brevo';
import { reportFormLimiter } from '@/lib/rate-limit';
import { brandReportSchema } from '@/lib/schemas';
import { ReportConfirmation } from '@/emails/report-confirmation';

export async function submitBrandReport(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? 'unknown';
  const { success: withinLimit } = await reportFormLimiter.limit(ip);

  if (!withinLimit) {
    return { success: false as const, error: 'Too many submissions. Please try again later.' };
  }
  const raw = {
    name: formData.get('fullName'),
    email: formData.get('email'),
    businessName: formData.get('businessName'),
    industry: formData.get('industry'),
    businessStage: formData.get('businessStage'),
    targetAudience: formData.get('targetAudience') || undefined,
    biggestChallenge: formData.get('biggestChallenge') || undefined,
    hasLogo: formData.get('hasLogo') || undefined,
    hasWebsite: formData.get('hasWebsite') || undefined,
    websiteUrl: formData.get('websiteUrl') || undefined,
    successVision: formData.get('successVision') || undefined,
    consent: formData.get('consentMarketing') === 'on',
  };

  const result = brandReportSchema.safeParse(raw);

  if (!result.success) {
    return { success: false as const, error: 'Please check your form inputs and try again.' };
  }

  try {
    const supabase = createServerClient();

    // Save to leads table
    const { error: dbError } = await supabase.from('leads').insert({
      email: result.data.email,
      name: result.data.name,
      source: 'report',
      business_name: result.data.businessName,
      consent_marketing: result.data.consent,
      tags: ['brand-report'],
    });

    if (dbError) {
      console.error('[Brand Report] Supabase error:', dbError.message);
    }

    // Save report request details
    const { error: reportError } = await supabase.from('brand_report_requests').insert({
      email: result.data.email,
      full_name: result.data.name,
      business_name: result.data.businessName,
      industry: result.data.industry,
      business_stage: result.data.businessStage,
      target_audience: result.data.targetAudience || null,
      biggest_challenge: result.data.biggestChallenge || null,
      has_logo: result.data.hasLogo?.replace('-', '_') || null,
      has_website: result.data.hasWebsite?.replace('-', '_') || null,
      website_url: result.data.websiteUrl || null,
      success_vision: result.data.successVision || null,
      consent_marketing: result.data.consent,
    });

    if (reportError) {
      console.error('[Brand Report] Report save error:', reportError.message);
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'PeakSeen <hello@peakseen.com>',
      to: result.data.email,
      subject: 'Your Brand Report is being prepared — PeakSeen',
      react: ReportConfirmation({ name: result.data.name, businessName: result.data.businessName }),
    });

    // Add to Brevo for follow-up sequence
    if (result.data.consent) {
      try {
        await createOrUpdateContact({
          email: result.data.email,
          attributes: {
            FIRSTNAME: result.data.name,
            SOURCE: 'report',
            COMPANY: result.data.businessName,
          },
          listIds: [2],
          updateEnabled: true,
        });
      } catch (brevoError) {
        console.error('[Brand Report] Brevo error:', brevoError instanceof Error ? brevoError.message : 'Unknown');
      }
    }

    return { success: true as const };
  } catch (error) {
    console.error('[Brand Report] Failed to submit:', error instanceof Error ? error.message : 'Unknown error');
    return { success: false as const, error: 'Something went wrong. Please try again later.' };
  }
}
