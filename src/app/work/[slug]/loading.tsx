import { Skeleton } from '@/components/ui/skeleton';

export default function CaseStudyLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="h-4 w-20 bg-grey-700" />
          <Skeleton className="mt-6 h-12 w-2/3 bg-grey-700" />
          <Skeleton className="mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
