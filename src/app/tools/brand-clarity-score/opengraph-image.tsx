import { ImageResponse } from 'next/og';

export const alt = 'Brand Clarity Score — Free Brand Assessment Tool | PeakSeen';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#1A1A1A',
          padding: '60px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              backgroundColor: '#E66327',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            P
          </div>
          <span style={{ color: '#F9F8F6', fontSize: '20px', fontWeight: 600 }}>
            PeakSeen Tools
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#E66327',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '100px',
              fontSize: '16px',
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            Free Tool
          </div>
          <h1
            style={{
              color: '#F9F8F6',
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            Brand Clarity Score
          </h1>
          <p style={{ color: '#999', fontSize: '24px', maxWidth: '700px' }}>
            Score your brand across 5 dimensions in 3 minutes. Get a personalised action plan.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#999', fontSize: '16px' }}>
            peakseen.com/tools/brand-clarity-score
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
