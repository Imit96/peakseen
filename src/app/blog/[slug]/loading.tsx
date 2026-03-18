import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPostLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Skeleton className="h-4 w-24 bg-grey-700" />
          <Skeleton className="mt-6 h-10 w-full bg-grey-700" />
          <Skeleton className="mt-3 h-10 w-3/4 bg-grey-700" />
          <Skeleton className="mt-6 h-4 w-48 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="mt-8 h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </section>
    </>
  );
}
