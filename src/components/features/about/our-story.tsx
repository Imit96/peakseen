import { Section } from '@/components/layout/section';
import { FadeInOnScroll } from '@/components/motion/fade-in-on-scroll';

export function OurStory() {
  return (
    <Section>
      <FadeInOnScroll>
        <h2 className="font-display text-3xl lg:text-5xl font-bold tracking-tight text-charcoal mb-10 lg:mb-14">
          Our Story
        </h2>
      </FadeInOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="space-y-6">
          <FadeInOnScroll delay={0.1}>
            <p className="text-grey-600 text-base lg:text-lg leading-relaxed">
              PeakSeen started with a frustration: too many talented founders
              and business owners were invisible. They had great products, real
              expertise, and ambitious visions — but their brands did not
              reflect any of it. They were losing deals, missing opportunities,
              and blending into a sea of sameness.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.2}>
            <p className="text-grey-600 text-base lg:text-lg leading-relaxed">
              We founded PeakSeen to fix that. Not with trendy redesigns or
              hollow brand exercises, but with strategic, purpose-driven
              branding that connects who you are with how the world sees you.
              Every logo, every website, every campaign we build is rooted in
              one question: does this make the brand impossible to ignore?
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <p className="text-grey-600 text-base lg:text-lg leading-relaxed">
              Today, PeakSeen operates as a brand and product studio serving
              startups, SMBs, and corporates across multiple industries. We
              combine strategy, design, and technology to deliver brands that
              are not just beautiful — they are clear, consistent, and built
              to grow.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4}>
            <p className="text-grey-600 text-base lg:text-lg leading-relaxed">
              Our long-term vision goes beyond client work. We are building
              toward a venture-as-a-service model — co-founding and launching
              our own brands and digital products alongside the businesses we
              serve. PeakSeen is not just a studio. It is a launchpad.
            </p>
          </FadeInOnScroll>
        </div>

        <div className="space-y-6">
          <FadeInOnScroll delay={0.3} direction="right">
            <div className="rounded-lg border border-grey-100 bg-grey-50 p-8 lg:p-10">
              <div className="mb-4">
                <div className="h-16 w-16 rounded-full bg-charcoal flex items-center justify-center text-ivory font-display font-bold text-xl mb-4">
                  OO
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal">
                  OJO Oluwatimileyin
                </h3>
                <p className="text-grey-500 text-sm font-display">
                  Founder &amp; Creative Director
                </p>
              </div>
              <p className="text-grey-600 text-base leading-relaxed">
                &ldquo;I started PeakSeen because I believe every business has a peak
                — a version of itself that is clearer, bolder, and impossible to
                ignore. My job is to help you find it, design it, and show it to
                the world.&rdquo;
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.4} direction="right">
            <div className="rounded-lg border border-grey-100 bg-grey-50 p-8 lg:p-10">
              <div className="mb-4">
                <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-ivory font-display font-bold text-xl mb-4">
                  TT
                </div>
                <h3 className="font-display text-xl font-bold text-charcoal">
                  Taylor Tomi
                </h3>
                <p className="text-grey-500 text-sm font-display">
                  Co-founder &amp; Head of Strategy
                </p>
              </div>
              <p className="text-grey-600 text-base leading-relaxed">
                &ldquo;Great brands aren&apos;t just seen — they&apos;re felt. I focus on the
                strategy behind every visual, ensuring our work connects with
                real audiences and drives real results.&rdquo;
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </Section>
  );
}
