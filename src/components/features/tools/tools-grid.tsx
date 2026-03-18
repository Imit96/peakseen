import Link from 'next/link';
import {
  BarChart3,
  Sparkles,
  Palette,
  Calculator,
  Globe,
  Users,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

interface ToolCardData {
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  cta?: string;
  comingSoon?: boolean;
}

const tools: ToolCardData[] = [
  {
    title: 'Brand Clarity Score',
    description:
      'How strong is your brand? Take our 10-question quiz and get a score out of 100 with personalised recommendations.',
    icon: BarChart3,
    href: '/tools/brand-clarity-score',
    cta: 'Check your score',
  },
  {
    title: 'Brand Name Generator',
    description:
      'Enter your industry and keywords. Get 10 AI-powered brand name ideas in seconds.',
    icon: Sparkles,
    href: '/tools/brand-name-generator',
    cta: 'Generate names',
  },
  {
    title: 'Color Palette Generator',
    description:
      'Build a 5-colour brand palette with hex codes, contrast ratings, and font pairings.',
    icon: Palette,
    href: '/tools/color-palette-generator',
    cta: 'Build a palette',
  },
  {
    title: 'Venture Cost Estimator',
    description: 'Estimate your startup costs',
    icon: Calculator,
    comingSoon: true,
  },
  {
    title: 'Website Audit Checker',
    description: 'Check your website performance',
    icon: Globe,
    href: '/tools/website-audit',
    cta: 'Run audit',
  },
  {
    title: 'Brand Archetype Quiz',
    description: 'Find your brand archetype',
    icon: Users,
    comingSoon: true,
  },
];

export function ToolsGrid() {
  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {tools.map((tool, index) => (
          <FadeInOnScroll key={tool.title} delay={index * 0.1}>
            {tool.comingSoon ? (
              <Card className="p-6 lg:p-8 opacity-60 hover:scale-100 cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-grey-100">
                    <tool.icon className="h-6 w-6 text-grey-400" />
                  </div>
                  <Badge>Coming Soon</Badge>
                </div>
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-grey-500">{tool.description}</p>
              </Card>
            ) : (
              <Link href={tool.href!} className="group block">
                <Card className="p-6 lg:p-8">
                  <div className="mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-subtle">
                      <tool.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="font-display text-lg font-bold text-charcoal mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-grey-500 mb-6">
                    {tool.description}
                  </p>
                  <span
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'sm' }),
                      'p-0 h-auto text-accent hover:text-accent-hover hover:bg-transparent'
                    )}
                  >
                    {tool.cta} &rarr;
                  </span>
                </Card>
              </Link>
            )}
          </FadeInOnScroll>
        ))}
      </div>
    </Section>
  );
}
