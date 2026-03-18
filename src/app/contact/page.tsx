import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { ContactHero } from '@/components/features/contact/contact-hero';
import { ContactForm } from '@/components/features/contact/contact-form';
import { ContactDetails } from '@/components/features/contact/contact-details';
import { ContactFaq } from '@/components/features/contact/contact-faq';

export const metadata: Metadata = {
  title: 'Contact PeakSeen — Start a Brand or Design Project',
  description:
    'Ready to build your brand? Send us a project brief or book a free 30-minute discovery call. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section>
        <ContactForm />
      </Section>
      <ContactDetails />
      <ContactFaq />
    </>
  );
}
