import { Skeleton } from '@/components/ui/skeleton';

export default function ToolsLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="h-12 w-72 bg-grey-700" />
          <Skeleton className="mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-grey-100 p-6 space-y-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
