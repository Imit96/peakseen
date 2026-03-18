import Link from 'next/link';
import { BarChart3, Sparkles, Palette } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { StaggerChildren } from '@/components/motion/stagger-children';

const TOOLS = [
  {
    icon: BarChart3,
    title: 'Brand Clarity Score',
    description:
      'Answer 10 questions. Get a score out of 100. Know exactly where your brand stands.',
    href: '/tools/brand-clarity-score',
    cta: 'Check your score',
  },
  {
    icon: Sparkles,
    title: 'Brand Name Generator',
    description:
      'Enter your industry, keywords, and personality. Get 10 unique name ideas instantly.',
    href: '/tools/brand-name-generator',
    cta: 'Generate names',
  },
  {
    icon: Palette,
    title: 'Color Palette Generator',
    description:
      'Pick your mood. Get a 5-colour brand palette with hex codes, contrast ratings, and font pairings.',
    href: '/tools/color-palette-generator',
    cta: 'Build a palette',
  },
] as const;

const COMING_SOON = [
  'Venture Cost Estimator',
  'Website Audit Checker',
  'Brand Archetype Quiz',
] as const;

export function ToolsPreview() {
  return (
    <Section dark id="tools-preview">
      <FadeInOnScroll>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-ivory tracking-[-0.015em]">
          Diagnose your brand. Estimate your build.
        </h2>
        <p className="text-lg text-grey-300 mt-4 max-w-2xl">
          Interactive tools to help you reach your peak. No sign-up needed.
        </p>
      </FadeInOnScroll>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className="bg-grey-800 border border-grey-700 rounded-lg p-6 lg:p-8"
            >
              <Icon className="h-8 w-8 text-accent mb-4" aria-hidden="true" />
              <h3 className="font-display text-xl font-bold text-ivory">
                {tool.title}
              </h3>
              <p className="text-sm text-grey-300 mt-2">{tool.description}</p>
              <Link
                href={tool.href}
                className="inline-block mt-4 text-sm font-display font-bold text-accent hover:underline"
              >
                {tool.cta} &rarr;
              </Link>
            </div>
          );
        })}

        {COMING_SOON.map((title) => (
          <div
            key={title}
            className="bg-grey-800 border border-grey-700 rounded-lg p-6 lg:p-8 opacity-50"
          >
            <Badge className="mb-4">Coming Soon</Badge>
            <h3 className="font-display text-xl font-bold text-ivory">
              {title}
            </h3>
          </div>
        ))}
      </StaggerChildren>
    </Section>
  );
}
