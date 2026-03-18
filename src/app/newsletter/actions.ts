'use server';

import { newsletterSchema } from '@/lib/schemas';
import { createServerClient } from '@/lib/supabase-server';
import { createOrUpdateContact } from '@/lib/brevo';

export async function subscribeNewsletter(formData: FormData) {
  const raw = {
    email: formData.get('email'),
    consentMarketing: formData.get('consentMarketing') === 'on',
  };

  const result = newsletterSchema.safeParse(raw);

  if (!result.success) {
    const issues = result.error.flatten().fieldErrors;
    if (issues.consentMarketing) {
      return { success: false as const, error: 'Please agree to receive marketing emails.' };
    }
    return { success: false as const, error: 'Please enter a valid email address.' };
  }

  try {
    const supabase = createServerClient();
    await supabase.from('leads').insert({
      email: result.data.email,
      source: 'newsletter',
      consent_marketing: result.data.consentMarketing,
    });

    // Add to Brevo for marketing emails
    try {
      await createOrUpdateContact({
        email: result.data.email,
        attributes: {
          SOURCE: 'newsletter',
        },
        listIds: [2],
        updateEnabled: true,
      });
    } catch (brevoError) {
      console.error('[Newsletter] Brevo error:', brevoError instanceof Error ? brevoError.message : 'Unknown');
    }

    return { success: true as const };
  } catch (error) {
    console.error('[Newsletter] Failed to subscribe:', error instanceof Error ? error.message : 'Unknown error');
    return { success: false as const, error: 'Something went wrong. Please try again.' };
  }
}
