'use server';

import { headers } from 'next/headers';
import { contactFormSchema } from '@/lib/schemas';
import { createServerClient } from '@/lib/supabase-server';
import { resend } from '@/lib/email';
import { createOrUpdateContact } from '@/lib/brevo';
import { contactFormLimiter } from '@/lib/rate-limit';
import { ContactAutoReply } from '@/emails/contact-auto-reply';

export async function submitContactForm(formData: FormData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') ?? 'unknown';
  const { success: withinLimit } = await contactFormLimiter.limit(ip);

  if (!withinLimit) {
    return { success: false as const, error: 'Too many submissions. Please try again later.' };
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    service: formData.get('service'),
    message: formData.get('message'),
    budget: formData.get('budget'),
    referralSource: formData.get('referralSource'),
    consentMarketing: formData.get('consentMarketing') === 'on',
  };

  const result = contactFormSchema.safeParse(raw);

  if (!result.success) {
    return { success: false as const, error: 'Please check your form inputs and try again.' };
  }

  try {
    const supabase = createServerClient();
    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name: result.data.name,
      email: result.data.email,
      company: result.data.company || null,
      service_type: result.data.service || null,
      message: result.data.message,
      budget_range: result.data.budget || null,
      referral_source: result.data.referralSource || null,
      consent_marketing: result.data.consentMarketing,
    });

    if (dbError) {
      console.error('[Contact Form] Supabase error:', dbError.message);
    }

    // Send auto-reply email
    await resend.emails.send({
      from: 'PeakSeen <hello@peakseen.com>',
      to: result.data.email,
      subject: 'Thanks for reaching out — PeakSeen',
      react: ContactAutoReply({ name: result.data.name }),
    });

    // Add to Brevo contact list if consent given
    if (result.data.consentMarketing) {
      try {
        await createOrUpdateContact({
          email: result.data.email,
          attributes: {
            FIRSTNAME: result.data.name,
            SOURCE: 'contact',
            ...(result.data.company ? { COMPANY: result.data.company } : {}),
          },
          listIds: [2],
          updateEnabled: true,
        });
      } catch (brevoError) {
        console.error('[Contact Form] Brevo error:', brevoError instanceof Error ? brevoError.message : 'Unknown');
      }
    }

    return { success: true as const };
  } catch (error) {
    console.error('[Contact Form] Failed to submit:', error instanceof Error ? error.message : 'Unknown error');
    return { success: false as const, error: 'Something went wrong. Please try again later.' };
  }
}
