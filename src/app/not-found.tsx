import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="font-display text-5xl lg:text-7xl font-bold text-charcoal tracking-[-0.025em] mt-4">
          Page not found
        </h1>
        <p className="font-body text-lg text-grey-500 mt-6 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
          >
            Go home
          </Link>
          <Link
            href="/tools"
            className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}
          >
            Explore tools
          </Link>
        </div>
      </div>
    </section>
  );
}
