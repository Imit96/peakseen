import { Skeleton } from '@/components/ui/skeleton';

export default function BrandClarityScoreLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Skeleton className="mx-auto h-12 w-72 bg-grey-700" />
          <Skeleton className="mx-auto mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="rounded-lg border border-grey-100 p-8 space-y-6">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
            <Skeleton className="h-11 w-32 rounded-md" />
          </div>
        </div>
      </section>
    </>
  );
}
