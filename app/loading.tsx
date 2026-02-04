import { UniversalSkeleton } from "@/components/UniversalSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-black p-6 md:p-12 lg:p-20">
      <UniversalSkeleton count={8} />
    </main>
  );
}
