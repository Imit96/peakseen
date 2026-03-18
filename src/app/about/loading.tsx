import { Skeleton } from '@/components/ui/skeleton';

export default function AboutLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="h-12 w-48 bg-grey-700" />
          <Skeleton className="mt-4 h-6 w-80 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="aspect-square w-full rounded-lg" />
          </div>
        </div>
      </section>
    </>
  );
}
