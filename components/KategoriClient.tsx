"use client";

import { KategoriType } from "@/types/category";
import { useState } from "react";
import KategoriFilter from "./KategoriFilter";

export default function KategoryClient() {
  const [activeCategory, setActiveCategory] = useState<KategoriType>("Semua");

  return (
    <main className="flex items-center flex-col justify-center max-w-7xl mx-auto px-4">
      <section>
        <h2 className="text-xl font-bold  mt-8 text-background dark:text-orange-500">
          Telusuri Kategori
        </h2>
        <KategoriFilter
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </section>

      {/* Grid Produk nanti di bawah sini */}
      <section className="mt-4">
        <p className="text-gray-500">
          Menampilkan produk kategori: <strong>{activeCategory}</strong>
        </p>
        {/* <ProductGrid category={activeCategory} /> */}
      </section>
    </main>
  );
}
