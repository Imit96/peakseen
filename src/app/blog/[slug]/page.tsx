export const revalidate = 3600;

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { getBlogPost, getBlogPosts } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/mdx-content';

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  author?: string;
  date?: string;
}

const FALLBACK_POSTS: BlogPostData[] = [
  {
    slug: 'how-to-define-your-brand-identity-as-a-startup',
    title: 'How to Define Your Brand Identity as a Startup',
    description:
      'Learn the foundational steps every startup needs to define a clear, compelling brand identity from day one.',
    category: 'Branding',
    readTime: '5 min read',
  },
  {
    slug: 'what-is-a-brand-design-system-and-why-you-need-one',
    title: 'What Is a Brand Design System and Why You Need One',
    description:
      'Discover how a design system keeps your brand consistent across every touchpoint and saves your team time.',
    category: 'Design',
    readTime: '7 min read',
  },
  {
    slug: '10-logo-design-mistakes-nigerian-startups-make',
    title: '10 Logo Design Mistakes Nigerian Startups Make',
    description:
      'Avoid the most common logo design pitfalls that hold Nigerian startups back from building strong brand recognition.',
    category: 'Branding',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-write-a-brand-voice-guide',
    title: 'How to Write a Brand Voice Guide',
    description:
      'A step-by-step guide to creating a brand voice guide that keeps your communication consistent and on-brand.',
    category: 'Strategy',
    readTime: '8 min read',
  },
  {
    slug: 'website-vs-landing-page-what-does-your-business-actually-need',
    title: 'Website vs Landing Page: What Does Your Business Actually Need?',
    description:
      'Understand the difference between a website and a landing page, and which one your business actually needs right now.',
    category: 'Strategy',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-create-a-social-media-aesthetic-for-your-business',
    title: 'How to Create a Social Media Aesthetic for Your Business',
    description:
      'Build a cohesive social media presence that strengthens your brand and attracts the right audience.',
    category: 'Design',
    readTime: '6 min read',
  },
];

function getAllPosts(): BlogPostData[] {
  const mdxPosts = getBlogPosts();
  const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));

  const merged: BlogPostData[] = mdxPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    readTime: p.readTime,
    author: p.author,
    date: p.date,
  }));

  for (const fallback of FALLBACK_POSTS) {
    if (!mdxSlugs.has(fallback.slug)) {
      merged.push(fallback);
    }
  }

  return merged;
}

function getRelatedPosts(currentSlug: string): BlogPostData[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3);
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const mdxPost = getBlogPost(slug);
  if (mdxPost) {
    return {
      title: `${mdxPost.frontmatter.title} — PeakSeen Blog`,
      description: mdxPost.frontmatter.description,
    };
  }

  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
  if (fallback) {
    return {
      title: `${fallback.title} — PeakSeen Blog`,
      description: fallback.description,
    };
  }

  return {
    title: 'Post Not Found — PeakSeen Blog',
    description: 'The blog post you are looking for could not be found.',
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const mdxPost = getBlogPost(slug);
  const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);

  if (!mdxPost && !fallback) {
    notFound();
  }

  const title = mdxPost ? mdxPost.frontmatter.title : fallback!.title;
  const description = mdxPost ? mdxPost.frontmatter.description : fallback!.description;
  const category = mdxPost ? mdxPost.frontmatter.category : fallback!.category;
  const readTime = mdxPost ? mdxPost.frontmatter.readTime : fallback!.readTime;
  const author = mdxPost ? mdxPost.frontmatter.author : undefined;
  const date = mdxPost ? mdxPost.frontmatter.date : undefined;

  const relatedPosts = getRelatedPosts(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(date ? { datePublished: date } : {}),
    author: {
      '@type': 'Organization',
      name: 'PeakSeen',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PeakSeen',
      url: 'https://peakseen.com',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInOnScroll>
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-6">
                {category}
              </Badge>
              <h1 className="font-display text-4xl lg:text-6xl font-black tracking-[-0.03em] text-ivory leading-[1.1]">
                {title}
              </h1>
              <div className="flex items-center gap-4 mt-6 text-sm text-grey-400">
                <span>{date ?? 'Coming Soon'}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{readTime}</span>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="mx-auto max-w-prose">
          <FadeInOnScroll>
            {mdxPost ? (
              <MDXContent source={mdxPost.content} />
            ) : (
              <div className="prose prose-lg text-grey-600">
                <p>
                  Building a strong brand is one of the most important investments
                  a business can make. Whether you are just getting started or
                  looking to refine what you already have, understanding the
                  fundamentals of brand identity is essential to standing out in a
                  crowded market.
                </p>
                <p>
                  At its core, brand identity is the collection of visual,
                  verbal, and emotional elements that define how your business
                  presents itself to the world. It goes far beyond a logo or
                  colour palette. It encompasses your messaging, your tone of
                  voice, your values, and the experience you deliver at every
                  touchpoint.
                </p>
                <p>
                  Many startups make the mistake of treating branding as an
                  afterthought, something to revisit once the product is built
                  and revenue is flowing. But the truth is, your brand shapes
                  how customers perceive you from the very first interaction.
                  A clear, intentional brand identity helps you attract the
                  right audience, build trust faster, and differentiate
                  yourself from competitors who are all saying the same thing.
                </p>
                <p>
                  The most effective brands start with a strong foundation:
                  a clearly defined purpose, a deep understanding of their
                  target audience, and a visual system that communicates
                  their values at a glance. From there, consistency is
                  everything. Every social media post, every email, every
                  page on your website should feel like it comes from the
                  same source.
                </p>
              </div>
            )}
          </FadeInOnScroll>

          {/* Author Bio */}
          <FadeInOnScroll>
            <div className="mt-16 pt-8 border-t border-grey-100">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-grey-100" />
                <div>
                  <p className="font-display text-sm font-bold text-charcoal">
                    {author ?? 'PeakSeen Editorial'}
                  </p>
                  <p className="text-sm text-grey-500">
                    Brand strategy and design insights from the PeakSeen team.
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </Section>

      {/* Related Posts */}
      <Section className="border-t border-grey-100">
        <FadeInOnScroll>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-charcoal tracking-tight mb-8">
            More from The Peak Brief
          </h2>
        </FadeInOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {relatedPosts.map((related, index) => (
            <FadeInOnScroll key={related.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${related.slug}`}
                className="group block h-full"
              >
                <Card className="h-full flex flex-col">
                  <div className="aspect-video bg-grey-100 w-full" />
                  <div className="p-6 flex flex-col flex-1">
                    <Badge className="self-start mb-3">
                      {related.category}
                    </Badge>
                    <h3 className="font-display text-lg font-bold text-charcoal tracking-tight group-hover:text-accent transition-colors duration-150">
                      {related.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-grey-100">
                      <span className="text-xs text-grey-400">
                        {related.date ?? 'Coming Soon'}
                      </span>
                      <span className="text-xs text-grey-400">
                        {related.readTime}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
        <FadeInOnScroll>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
            >
              View all articles &rarr;
            </Link>
          </div>
        </FadeInOnScroll>
      </Section>
    </>
  );
}
