"use client";

import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Store,
  SearchX,
  Sparkles,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import KategoriFilter from "@/components/KategoriFilter";
import { HomeProductType } from "@/types/product";
import { formatCurrency } from "@/lib/formatRupiah";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductPagination from "./ProductPagination";

type HomeTypeProps = {
  featuredProducts: HomeProductType[];
  allProducts: HomeProductType[];
  currentPage: number;
  totalPages: number;
};

const HomeClient = ({
  featuredProducts,
  allProducts,
  totalPages,
  currentPage,
}: HomeTypeProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const currentCategory = searchParams.get("kategori") || "semua";

  const isSearching = !!searchQuery;
  const isFiltering = currentCategory !== "semua";

  // Reusable Product Card Component (Biar kode gak numpuk)
  const RenderProductCard = ({ p }: { p: HomeProductType }) => {
    const price = p.price ?? 0;
    const discount = p.discount ?? 0;
    const hasDiscount = discount > 0;
    const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

    return (
      <Link
        href={`/product/${p.slug}`}
        key={p.id}
        className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3 transition-all hover:shadow-2xl hover:shadow-orange-200/20 hover:-translate-y-2"
      >
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={p.images}
            alt={p.name as string}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">
                -{p.discount}%
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 px-1 flex-1 flex flex-col">
          <div className="flex items-center gap-1 mb-1">
            <Store className="text-orange-600" size={12} />
            <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest truncate">
              {p.toko?.namaToko as string}
            </p>
          </div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight mb-2">
            {p.name as string}
          </h3>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-sm font-black text-gray-900 dark:text-white">
              {formatCurrency(finalPrice)}
            </span>
            {hasDiscount && (
              <p className="text-[10px] text-gray-400 line-through">
                {formatCurrency(p.price)}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <main className="w-full">
      {/*  HERO SECTION  */}
      {!isSearching && !isFiltering && (
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-10">
          <div className="relative bg-gray-900 rounded-[3rem] overflow-hidden min-h-125 flex items-center p-8 md:p-20 shadow-2xl">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1511317557367-d11899a1c415?w=1200')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="inline-block px-4 py-2 bg-orange-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                Bangga Produk Lokal
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                Kualitas{" "}
                <span className="text-orange-500 italic underline">Asli</span>,{" "}
                <br /> Sampai ke Sini.
              </h1>
              <p className="text-gray-300 text-lg font-medium leading-relaxed">
                Dukung pertumbuhan ekonomi kreatif dengan membeli langsung dari
                tangan pertama pelaku UMKM terbaik.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black transition-all flex items-center gap-2 group">
                  Mulai Belanja{" "}
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. KATEGORI & FILTER */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col items-center">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
            Telusuri Kategori
          </h2>
          <KategoriFilter />
        </div>
      </section>

      {/* 3. FEATURED SECTION (Hanya tampil di Home utama) */}
      {!isSearching && !isFiltering && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 bg-orange-50/50 dark:bg-orange-950/10 rounded-[4rem] my-10">
          <div className="flex items-center gap-3 mb-12 ml-4">
            <div className="p-3 bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-600/20">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Pilihan Hari Ini
              </h2>
              <p className="text-gray-500 font-medium">
                Kurasi produk paling anyar dari mitra UMKM.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4">
            {featuredProducts.map((p) => (
              <RenderProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* semua produk atau hasil pencarian */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {isSearching
                ? `Hasil Cari: "${searchQuery}"`
                : "Jelajahi Semua Produk"}
            </h2>
            <p className="text-gray-500 font-medium">
              {isFiltering
                ? `Menampilkan kategori ${currentCategory}`
                : "Temukan apa yang kamu butuhkan dari desa kami."}
            </p>
          </div>
          <ShoppingBag className="text-orange-600 hidden md:block" size={32} />
        </div>

        {allProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.map((p) => (
              <RenderProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
            <SearchX size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">
              Waduh, produknya nggak ketemu nih...
            </p>
            <Link
              href="/"
              className="mt-4 text-orange-600 font-black text-sm underline"
            >
              Reset Pencarian
            </Link>
          </div>
        )}

        <ProductPagination totalPages={totalPages} currentPage={currentPage} />
      </section>

      {/*WHY SECTION */}
      <section className="px-4 py-24 bg-gray-50 dark:bg-gray-950/30 w-full mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <ShieldCheck size={40} className="text-orange-600" />,
              title: "Produk Terkurasi",
              desc: "Setiap barang telah melewati proses verifikasi kualitas oleh tim kami.",
            },
            {
              icon: <ShoppingBag size={40} className="text-orange-600" />,
              title: "Tangan Pertama",
              desc: "Harga lebih kompetitif karena kamu membeli langsung dari pembuatnya.",
            },
            {
              icon: <ShoppingCartIcon size={40} className="text-orange-600" />,
              title: "Belanja Mudah",
              desc: "Belanja secara online dengan mudah dan cepat, tanpa harus keluar rumah.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                {v.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomeClient;
