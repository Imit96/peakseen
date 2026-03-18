import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailLayout } from './layout';

interface ReportConfirmationProps {
  name: string;
  businessName: string;
}

export function ReportConfirmation({ name, businessName }: ReportConfirmationProps) {
  return (
    <EmailLayout preview={`Your Brand Report for ${businessName} is being prepared`}>
      <Text style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>
        Your Brand Report is being prepared
      </Text>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        Hi {name}, thanks for requesting a Brand Report for <strong>{businessName}</strong>.
      </Text>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        Our team is reviewing your details and preparing your personalised 6-page report. Expect it in your inbox within <strong>24 hours</strong>.
      </Text>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        Your report will include:
      </Text>
      <Section>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; Brand Health Score across 5 dimensions
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; Purpose &amp; Positioning Analysis
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; Visual Identity Assessment
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; Digital Presence Review
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 24px' }}>
          &bull; Top 5 Action Steps
        </Text>
      </Section>
      <Section style={{ textAlign: 'center' as const, margin: '32px 0' }}>
        <Button
          href="https://peakseen.com/contact"
          style={{ display: 'inline-block', backgroundColor: '#E66327', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}
        >
          Book a free call to discuss your report &rarr;
        </Button>
      </Section>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: 0 }}>
        Thanks for trusting us with your brand,<br />
        The PeakSeen Team
      </Text>
    </EmailLayout>
  );
}
