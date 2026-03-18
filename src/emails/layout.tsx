import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

interface EmailLayoutProps {
  preview?: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      {preview && <Preview>{preview}</Preview>}
      <Body style={{ backgroundColor: '#F9F8F6', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '40px 20px' }}>
        <Container style={{ maxWidth: '560px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }}>
          <Section style={{ backgroundColor: '#1A1A1A', padding: '24px 32px' }}>
            <Text style={{ color: '#F9F8F6', fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em', margin: 0 }}>
              PEAKSEEN
            </Text>
          </Section>
          <Section style={{ padding: '32px' }}>
            {children}
          </Section>
          <Hr style={{ borderColor: '#E5E5E3', margin: 0 }} />
          <Section style={{ padding: '24px 32px', textAlign: 'center' as const }}>
            <Text style={{ color: '#8A8A87', fontSize: '12px', margin: 0 }}>
              &copy; {new Date().getFullYear()} PeakSeen. All rights reserved.
            </Text>
            <Text style={{ color: '#8A8A87', fontSize: '12px', margin: '8px 0 0' }}>
              <Link href="https://peakseen.com/legal/privacy" style={{ color: '#8A8A87' }}>Privacy Policy</Link>
              {' | '}
              <Link href="https://peakseen.com/legal/terms" style={{ color: '#8A8A87' }}>Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
