import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  referralSource: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consentMarketing: z.boolean(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  consentMarketing: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to receive marketing emails' }),
  }),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export const brandReportSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(1, 'Business name is required').max(100),
  industry: z.string().min(1, 'Please select an industry'),
  businessStage: z.string().min(1, 'Please select your business stage'),
  targetAudience: z.string().max(300).optional(),
  biggestChallenge: z.string().optional(),
  hasLogo: z.string().optional(),
  hasWebsite: z.string().optional(),
  websiteUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  successVision: z.string().max(500).optional(),
  consent: z.boolean(),
});

export type BrandReportData = z.infer<typeof brandReportSchema>;
