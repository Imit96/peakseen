import { Link, Text, Section } from '@react-email/components';
import React from 'react';
import { EmailLayout } from './layout';

interface ContactAutoReplyProps {
  name: string;
}

export function ContactAutoReply({ name }: ContactAutoReplyProps) {
  return (
    <EmailLayout preview={`Thanks for reaching out, ${name}!`}>
      <Text style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>
        Thanks for reaching out, {name}!
      </Text>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        We received your message and will get back to you within 24 hours.
      </Text>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        In the meantime, here are some things you might find useful:
      </Text>
      <Section>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; <Link href="https://peakseen.com/tools/brand-clarity-score" style={{ color: '#E66327' }}>Check your Brand Clarity Score</Link> (free, 3 minutes)
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 8px' }}>
          &bull; <Link href="https://peakseen.com/brand-report" style={{ color: '#E66327' }}>Get a free Brand Report</Link>
        </Text>
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.8', margin: '0 0 24px' }}>
          &bull; <Link href="https://peakseen.com/blog" style={{ color: '#E66327' }}>Read our latest insights</Link>
        </Text>
      </Section>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: 0 }}>
        Speak soon,<br />
        The PeakSeen Team
      </Text>
    </EmailLayout>
  );
}
