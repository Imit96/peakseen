import { Skeleton } from '@/components/ui/skeleton';

export default function BrandReportLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Skeleton className="mx-auto h-12 w-72 bg-grey-700" />
          <Skeleton className="mx-auto mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-xl px-6 lg:px-8 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <Skeleton className="h-11 w-40 rounded-md" />
        </div>
      </section>
    </>
  );
}
