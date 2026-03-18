import { Search, Target, Palette, Rocket } from 'lucide-react';
import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

const steps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We listen. We research your market, competitors, and audience. We find what makes your business different — and worth paying attention to.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Define',
    description:
      'We distill everything into a clear brand strategy: your purpose, positioning, voice, and visual direction. No guesswork. Just clarity.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Design',
    description:
      'We craft the visual and digital assets that bring your brand to life — logos, websites, templates, apps. Everything designed with intention.',
    icon: Palette,
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We launch, test, and refine. You get the files, the guidelines, and the confidence to show up consistently everywhere.',
    icon: Rocket,
  },
] as const;

export function HowWeWork() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-charcoal mb-12 lg:mb-16">
          How We Work
        </h2>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <FadeInOnScroll key={step.number} delay={index * 0.1}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-subtle">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <span className="font-mono text-sm text-grey-400">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-bold text-charcoal">
                  {step.title}
                </h3>
                <p className="text-grey-600 text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeInOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
