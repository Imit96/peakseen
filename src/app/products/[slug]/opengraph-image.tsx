import { ImageResponse } from 'next/og';

export const alt = 'PeakSeen Product';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PRODUCTS: Record<string, { name: string; price: string; tagline: string }> = {
  'brand-identity-starter-kit': {
    name: 'Brand Identity Starter Kit',
    price: '$29',
    tagline: 'Everything you need to launch a basic brand identity.',
  },
  'social-media-content-pack': {
    name: 'Social Media Content Pack',
    price: '$19',
    tagline: '30 days of social media templates.',
  },
  'brand-clarity-workbook': {
    name: 'Brand Clarity Workbook',
    price: '$19',
    tagline: 'The questions every founder should answer before designing anything.',
  },
  'complete-brand-starter-bundle': {
    name: 'Complete Brand Starter Bundle',
    price: '$59',
    tagline: 'All three products. One price. Everything you need to start.',
  },
};

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug];

  const title = product?.name || slugToTitle(slug);
  const price = product?.price || '';

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
            PeakSeen Shop
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
            Digital Product
          </div>
          <h1
            style={{
              color: '#F9F8F6',
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          {price && (
            <span style={{ color: '#E66327', fontSize: '36px', fontWeight: 700 }}>
              {price}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#999', fontSize: '16px' }}>
            peakseen.com/products
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
