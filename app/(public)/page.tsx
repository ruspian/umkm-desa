import KategoriFilter from "@/components/KategoriFilter";
import { KategoriType } from "@/types/category";

interface HomeProps {
  searchParams: { kategori?: string };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;
  // Ambil kategori dari URL
  const activeCategory = (params.kategori as KategoriType) || "Semua";

  return (
    <main className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 w-full">
      <section>
        <h2 className="text-xl font-bold mt-8 text-gray-800 dark:text-orange-500">
          Telusuri Kategori
        </h2>
        <KategoriFilter />
      </section>

      <section className="mt-4">
        <p className="text-gray-500">
          Menampilkan produk untuk: <strong>{activeCategory}</strong>
        </p>
      </section>
    </main>
  );
}
