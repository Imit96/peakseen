import { MDXRemote } from 'next-mdx-remote/rsc';
import { Callout } from '@/components/mdx/callout';
import { ToolPromo } from '@/components/mdx/tool-promo';
import { ProductPromo } from '@/components/mdx/product-promo';
import { NewsletterInline } from '@/components/mdx/newsletter-inline';
import { ImageGallery } from '@/components/mdx/image-gallery';

const components = {
  Callout,
  ToolPromo,
  ProductPromo,
  NewsletterInline,
  ImageGallery,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none text-grey-600 prose-headings:font-display prose-headings:text-charcoal prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal prose-img:rounded-lg">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
