import type { Metadata } from 'next';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXContent } from '@/components/mdx/mdx-content';

export const metadata: Metadata = {
  title: 'Privacy Policy — PeakSeen',
  description:
    'How PeakSeen collects, uses, and protects your data. NDPR and GDPR compliant.',
};

export default async function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), 'src/content/legal/privacy.mdx');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInOnScroll>
            <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-ivory leading-[1.0]">
              Privacy Policy
            </h1>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Content */}
      <Section>
        <div className="mx-auto max-w-prose">
          <FadeInOnScroll>
            <p className="text-sm text-grey-400 mb-8">
              Last updated: March 2026
            </p>

            <div className="prose prose-lg text-grey-600 prose-h2:font-display prose-h2:text-charcoal prose-h2:text-2xl prose-h2:font-bold prose-a:text-accent hover:prose-a:underline">
              <MDXContent source={content} />
            </div>
          </FadeInOnScroll>
        </div>
      </Section>
    </>
  );
}
