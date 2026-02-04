import { Skeleton } from "./ui/skeleton";

export const UniversalSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-10">
      {/* Bagian Banner/Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 md:w-80" />
        <Skeleton className="h-4 w-40 md:w-56" />
      </div>

      {/* Grid Produk Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-5 space-y-4"
          >
            <Skeleton className="aspect-square w-full rounded-[2rem]" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-full" />
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-12 w-12 rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
