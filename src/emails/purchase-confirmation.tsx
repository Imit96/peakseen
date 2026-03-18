import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import { EmailLayout } from './layout';

interface PurchaseConfirmationProps {
  name?: string | null;
  productName: string;
  total: number;
  currency: string;
  receiptUrl?: string | null;
}

export function PurchaseConfirmation({
  name,
  productName,
  total,
  currency,
  receiptUrl,
}: PurchaseConfirmationProps) {
  const displayName = name ? name.split(' ')[0] : 'there';
  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(total);

  return (
    <Html>
      <Head />
      <Preview>Your purchase is confirmed — {productName}</Preview>
      <Body style={{ backgroundColor: '#F9F8F6', fontFamily: 'Georgia, serif' }}>
        <EmailLayout>
          <Heading
            style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: '28px',
              fontWeight: 700,
              color: '#1A1A1A',
              marginBottom: '8px',
            }}
          >
            Purchase confirmed.
          </Heading>

          <Text style={{ fontSize: '16px', color: '#4A4A4A', lineHeight: '1.6' }}>
            Hey {displayName} — you&apos;re all set.
          </Text>

          <Section
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #EBEBEB',
              padding: '24px',
              margin: '24px 0',
            }}
          >
            <Text style={{ margin: 0, fontSize: '13px', color: '#8C8C8C', fontFamily: 'Helvetica, Arial, sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Your purchase
            </Text>
            <Text style={{ margin: '8px 0 0', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', fontFamily: 'Helvetica, Arial, sans-serif' }}>
              {productName}
            </Text>
            <Hr style={{ borderColor: '#EBEBEB', margin: '16px 0' }} />
            <Text style={{ margin: 0, fontSize: '15px', color: '#4A4A4A', fontFamily: 'Helvetica, Arial, sans-serif' }}>
              Total paid: <strong style={{ color: '#1A1A1A' }}>{formattedTotal}</strong>
            </Text>
          </Section>

          <Text style={{ fontSize: '15px', color: '#4A4A4A', lineHeight: '1.6' }}>
            Your download link is in your Lemon Squeezy receipt. If you have any issues accessing your purchase, reply to this email and we&apos;ll sort it out.
          </Text>

          {receiptUrl && (
            <Container style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button
                href={receiptUrl}
                style={{
                  backgroundColor: '#D95C3C',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '6px',
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: '15px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                View Receipt & Download →
              </Button>
            </Container>
          )}

          <Hr style={{ borderColor: '#EBEBEB', margin: '32px 0 24px' }} />

          <Text style={{ fontSize: '14px', color: '#8C8C8C', lineHeight: '1.6' }}>
            Need help? Reply to this email or reach us at{' '}
            <a href="mailto:hello@peakseen.com" style={{ color: '#D95C3C' }}>
              hello@peakseen.com
            </a>
          </Text>
        </EmailLayout>
      </Body>
    </Html>
  );
}
