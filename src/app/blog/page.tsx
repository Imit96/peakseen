import type { Metadata } from 'next';
import { BlogHero } from '@/components/features/blog/blog-hero';
import { BlogGrid } from '@/components/features/blog/blog-grid';
import { CTABlock } from '@/components/ui/cta-block';
import { getBlogPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'The Peak Brief — PeakSeen Blog',
  description:
    'Brand strategy, design thinking, and growth insights for startups and businesses.',
};

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date?: string;
}

const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'how-to-define-your-brand-identity-as-a-startup',
    title: 'How to Define Your Brand Identity as a Startup',
    excerpt:
      'Your brand identity is more than a logo - it is the foundation that shapes how customers perceive and connect with your business.',
    category: 'Branding',
    readTime: '5 min read',
  },
  {
    slug: 'what-is-a-brand-design-system-and-why-you-need-one',
    title: 'What Is a Brand Design System and Why You Need One',
    excerpt:
      'A design system keeps your brand consistent across every touchpoint, from your website to your social media to your pitch deck.',
    category: 'Design',
    readTime: '7 min read',
  },
  {
    slug: '10-logo-design-mistakes-nigerian-startups-make',
    title: '10 Logo Design Mistakes Nigerian Startups Make',
    excerpt:
      'From overcomplicating the mark to ignoring scalability, these are the most common logo missteps we see in the startup ecosystem.',
    category: 'Branding',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-write-a-brand-voice-guide',
    title: 'How to Write a Brand Voice Guide',
    excerpt:
      'A brand voice guide ensures everyone on your team communicates with the same tone, personality, and clarity.',
    category: 'Strategy',
    readTime: '8 min read',
  },
  {
    slug: 'website-vs-landing-page-what-does-your-business-actually-need',
    title: 'Website vs Landing Page: What Does Your Business Actually Need?',
    excerpt:
      'Not every business needs a full website from day one. Here is how to decide what makes sense for your stage and goals.',
    category: 'Strategy',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-create-a-social-media-aesthetic-for-your-business',
    title: 'How to Create a Social Media Aesthetic for Your Business',
    excerpt:
      'A cohesive social media aesthetic builds recognition and trust before a customer ever visits your website.',
    category: 'Design',
    readTime: '6 min read',
  },
];

function getAllPosts(): BlogPost[] {
  const mdxPosts = getBlogPosts();
  const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));

  const merged: BlogPost[] = mdxPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    category: p.category,
    readTime: p.readTime,
    date: p.date,
  }));

  for (const fallback of FALLBACK_POSTS) {
    if (!mdxSlugs.has(fallback.slug)) {
      merged.push(fallback);
    }
  }

  return merged;
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogHero />
      <BlogGrid posts={posts} />
      <CTABlock
        headline="Ready to build a brand that stands out?"
        primaryCta={{ label: 'Start a Project', href: '/start' }}
        secondaryCta={{ label: 'Get a Free Brand Report', href: '/brand-report' }}
      />
    </>
  );
}
