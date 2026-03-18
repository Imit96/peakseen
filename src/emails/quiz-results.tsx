import { Button, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailLayout } from './layout';

interface QuizResultsProps {
  name?: string;
  score: number;
  scoreBand: string;
}

export function QuizResults({ name, score, scoreBand }: QuizResultsProps) {
  return (
    <EmailLayout preview={`Your Brand Clarity Score: ${score}/100`}>
      <Text style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>
        Your Brand Clarity Score: {score}/100
      </Text>
      {name && (
        <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
          Hi {name},
        </Text>
      )}
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        You scored <strong>{score} out of 100</strong> on the Brand Clarity Score quiz.
      </Text>
      <Section style={{ backgroundColor: '#F9F8F6', borderRadius: '12px', padding: '24px', textAlign: 'center' as const, margin: '24px 0' }}>
        <Text style={{ fontSize: '48px', fontWeight: 900, color: '#E66327', margin: 0 }}>{score}</Text>
        <Text style={{ fontSize: '14px', color: '#6B6B68', margin: '8px 0 0' }}>{scoreBand}</Text>
      </Section>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: '0 0 16px' }}>
        Want a deeper analysis? Get your free Brand Report -- a personalised 6-page PDF with specific recommendations.
      </Text>
      <Section style={{ textAlign: 'center' as const, margin: '32px 0' }}>
        <Button
          href="https://peakseen.com/brand-report"
          style={{ display: 'inline-block', backgroundColor: '#E66327', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px' }}
        >
          Get my free Brand Report &rarr;
        </Button>
      </Section>
      <Text style={{ fontSize: '16px', color: '#4A4A47', lineHeight: '1.6', margin: 0 }}>
        Keep building,<br />
        The PeakSeen Team
      </Text>
    </EmailLayout>
  );
}
