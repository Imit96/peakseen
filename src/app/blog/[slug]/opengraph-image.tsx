import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/mdx';

export const alt = 'PeakSeen Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title = 'PeakSeen Blog';
  let category = 'Article';

  const post = getBlogPost(slug);
  if (post) {
    title = post.frontmatter.title;
    category = post.frontmatter.category;
  } else {
    title = slugToTitle(slug);
  }

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
            PeakSeen
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
            {category}
          </div>
          <h1
            style={{
              color: '#F9F8F6',
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#999', fontSize: '16px' }}>
            peakseen.com/blog
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
