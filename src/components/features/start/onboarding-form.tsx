'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Toast } from '@/components/ui/toast';
import { submitOnboarding } from '@/app/start/actions';
import { cn } from '@/lib/utils';
import { MOTION } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SERVICES = [
  { id: 'brand-identity', label: 'Brand Identity & Logo' },
  { id: 'website', label: 'Website Design & Development' },
  { id: 'strategy', label: 'Brand Strategy & Growth' },
  { id: 'software', label: 'Custom Software / App' },
  { id: 'digital-product', label: 'Digital Product' },
  { id: 'full-stack', label: 'Full Brand + Build (Business-in-a-Box)' },
];

const BUDGET_OPTIONS = [
  { value: 'under-500', label: 'Under $500' },
  { value: '500-2000', label: '$500 – $2,000' },
  { value: '2000-5000', label: '$2,000 – $5,000' },
  { value: '5000-plus', label: '$5,000+' },
  { value: 'discuss', label: "Let's discuss" },
];

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-plus-months', label: '3+ months' },
  { value: 'flexible', label: "I'm flexible" },
];

const TOTAL_STEPS = 4;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  services: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  consentMarketing: boolean;
}

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<FormData>({
    services: [],
    projectDescription: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    businessName: '',
    consentMarketing: false,
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  }

  function toggleService(id: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  }

  function validateStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 1 && form.services.length === 0) {
      errs.services = 'Please select at least one service.';
    }
    if (step === 2 && form.projectDescription.trim().length < 20) {
      errs.projectDescription = 'Please tell us a bit more (at least 20 characters).';
    }
    if (step === 3) {
      if (!form.budget) errs.budget = 'Please select a budget range.';
      if (!form.timeline) errs.timeline = 'Please select a timeline.';
    }
    if (step === 4) {
      if (!form.name.trim()) errs.name = 'Name is required.';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errs.email = 'Please enter a valid email.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS) {
      setDir(1);
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  }

  async function handleSubmit() {
    if (!validateStep()) return;
    setIsSubmitting(true);

    const data = new FormData();
    data.set('services', JSON.stringify(form.services));
    data.set('projectDescription', form.projectDescription);
    data.set('budget', form.budget);
    data.set('timeline', form.timeline);
    data.set('name', form.name);
    data.set('email', form.email);
    data.set('phone', form.phone);
    data.set('businessName', form.businessName);
    data.set('consentMarketing', form.consentMarketing.toString());

    try {
      const result = await submitOnboarding(data);
      if (result.success) {
        setIsSuccess(true);
      } else {
        setToast({ message: result.error || 'Something went wrong.', type: 'error' });
      }
    } catch {
      setToast({ message: 'Network error. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }

  /* --- Success State --- */
  if (isSuccess) {
    return (
      <div className="mx-auto max-w-xl text-center py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-light mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
          Brief received!
        </h2>
        <p className="font-body text-lg text-grey-600">
          We&apos;ve got your project details. Expect a tailored response in your inbox within 24 hours.
        </p>
      </div>
    );
  }

  const progress = ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto max-w-xl">
      <ProgressBar
        value={progress}
        label={`Step ${step} of ${TOTAL_STEPS}`}
        className="mb-10"
      />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: MOTION.duration.normal, ease: MOTION.ease.out }}
        >
          {/* ── Step 1: Services ── */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-2">
                What do you need?
              </h2>
              <p className="text-grey-500 mb-8">Select everything that applies.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => {
                  const isSelected = form.services.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        'rounded-lg border p-4 text-left text-sm transition-all duration-150',
                        'hover:border-accent hover:bg-accent-subtle/30',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                        isSelected
                          ? 'border-accent bg-accent-subtle/30 font-medium text-charcoal'
                          : 'border-grey-100 bg-white text-grey-600'
                      )}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {errors.services && (
                <p className="mt-3 text-sm text-error">{errors.services}</p>
              )}
            </div>
          )}

          {/* ── Step 2: Project Brief ── */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-2">
                Tell us about your project
              </h2>
              <p className="text-grey-500 mb-8">
                Who are you, what do you do, and what do you want to achieve?
              </p>
              <Textarea
                id="project-description"
                name="projectDescription"
                rows={7}
                placeholder="We're a fintech startup launching in Q3. We need a full brand identity including logo, website, and social media presence..."
                value={form.projectDescription}
                onChange={(e) => update('projectDescription', e.target.value)}
                error={!!errors.projectDescription}
              />
              {errors.projectDescription && (
                <p className="mt-2 text-sm text-error">{errors.projectDescription}</p>
              )}
            </div>
          )}

          {/* ── Step 3: Budget & Timeline ── */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-2">
                  Budget & timeline
                </h2>
                <p className="text-grey-500 mb-8">
                  Helps us recommend the right package.
                </p>
              </div>
              <div>
                <label htmlFor="budget" className="block font-display text-sm font-bold text-charcoal mb-2">
                  Budget range
                </label>
                <Select
                  id="budget"
                  value={form.budget}
                  onChange={(e) => update('budget', e.target.value)}
                  error={!!errors.budget}
                >
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
                {errors.budget && <p className="mt-1 text-sm text-error">{errors.budget}</p>}
              </div>
              <div>
                <label htmlFor="timeline" className="block font-display text-sm font-bold text-charcoal mb-2">
                  When do you need this done?
                </label>
                <Select
                  id="timeline"
                  value={form.timeline}
                  onChange={(e) => update('timeline', e.target.value)}
                  error={!!errors.timeline}
                >
                  <option value="">Select a timeline</option>
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
                {errors.timeline && <p className="mt-1 text-sm text-error">{errors.timeline}</p>}
              </div>
            </div>
          )}

          {/* ── Step 4: Contact Info ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal mb-2">
                  Almost there
                </h2>
                <p className="text-grey-500 mb-8">
                  Where should we send your tailored proposal?
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block font-display text-sm font-bold text-charcoal mb-2">
                    Your name <span className="text-error">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Adaeze Okonkwo"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    error={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-display text-sm font-bold text-charcoal mb-2">
                    Email address <span className="text-error">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    error={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="businessName" className="block font-display text-sm font-bold text-charcoal mb-2">
                    Business name <span className="text-grey-400 font-normal">(optional)</span>
                  </label>
                  <Input
                    id="businessName"
                    placeholder="Acme Studio"
                    value={form.businessName}
                    onChange={(e) => update('businessName', e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block font-display text-sm font-bold text-charcoal mb-2">
                    Phone <span className="text-grey-400 font-normal">(optional)</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-start gap-3 mt-4">
                <div className="flex h-5 items-center">
                  <input
                    type="checkbox"
                    id="onboarding-consent"
                    name="consentMarketing"
                    checked={form.consentMarketing}
                    onChange={(e) => update('consentMarketing', e.target.checked)}
                    className="h-4 w-4 rounded border-grey-300 text-accent focus:ring-accent"
                  />
                </div>
                <label htmlFor="onboarding-consent" className="text-sm text-grey-500">
                  I agree to receive the PeakSeen newsletter and marketing emails.
                </label>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        {step > 1 ? (
          <Button variant="ghost" size="md" onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <Button variant="primary" size="lg" onClick={goNext}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="primary" size="lg" isLoading={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Sending...' : 'Send my brief →'}
          </Button>
        )}
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
