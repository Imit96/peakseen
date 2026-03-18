import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export const metadata: Metadata = {
  title: 'Privacy Policy — PeakSeen',
  description:
    'How PeakSeen collects, uses, and protects your data. NDPR and GDPR compliant.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInOnScroll>
            <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
              Privacy Policy
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="mx-auto max-w-prose">
          <FadeInOnScroll>
            <p className="text-sm text-grey-400 mb-8">
              Last updated: March 2026
            </p>

            <div className="space-y-10 text-grey-600 font-body text-base leading-relaxed">
              {/* What data we collect */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  1. What Data We Collect
                </h2>
                <p>
                  We collect information you voluntarily provide when using our
                  website, tools, and services. This includes:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    Personal information such as your name, email address,
                    business name, and website URL when you fill out forms on our
                    site (contact form, brand report request, newsletter signup,
                    onboarding form).
                  </li>
                  <li>
                    Responses and inputs provided through our interactive tools,
                    including the Brand Clarity Score quiz, Brand Name Generator,
                    and Colour Palette Generator.
                  </li>
                  <li>
                    Technical data collected automatically, including IP address,
                    browser type, device information, and pages visited, through
                    Vercel Analytics.
                  </li>
                  <li>
                    Purchase information processed through Lemon Squeezy,
                    including order details and payment confirmation (we do not
                    store credit card information directly).
                  </li>
                </ul>
              </div>

              {/* Why we collect it */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  2. Why We Collect It
                </h2>
                <p>We use the data we collect to:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Deliver the services, reports, and tools you request.</li>
                  <li>
                    Respond to your enquiries and project briefs within 24
                    hours.
                  </li>
                  <li>
                    Send transactional emails (confirmations, reports, receipts)
                    and, where you have given consent, marketing communications
                    such as our newsletter.
                  </li>
                  <li>
                    Improve our website, tools, and services through anonymised
                    usage analytics.
                  </li>
                  <li>
                    Fulfil digital product orders and provide download access.
                  </li>
                </ul>
              </div>

              {/* How we store it */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  3. How We Store Your Data
                </h2>
                <p>
                  Your data is stored securely in a Supabase-hosted PostgreSQL
                  database with encryption at rest and in transit. Access to the
                  database is restricted to authorised personnel only, using
                  service-role keys that are never exposed to the browser.
                </p>
                <p className="mt-3">
                  We implement industry-standard security practices including
                  HTTPS encryption across the entire site, environment variable
                  management for all secrets, and rate limiting on public-facing
                  endpoints to prevent abuse.
                </p>
              </div>

              {/* Third parties */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  4. Third-Party Services
                </h2>
                <p>
                  We share data with the following third-party services, each of
                  which has its own privacy policy:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Brevo</strong> — for email marketing, newsletters,
                    and automated sequences. Contact data (name, email, tags) is
                    synced to Brevo when you opt in to marketing communications.
                  </li>
                  <li>
                    <strong>Resend</strong> — for transactional emails
                    (confirmations, report delivery, auto-replies). Only the
                    data necessary to send the email is shared.
                  </li>
                  <li>
                    <strong>OpenAI</strong> — for AI-powered features such as
                    the Brand Name Generator. Inputs you provide to these tools
                    are sent to OpenAI for processing. We sanitise all inputs
                    before transmission. See Section 8 for more details.
                  </li>
                  <li>
                    <strong>Lemon Squeezy</strong> — for digital product
                    purchases and payment processing. Lemon Squeezy handles all
                    payment data directly; we receive only order confirmations
                    via webhooks.
                  </li>
                  <li>
                    <strong>Vercel</strong> — for website hosting and analytics.
                    Vercel Analytics collects anonymised, privacy-friendly usage
                    data with no personally identifiable information.
                  </li>
                </ul>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  5. Cookies
                </h2>
                <p>
                  We use minimal cookies on our website. Vercel Analytics uses a
                  privacy-friendly, cookie-less approach by default. Our cookie
                  banner gates any additional tracking scripts and only activates
                  them after you provide consent.
                </p>
                <p className="mt-3">
                  We do not use third-party advertising cookies or tracking
                  pixels.
                </p>
              </div>

              {/* Data retention */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  6. Data Retention
                </h2>
                <p>
                  We retain your personal data for a maximum of 24 months from
                  the date of collection, unless a longer retention period is
                  required by law or necessary for an ongoing business
                  relationship. After 24 months, data is anonymised or securely
                  deleted.
                </p>
              </div>

              {/* Your rights */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  7. Your Rights
                </h2>
                <p>
                  In accordance with the Nigeria Data Protection Regulation
                  (NDPR) and the General Data Protection Regulation (GDPR), you
                  have the right to:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    <strong>Access</strong> — request a copy of the personal
                    data we hold about you.
                  </li>
                  <li>
                    <strong>Rectification</strong> — request corrections to any
                    inaccurate or incomplete data.
                  </li>
                  <li>
                    <strong>Deletion</strong> — request that we delete your
                    personal data, subject to any legal obligations that require
                    us to retain it.
                  </li>
                  <li>
                    <strong>Withdraw consent</strong> — unsubscribe from
                    marketing emails at any time using the link in any email, or
                    by contacting us directly.
                  </li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at{' '}
                  <a
                    href="mailto:hello@peakseen.com"
                    className="text-accent hover:underline"
                  >
                    hello@peakseen.com
                  </a>
                  . We will respond within 30 days.
                </p>
              </div>

              {/* OpenAI disclosure */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  8. AI-Powered Features Disclosure
                </h2>
                <p>
                  Certain features on our website, such as the Brand Name
                  Generator, use OpenAI&apos;s API to generate content based on
                  your inputs. When you use these tools:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>
                    Your inputs are sanitised (HTML tags stripped, character
                    limits enforced) before being sent to OpenAI.
                  </li>
                  <li>
                    We do not send your email address or other personal
                    identifiers to OpenAI.
                  </li>
                  <li>
                    OpenAI processes data in accordance with its own data usage
                    policies. We use the API in a configuration that does not
                    allow OpenAI to train on your inputs.
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h2 className="font-display text-xl font-bold text-charcoal mb-4">
                  9. Contact
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or how we
                  handle your data, please contact us at:
                </p>
                <p className="mt-3">
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:hello@peakseen.com"
                    className="text-accent hover:underline"
                  >
                    hello@peakseen.com
                  </a>
                </p>
                <p className="mt-1">
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://peakseen.com"
                    className="text-accent hover:underline"
                  >
                    peakseen.com
                  </a>
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </Section>
    </>
  );
}
