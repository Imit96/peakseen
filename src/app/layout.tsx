import type { Metadata } from 'next';
import { satoshi, libreBaskerville, jetbrainsMono } from '@/lib/fonts';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'PeakSeen — Brand & Product Studio | Reach Your Peak. Be Seen.',
    template: '%s | PeakSeen',
  },
  description:
    'PeakSeen is a brand & product studio that helps startups and businesses define their purpose, design their identity, and build digital products. Free brand tools included.',
  metadataBase: new URL('https://peakseen.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://peakseen.com',
    siteName: 'PeakSeen',
    title: 'PeakSeen — Brand & Product Studio',
    description:
      'We build brands that people remember and products that people use. Strategy, design, and development — done right.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PeakSeen — Brand & Product Studio',
    description:
      'We build brands that people remember and products that people use.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ivory text-grey-600 font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-display"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PeakSeen',
              url: 'https://peakseen.com',
              logo: 'https://peakseen.com/images/logo.png',
              description:
                'Brand & Product Studio helping startups and businesses define their purpose, design their identity, and build digital products.',
              email: 'hello@peakseen.com',
              sameAs: [
                'https://instagram.com/peakseen',
                'https://linkedin.com/company/peakseen',
                'https://x.com/peakseen',
                'https://behance.net/peakseen',
              ],
            }),
          }}
        />
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
