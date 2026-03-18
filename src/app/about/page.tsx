import type { Metadata } from 'next';
import { AboutHero } from '@/components/features/about/about-hero';
import { OurStory } from '@/components/features/about/our-story';
import { Beliefs } from '@/components/features/about/beliefs';
import { HowWeWork } from '@/components/features/about/how-we-work';
import { Audiences } from '@/components/features/about/audiences';
import { Stats } from '@/components/features/about/stats';
import { CTABlock } from '@/components/ui/cta-block';

export const metadata: Metadata = {
  title: 'About PeakSeen — Our Story & Values',
  description:
    'PeakSeen helps businesses discover their highest potential. Learn our story, values, process, and who we serve.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Beliefs />
      <HowWeWork />
      <Audiences />
      <Stats />
      <CTABlock
        variant="dark"
        headline="Let's build something worth seeing."
        primaryCta={{ label: "Work with us", href: "/start" }}
        secondaryCta={{ label: "See our work", href: "/work" }}
      />
    </>
  );
}
