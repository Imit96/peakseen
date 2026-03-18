import type { MetadataRoute } from 'next';
import { getBlogPosts, getCaseStudies } from '@/lib/mdx';

const BASE_URL = 'https://peakseen.com';

const PRODUCT_SLUGS = [
  'brand-identity-starter-kit',
  'social-media-content-pack',
  'brand-clarity-workbook',
  'complete-brand-starter-bundle',
];

const WORK_FALLBACK_SLUGS = [
  'fintech-brand-identity',
  'ecommerce-brand-identity',
  'saas-product-brand',
];

const BLOG_FALLBACK_SLUGS = [
  'how-to-define-your-brand-identity-as-a-startup',
  'what-is-a-brand-design-system-and-why-you-need-one',
  '10-logo-design-mistakes-nigerian-startups-make',
  'how-to-write-a-brand-voice-guide',
  'website-vs-landing-page-what-does-your-business-actually-need',
  'how-to-create-a-social-media-aesthetic-for-your-business',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/tools/brand-clarity-score`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/brand-name-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/color-palette-generator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/brand-report`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/start`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Blog post URLs
  const mdxBlogSlugs = new Set(getBlogPosts().map((p) => p.slug));
  const allBlogSlugs = new Set([...mdxBlogSlugs, ...BLOG_FALLBACK_SLUGS]);
  const blogRoutes: MetadataRoute.Sitemap = Array.from(allBlogSlugs).map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Work/case study URLs
  const mdxWorkSlugs = new Set(getCaseStudies().map((c) => c.slug));
  const allWorkSlugs = new Set([...mdxWorkSlugs, ...WORK_FALLBACK_SLUGS]);
  const workRoutes: MetadataRoute.Sitemap = Array.from(allWorkSlugs).map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Product URLs
  const productRoutes: MetadataRoute.Sitemap = PRODUCT_SLUGS.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...workRoutes, ...productRoutes];
}
