import { Skeleton } from '@/components/ui/skeleton';

export default function ServicesLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="h-12 w-56 bg-grey-700" />
          <Skeleton className="mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-grey-100 p-8 space-y-4">
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="mt-4 h-11 w-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
