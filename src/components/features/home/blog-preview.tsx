import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const POSTS = [
  {
    slug: 'brand-identity-startup',
    category: 'Branding',
    title: 'Why Brand Identity Is the First Thing Investors Notice',
    excerpt:
      'Before your product, before your pitch — your brand tells investors whether you are serious.',
    readTime: '5 min read',
  },
  {
    slug: 'color-psychology-branding',
    category: 'Design',
    title: 'The Psychology of Colour in Branding',
    excerpt:
      'How to choose colours that reflect your values and connect with your audience on a subconscious level.',
    readTime: '4 min read',
  },
  {
    slug: 'mvp-launch-checklist',
    category: 'Growth',
    title: 'The MVP Launch Checklist You Actually Need',
    excerpt:
      'Skip the 50-step guides. Here is what matters when you are launching your first product.',
    readTime: '6 min read',
  },
] as const;

export function BlogPreview() {
  return (
    <Section id="blog-preview">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal tracking-[-0.015em]">
          From the blog
        </h2>
        <p className="text-lg text-grey-500 mt-4 max-w-2xl">
          Brand strategy, design thinking, and growth insights.
        </p>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {POSTS.map((post) => (
          <Card key={post.slug}>
            <div className="bg-grey-200 aspect-[3/2] rounded-t-lg" />
            <div className="p-6">
              <Badge variant="accent">{post.category}</Badge>
              <h3 className="font-display text-xl font-bold text-charcoal mt-3">
                {post.title}
              </h3>
              <p className="text-sm text-grey-500 mt-2">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-display font-bold text-accent hover:underline"
                >
                  Read article &rarr;
                </Link>
                <span className="text-xs text-grey-400">{post.readTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </StaggerChildren>

      <FadeInOnScroll className="mt-12 text-center">
        <Link
          href="/blog"
          className="font-display font-bold text-accent hover:underline"
        >
          Read the blog &rarr;
        </Link>
      </FadeInOnScroll>
    </Section>
  );
}
