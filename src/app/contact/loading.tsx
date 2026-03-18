import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Skeleton className="h-12 w-64 bg-grey-700" />
          <Skeleton className="mt-4 h-6 w-80 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-11 w-full rounded-md" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-28 w-full rounded-md" />
          </div>
          <Skeleton className="h-11 w-36 rounded-md" />
        </div>
      </section>
    </>
  );
}
