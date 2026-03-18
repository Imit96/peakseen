'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { submitBrandReport } from '@/app/brand-report/actions';

interface FormErrors {
  fullName?: string;
  email?: string;
  businessName?: string;
}

export function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState('');
  const [hasWebsite, setHasWebsite] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function validate(formData: FormData): FormErrors {
    const errs: FormErrors = {};
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const businessName = formData.get('businessName') as string;

    if (!fullName || fullName.length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!businessName || businessName.length < 2) {
      errs.businessName = 'Business name must be at least 2 characters';
    }

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
    setGeneralError('');
    setIsSubmitting(true);

    try {
      const result = await submitBrandReport(formData);
      if (result.success) {
        setIsSuccess(true);
        setToast({ message: 'Your report is on the way!', type: 'success' });
      } else {
        setGeneralError(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setGeneralError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="bg-success-light rounded-lg p-8">
          <h3 className="font-display text-2xl font-bold text-charcoal">
            Your report is on the way.
          </h3>
          <p className="text-grey-600 mt-2">
            We&apos;ve received your details and are preparing your
            personalised Brand Report. Expect it in your inbox within 24
            hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      {/* Full name */}
      <div>
        <label
          htmlFor="fullName"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Full name
        </label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Adaeze Okonkwo"
          required
          error={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="text-sm text-error mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          error={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-error mt-1">{errors.email}</p>
        )}
      </div>

      {/* Business name */}
      <div>
        <label
          htmlFor="businessName"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Business name
        </label>
        <Input
          id="businessName"
          name="businessName"
          placeholder="Acme Studio"
          required
          error={!!errors.businessName}
        />
        {errors.businessName && (
          <p className="text-sm text-error mt-1">{errors.businessName}</p>
        )}
      </div>

      {/* Industry */}
      <div>
        <label
          htmlFor="industry"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Industry
        </label>
        <Select id="industry" name="industry">
          <option value="">Select your industry</option>
          <option value="tech">Tech</option>
          <option value="fashion">Fashion</option>
          <option value="food-beverage">Food &amp; Beverage</option>
          <option value="health">Health</option>
          <option value="finance">Finance</option>
          <option value="education">Education</option>
          <option value="creative">Creative</option>
          <option value="other">Other</option>
        </Select>
      </div>

      {/* Business stage */}
      <div>
        <label
          htmlFor="businessStage"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Business stage
        </label>
        <Select id="businessStage" name="businessStage">
          <option value="">Select your stage</option>
          <option value="idea">Idea</option>
          <option value="early-startup">Early Startup</option>
          <option value="growing">Growing Business</option>
          <option value="established">Established Company</option>
        </Select>
      </div>

      {/* Target audience */}
      <div>
        <label
          htmlFor="targetAudience"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Target audience{' '}
          <span className="text-grey-400 font-normal">(optional)</span>
        </label>
        <Textarea
          id="targetAudience"
          name="targetAudience"
          placeholder="e.g. Young professionals aged 25-35 in Lagos who..."
          maxLength={300}
        />
      </div>

      {/* Biggest challenge */}
      <div>
        <label
          htmlFor="biggestChallenge"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Biggest branding challenge
        </label>
        <Select id="biggestChallenge" name="biggestChallenge">
          <option value="">Select a challenge</option>
          <option value="no-identity">No identity yet</option>
          <option value="inconsistent">Inconsistent branding</option>
          <option value="poor-website">Poor website</option>
          <option value="wrong-audience">Not reaching right audience</option>
          <option value="other">Other</option>
        </Select>
      </div>

      {/* Has logo */}
      <div>
        <label
          htmlFor="hasLogo"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Do you have a logo?
        </label>
        <Select id="hasLogo" name="hasLogo">
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="kind-of">Kind of</option>
        </Select>
      </div>

      {/* Has website */}
      <div>
        <label
          htmlFor="hasWebsite"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          Do you have a website?
        </label>
        <Select
          id="hasWebsite"
          name="hasWebsite"
          value={hasWebsite}
          onChange={(e) => setHasWebsite(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="in-progress">In progress</option>
        </Select>
      </div>

      {/* Website URL — conditional */}
      {hasWebsite === 'yes' && (
        <div>
          <label
            htmlFor="websiteUrl"
            className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
          >
            Website URL
          </label>
          <Input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            placeholder="https://yourbrand.com"
          />
        </div>
      )}

      {/* Success vision */}
      <div>
        <label
          htmlFor="successVision"
          className="font-display text-sm font-medium tracking-[0.02em] text-charcoal mb-2 block"
        >
          What does success look like for your brand?{' '}
          <span className="text-grey-400 font-normal">(optional)</span>
        </label>
        <Textarea
          id="successVision"
          name="successVision"
          placeholder="e.g. Being the go-to brand for..."
          maxLength={500}
        />
      </div>

      {/* Marketing consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consentMarketing"
          name="consentMarketing"
          className="mt-1 h-4 w-4 rounded border-grey-200 text-accent focus:ring-accent"
        />
        <label htmlFor="consentMarketing" className="text-sm text-grey-500">
          I agree to receive the PeakSeen newsletter and marketing emails.
        </label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        isLoading={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Get My Free Report →'}
      </Button>

      {generalError && (
        <div className="rounded-lg border border-error bg-error-light p-4">
          <p className="text-sm text-error">{generalError}</p>
        </div>
      )}

      <p className="text-sm text-grey-400 mt-2">
        No spam. No sales call unless you want one.
      </p>

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
