import { Skeleton } from '@/components/ui/skeleton';

export default function ColorPaletteGeneratorLoading() {
  return (
    <>
      <section className="bg-charcoal py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Skeleton className="mx-auto h-12 w-80 bg-grey-700" />
          <Skeleton className="mx-auto mt-4 h-6 w-96 bg-grey-700" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 space-y-6">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-44 rounded-md" />
        </div>
      </section>
    </>
  );
}
