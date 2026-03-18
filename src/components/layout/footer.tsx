import Link from 'next/link';
import { SITE, SOCIAL_LINKS } from '@/lib/constants';
import { InstagramIcon } from '@/components/icons/instagram';
import { LinkedInIcon } from '@/components/icons/linkedin';
import { TwitterXIcon } from '@/components/icons/twitter-x';
import { BehanceIcon } from '@/components/icons/behance';
import { NewsletterForm } from '@/components/features/newsletter/newsletter-form';

const STUDIO_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
] as const;

const RESOURCE_LINKS = [
  { label: 'Tools', href: '/tools' },
  { label: 'Products', href: '/products' },
  { label: 'Free Brand Report', href: '/brand-report' },
  { label: 'Brand Quiz', href: '/tools/brand-clarity-score' },
] as const;

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-medium uppercase tracking-[0.02em] text-ivory">
        {title}
      </h3>
      {children}
    </div>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external = false }: FooterLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-grey-300 transition-colors hover:text-ivory"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="block text-sm text-grey-300 transition-colors hover:text-ivory"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-xl font-bold text-ivory"
            >
              PEAKSEEN
            </Link>
            <p className="mt-1 font-display text-sm font-medium text-ivory/60">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm text-grey-300">
              {SITE.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-grey-300 transition-colors hover:text-ivory">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-grey-300 transition-colors hover:text-ivory">
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-grey-300 transition-colors hover:text-ivory">
                <TwitterXIcon className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.behance} target="_blank" rel="noopener noreferrer" aria-label="Behance" className="text-grey-300 transition-colors hover:text-ivory">
                <BehanceIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Studio */}
          <FooterColumn title="Studio">
            <nav className="flex flex-col gap-3">
              {STUDIO_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </FooterColumn>

          {/* Column 3: Resources */}
          <FooterColumn title="Resources">
            <nav className="flex flex-col gap-3">
              {RESOURCE_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </FooterColumn>

          {/* Column 4: Contact */}
          <FooterColumn title="Contact">
            <div className="flex flex-col gap-3">
              <FooterLink href={`mailto:${SITE.email}`} external>
                {SITE.email}
              </FooterLink>
              <FooterLink href="/contact">
                Book a free call
              </FooterLink>
              <p className="text-sm text-grey-300">
                Remote-first. Based in Nigeria.
              </p>
            </div>
          </FooterColumn>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-grey-700 pt-8">
          <div className="max-w-md">
            <h3 className="mb-2 font-display text-sm font-medium uppercase tracking-[0.02em] text-ivory">
              Stay in the loop
            </h3>
            <p className="mb-4 text-sm text-grey-300">
              Brand insights, studio updates, and free resources. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider + Bottom bar */}
        <div className="mt-8 border-t border-grey-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-grey-400 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} PeakSeen. All rights reserved.</p>
            <div className="flex gap-4">
              <Link
                href="/legal/privacy"
                className="transition-colors hover:text-ivory"
              >
                Privacy Policy
              </Link>
              <span>|</span>
              <Link
                href="/legal/terms"
                className="transition-colors hover:text-ivory"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
