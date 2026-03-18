'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { cn } from '@/lib/utils';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  className?: string;
}

export function BlogGrid({ posts, className }: BlogGridProps) {
  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <Section className={className}>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'inline-flex items-center rounded-full border px-4 py-2 text-sm font-display font-bold transition-all duration-150',
              activeCategory === cat
                ? 'border-accent bg-accent text-white'
                : 'border-grey-100 bg-white text-grey-600 hover:border-grey-200'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filtered.map((post, index) => (
          <FadeInOnScroll key={post.slug} delay={index * 0.1}>
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <Card className="h-full flex flex-col">
                <div className="aspect-video bg-grey-100 w-full" />
                <div className="p-6 flex flex-col flex-1">
                  <Badge className="self-start mb-3">{post.category}</Badge>
                  <h3 className="font-display text-lg font-bold text-charcoal tracking-tight group-hover:text-accent transition-colors duration-150">
                    {post.title}
                  </h3>
                  <p className="text-sm text-grey-500 mt-2 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-grey-100">
                    <span className="text-xs text-grey-400">
                      {post.date ?? 'Coming Soon'}
                    </span>
                    <span className="text-xs text-grey-400">
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-sm font-display font-bold text-accent mt-3 group-hover:underline">
                    Read article &rarr;
                  </span>
                </div>
              </Card>
            </Link>
          </FadeInOnScroll>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-grey-400 py-12">
          No articles in this category yet.
        </p>
      )}
    </Section>
  );
}
