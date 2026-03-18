import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';
import { Check } from 'lucide-react';

const INCLUDED_ITEMS = [
  'Brand Health Score (radar chart across 5 dimensions)',
  'Purpose & Positioning Analysis',
  'Visual Identity Assessment',
  'Digital Presence Review',
  'Top 5 Action Steps',
];

export function ReportHero() {
  return (
    <section className="bg-accent py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInOnScroll>
          <h1 className="font-display text-5xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-[1.0]">
            Get your free Brand Report
          </h1>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <p className="font-body text-lg lg:text-xl text-white/90 max-w-2xl mt-6">
            A personalised 6-page PDF that scores your brand across 5
            dimensions and tells you exactly what to fix — delivered within
            24 hours.
          </p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.2}>
          <div className="mt-10">
            <p className="font-display text-sm font-bold text-white tracking-[0.04em] uppercase mb-4">
              What&apos;s included
            </p>
            <ul className="space-y-3">
              {INCLUDED_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-white/90"
                >
                  <Check
                    className="h-5 w-5 text-white mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
