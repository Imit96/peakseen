import { Layers, Palette, Code2, TrendingUp } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { StaggerChildren, staggerChildVariants } from '@/components/motion/stagger-children';

const VALUES = [
  {
    icon: Layers,
    label: 'Brand Identity',
    description:
      'Logos, naming, voice, and visual systems that make you unforgettable.',
  },
  {
    icon: Palette,
    label: 'Digital Products',
    description:
      'Templates, toolkits, and resources — ready to use, no designer needed.',
  },
  {
    icon: Code2,
    label: 'Software & Apps',
    description:
      'Websites, web apps, and MVPs built to launch your vision.',
  },
  {
    icon: TrendingUp,
    label: 'Strategy & Growth',
    description:
      'Content, SEO, launch plans, and positioning to grow with intention.',
  },
] as const;

export function ValueStrip() {
  return (
    <Section dark id="value-strip">
      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {VALUES.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex flex-col gap-3">
              <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-ivory">
                {item.label}
              </h3>
              <p className="text-sm text-grey-300">{item.description}</p>
            </div>
          );
        })}
      </StaggerChildren>
    </Section>
  );
}
