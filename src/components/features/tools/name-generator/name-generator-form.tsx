'use client';

import { useState } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { Select } from '@/components/ui/select';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Toast } from '@/components/ui/toast';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { cn } from '@/lib/utils';

const industries = [
  'Tech',
  'Fashion',
  'Food & Beverage',
  'Health',
  'Finance',
  'Education',
  'Other',
];

const personalityOptions = [
  'Bold',
  'Calm',
  'Playful',
  'Luxurious',
  'Trustworthy',
  'Innovative',
  'Natural',
];

interface GeneratedName {
  name: string;
  type: string;
  rationale: string;
}

interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
}

interface FormErrors {
  industry?: string;
  keywords?: string;
  personality?: string;
}

function getDomainCheckUrl(name: string): string {
  const sanitised = name.replace(/\s+/g, '').toLowerCase();
  return `https://www.namecheap.com/domains/registration/results/?domain=${encodeURIComponent(sanitised)}`;
}

export function NameGeneratorForm() {
  const [industry, setIndustry] = useState('');
  const [keywords, setKeywords] = useState(['', '', '']);
  const [personalities, setPersonalities] = useState<string[]>([]);

  const [results, setResults] = useState<GeneratedName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [hasGenerated, setHasGenerated] = useState(false);

  // Email gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [email, setEmail] = useState('');
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  function handleKeywordChange(index: number, value: string) {
    setKeywords((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handlePersonalityToggle(personality: string) {
    setPersonalities((prev) =>
      prev.includes(personality)
        ? prev.filter((p) => p !== personality)
        : [...prev, personality]
    );
  }

  function validateForm(): boolean {
    const errors: FormErrors = {};

    if (!industry) {
      errors.industry = 'Please select an industry.';
    }

    const filledKeywords = keywords.filter((k) => k.trim().length > 0);
    if (filledKeywords.length === 0) {
      errors.keywords = 'Please enter at least one keyword.';
    }

    if (personalities.length === 0) {
      errors.personality = 'Please select at least one personality trait.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    setFormErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setResults([]);
    setShowEmailGate(false);

    try {
      const filteredKeywords = keywords
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const response = await fetch('/api/tools/name-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry,
          keywords: filteredKeywords,
          personality: personalities,
        }),
      });

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();

        if (response.status === 429) {
          setErrorMessage(
            errorData.error ||
              "You've reached your free limit for today. Try again tomorrow."
          );
        } else if (response.status === 400) {
          setErrorMessage(
            errorData.error || 'Invalid input. Please check your entries and try again.'
          );
        } else if (response.status === 502) {
          setErrorMessage(
            errorData.message || 'Our AI had trouble generating names. Please try again.'
          );
        } else {
          setErrorMessage(
            errorData.message || 'Something went wrong. Please try again.'
          );
        }

        return;
      }

      const data: { names: GeneratedName[] } = await response.json();
      setResults(data.names);
      setHasGenerated(true);
      setShowEmailGate(true);
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Section>
      <div className="mx-auto max-w-2xl">
        <FadeInOnScroll>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="block font-display text-sm font-bold text-charcoal mb-2"
              >
                Industry
              </label>
              <Select
                id="industry"
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  if (formErrors.industry) {
                    setFormErrors((prev) => ({ ...prev, industry: undefined }));
                  }
                }}
                disabled={isLoading}
                error={!!formErrors.industry}
              >
                <option value="">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </Select>
              {formErrors.industry && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formErrors.industry}
                </p>
              )}
            </div>

            {/* Keywords */}
            <div>
              <p className="block font-display text-sm font-bold text-charcoal mb-2">
                Keywords
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {keywords.map((keyword, index) => (
                  <div key={index}>
                    <label htmlFor={`keyword-${index}`} className="sr-only">
                      Keyword {index + 1}
                    </label>
                    <Input
                      id={`keyword-${index}`}
                      placeholder={`Keyword ${index + 1}`}
                      value={keyword}
                      maxLength={50}
                      disabled={isLoading}
                      error={Boolean(formErrors.keywords)}
                      onChange={(e) => {
                        handleKeywordChange(index, e.target.value);
                        if (formErrors.keywords) {
                          setFormErrors((prev) => ({ ...prev, keywords: undefined }));
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
              {formErrors.keywords && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formErrors.keywords}
                </p>
              )}
            </div>

            {/* Brand Personality */}
            <div>
              <p className="block font-display text-sm font-bold text-charcoal mb-3">
                Brand Personality
              </p>
              <div className="flex flex-wrap gap-2">
                {personalityOptions.map((personality) => {
                  const isSelected = personalities.includes(personality);
                  return (
                    <label
                      key={personality}
                      className={cn(
                        'inline-flex items-center gap-2 cursor-pointer rounded-full border px-4 py-2 text-sm transition-all duration-150',
                        isSelected
                          ? 'border-accent bg-accent-subtle/50 text-accent'
                          : 'border-grey-100 bg-white text-grey-600 hover:border-grey-200',
                        isLoading && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isSelected}
                        disabled={isLoading}
                        onChange={() => {
                          handlePersonalityToggle(personality);
                          if (formErrors.personality) {
                            setFormErrors((prev) => ({
                              ...prev,
                              personality: undefined,
                            }));
                          }
                        }}
                      />
                      {personality}
                    </label>
                  );
                })}
              </div>
              {formErrors.personality && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {formErrors.personality}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Names \u2192'}
            </Button>
          </form>
        </FadeInOnScroll>

        {/* Error State */}
        {errorMessage && !isLoading && (
          <FadeInOnScroll>
            <div className="mt-12 rounded-lg border border-error bg-error-light p-6 text-center">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-error" />
              <p className="font-display text-sm font-bold text-charcoal mb-1">
                Something went wrong
              </p>
              <p className="text-sm text-grey-500">{errorMessage}</p>
            </div>
          </FadeInOnScroll>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="mt-12 space-y-4">
            <Skeleton className="h-7 w-56 mb-6" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="rounded-lg border border-grey-100 bg-grey-50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="h-8 w-36" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="mt-1 h-4 w-3/4" />
                  </div>
                  <Skeleton className="h-9 w-32 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="mt-12 space-y-4">
            <FadeInOnScroll>
              <h2 className="font-display text-xl font-bold text-charcoal mb-6">
                Your Brand Name Ideas
              </h2>
            </FadeInOnScroll>
            {results.map((result, index) => (
              <FadeInOnScroll key={`${result.name}-${index}`} delay={index * 0.05}>
                <Card className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-display text-2xl font-bold text-charcoal">
                          {result.name}
                        </h3>
                        <Badge variant="accent">{result.type}</Badge>
                      </div>
                      <p className="text-sm text-grey-500">{result.rationale}</p>
                    </div>
                    <a
                      href={getDomainCheckUrl(result.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                    >
                      <Button variant="secondary" size="sm" type="button">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Check Domain
                      </Button>
                    </a>
                  </div>
                </Card>
              </FadeInOnScroll>
            ))}

            {/* Email Gate CTA */}
            {showEmailGate && hasGenerated && (
              <FadeInOnScroll delay={results.length * 0.05 + 0.1}>
                <Card className="mt-8 p-6 lg:p-8 text-center">
                  <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                    Save your names and get 5 more
                  </h3>
                  <p className="text-sm text-grey-500 mb-6">
                    Enter your email to save these results and unlock 5 additional
                    name suggestions.
                  </p>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!email.trim()) return;
                      setEmailSubmitting(true);
                      try {
                        const res = await fetch('/api/tools/name-generator', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            industry,
                            keywords: keywords.filter((k) => k.trim().length > 0),
                            personality: personalities,
                            email,
                            consentMarketing,
                          }),
                        });
                        if (res.ok) {
                          const data: { names: GeneratedName[] } = await res.json();
                          setResults((prev) => [...prev, ...data.names]);
                          setShowEmailGate(false);
                          setToast({ message: 'Your names have been saved and 5 more added!', type: 'success' });
                        } else {
                          const errData: ApiErrorResponse = await res.json();
                          setToast({ message: errData.error || 'Could not save. Please try again.', type: 'error' });
                        }
                      } catch {
                        setToast({ message: 'Network error. Please try again.', type: 'error' });
                      } finally {
                        setEmailSubmitting(false);
                      }
                    }}
                    className="mx-auto max-w-md space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <label htmlFor="email-gate" className="sr-only">
                        Email address
                      </label>
                      <Input
                        id="email-gate"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        disabled={emailSubmitting}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" variant="primary" size="md" isLoading={emailSubmitting} disabled={emailSubmitting}>
                        {emailSubmitting ? 'Saving...' : 'Get 5 More Names'}
                      </Button>
                    </div>
                    <div className="flex items-start gap-3 text-left">
                      <input
                        type="checkbox"
                        id="name-gen-consent"
                        checked={consentMarketing}
                        onChange={(e) => setConsentMarketing(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-grey-200 text-accent focus:ring-accent"
                      />
                      <label htmlFor="name-gen-consent" className="text-sm text-grey-500">
                        I agree to receive the PeakSeen newsletter and marketing emails.
                      </label>
                    </div>
                  </form>
                </Card>
              </FadeInOnScroll>
            )}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Section>
  );
}
