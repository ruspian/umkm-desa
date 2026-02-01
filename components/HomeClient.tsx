import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";
import Image from "next/image";
import KategoriFilter from "@/components/KategoriFilter";
import { HomeProductType } from "@/types/product";
import { formatCurrency } from "@/lib/formatRupiah";
import Link from "next/link";

const HomeClient = ({
  featuredProducts,
}: {
  featuredProducts: HomeProductType[];
}) => {
  return (
    <main className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 w-full">
      <section className="px-4 pt-10 pb-20 w-full mx-auto">
        <div className="relative bg-gray-900 rounded-lg overflow-hidden min-h-125 flex items-center p-8 md:p-20 shadow-2xl">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1511317557367-d11899a1c415?w=1200')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block px-4 py-2 bg-orange-600 text-white rounded-full text-xs font-black uppercase tracking-widest">
              Bangga Produk Lokal
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
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
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black transition-all">
                Daftar Jadi Penjual
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mt-8 text-gray-800 dark:text-orange-500">
          Telusuri Kategori
        </h2>
        <KategoriFilter />
      </section>

      <section className="px-4 py-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              Produk Pilihan Hari Ini
            </h2>
            <p className="text-gray-500 font-medium">
              Kurasi terbaik dari seluruh mitra UMKM-HUB.
            </p>
          </div>
          <ShoppingBag className="text-orange-600" size={32} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredProducts.map((p) => {
            const price = p.price ?? 0;
            const discount = p.discount ?? 0;
            const hasDiscount = discount > 0;

            // Hitung harga final
            const finalPrice = hasDiscount
              ? price - (price * discount) / 100
              : price;

            return (
              <Link
                href={`/product/${p.slug}`}
                key={p.id}
                className="group relative flex flex-col bg-white dark:bg-gray-900 rounded-md border border-gray-100 dark:border-gray-800 p-2 transition-all hover:shadow-2xl hover:shadow-orange-200/20 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative aspect-square rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={p.images}
                    alt={p.name as string}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {hasDiscount && (
                    <div className="absolute top-1 right-1">
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg">
                        -{p.discount}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="mt-4 px-1 flex-1 flex flex-col">
                  <div className="flex gap-1">
                    <Store className="text-orange-600" size={15} />
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
                      {p.toko?.namaToko as string}
                    </p>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-2">
                    {p.name as string}
                  </h3>

                  <div className="mt-auto space-y-1">
                    {/* diskon */}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-md font-medium text-gray-900 dark:text-white">
                        {formatCurrency(finalPrice)}
                      </span>
                      {hasDiscount && (
                        <p className="text-[10px] text-gray-400 line-through font-medium">
                          {formatCurrency(p.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* section kenapa pake aslisini  */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-900/50">
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
              icon: <Truck size={40} className="text-orange-600" />,
              title: "Dukungan Logistik",
              desc: "Berbagai pilihan pengiriman yang aman sampai ke depan rumah kamu.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 bg-white dark:bg-gray-900 rounded-3xl flex items-center justify-center shadow-lg">
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
