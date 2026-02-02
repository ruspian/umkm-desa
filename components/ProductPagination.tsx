"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-10">
      <button
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleChangePage(i + 1)}
            className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${
              currentPage === i + 1
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
