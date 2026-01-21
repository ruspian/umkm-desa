"use client";

import { KategoriIcon, KategoriType } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";

const KategoriFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory =
    (searchParams.get("kategori") as KategoriType) || "Semua";

  const handleFilter = (name: KategoriType) => {
    if (name === "Semua") {
      router.push("/");
    } else {
      router.push(`?kategori=${name}`);
    }
  };

  return (
    <div className="grid grid-cols-3 md:flex items-center  gap-3 overflow-x-auto py-6 no-scrollbar">
      {KategoriIcon.map((category) => {
        const IconComponent = category.icon; // ambil iconnya
        const isActive = activeCategory === category.name;
        return (
          <button
            key={category.name}
            onClick={() => handleFilter(category.name)}
            className={`px-6 py-2 rounded-full whitespace-nowrap text-xs md:text-sm  font-medium transition-all flex gap-2 items-center justify-center 
            ${
              isActive
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <IconComponent
              size={18}
              strokeWidth={isActive ? 2.5 : 2}
              className="hidden md:block"
            />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default KategoriFilter;
