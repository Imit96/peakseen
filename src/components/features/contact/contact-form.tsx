'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { submitContactForm } from '@/app/contact/actions';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function validate(formData: FormData): FormErrors {
    const errs: FormErrors = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = 'Please enter a valid email address';
    if (!message || message.length < 10)
      errs.message = 'Message must be at least 10 characters';

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setIsSuccess(true);
        setToast({ message: 'Brief sent! We\'ll respond within 24 hours.', type: 'success' });
      } else {
        setErrors({ message: result.error });
      }
    } catch {
      setErrors({ message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="bg-success-light rounded-lg p-8">
          <h3 className="font-display text-2xl font-bold text-charcoal">
            Brief sent!
          </h3>
          <p className="text-grey-600 mt-2">
            We&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
            Your name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Adaeze Okonkwo"
            required
            error={!!errors.name}
          />
          {errors.name && <p className="text-sm text-error mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
            Your email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            error={!!errors.email}
          />
          {errors.email && <p className="text-sm text-error mt-1">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
          Company or brand name
        </label>
        <Input id="company" name="company" placeholder="Optional" />
      </div>

      <div>
        <label htmlFor="service" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
          What do you need help with?
        </label>
        <Select id="service" name="service">
          <option value="">Select a service</option>
          <option value="brand-identity">Brand Identity</option>
          <option value="website">Website</option>
          <option value="strategy">Strategy</option>
          <option value="software">Software</option>
          <option value="digital-product">Digital Product</option>
          <option value="not-sure">Not sure yet</option>
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
          Tell us about your project
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="We're a fintech startup looking to..."
          required
          minLength={10}
          error={!!errors.message}
        />
        {errors.message && <p className="text-sm text-error mt-1">{errors.message}</p>}
      </div>

      <div>
        <label htmlFor="budget" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
          What&apos;s your budget range?
        </label>
        <Select id="budget" name="budget">
          <option value="">Select a range</option>
          <option value="under-500">Under $500</option>
          <option value="500-2000">$500–$2,000</option>
          <option value="2000-5000">$2,000–$5,000</option>
          <option value="5000-plus">$5,000+</option>
          <option value="discuss">Let&apos;s discuss</option>
        </Select>
      </div>

      <div>
        <label htmlFor="referralSource" className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block">
          How did you hear about PeakSeen?
        </label>
        <Select id="referralSource" name="referralSource">
          <option value="">Select an option</option>
          <option value="google">Google Search</option>
          <option value="social-media">Social Media</option>
          <option value="referral">Referral / Word of Mouth</option>
          <option value="blog">Blog Post</option>
          <option value="tool">Free Tool</option>
          <option value="other">Other</option>
        </Select>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consentMarketing"
          className="mt-1 h-4 w-4 rounded border-grey-200 text-accent focus:ring-accent"
        />
        <label htmlFor="consent" className="text-sm text-grey-500">
          I agree to receive the PeakSeen newsletter and marketing emails.
        </label>
      </div>

      <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Sending...' : 'Send Brief →'}
      </Button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </form>
  );
}
