import { MapPin, Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SellerProfilePage() {
  const seller = {
    name: "Barokah Food",
    location: "Desa Sukamaju, Kec. Maju Jaya",
    bio: "Penyedia camilan tradisional khas desa dengan resep turun temurun sejak 1998.",
    image:
      "https://ui-avatars.com/api/?name=Barokah+Food&background=f97316&color=fff",
    joined: "Januari 2024",
    totalProducts: 12,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Profil */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <Image
            src={seller.image}
            alt={seller.name}
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] shadow-2xl border-8 border-white dark:border-gray-800"
          />
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                {seller.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-1 text-orange-600">
                  <MapPin size={16} /> {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <Package size={16} /> {seller.totalProducts} Produk
                </span>
                <span className="flex items-center gap-1">
                  <Star size={16} /> 4.9 Rating Toko
                </span>
              </div>
            </div>
            <p className="max-w-2xl text-gray-500 dark:text-gray-400 font-medium italic">
              &quot;{seller.bio}&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Daftar Produk Penjual Ini */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-3xl font-black tracking-tight">
            Semua <span className="text-orange-600">Produk Toko</span>
          </h2>
          <div className="h-0.5 flex-1 bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Gunakan loop dari data produk penjual */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 p-4 transition-all hover:shadow-2xl"
            >
              <div className="aspect-square rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={`https://images.unsplash.com/photo-${1600000000000 + i}?w=400`}
                  alt="Produk"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-black text-lg line-clamp-1">
                Produk Unggulan {i}
              </h3>
              <p className="text-orange-600 font-black mt-2">Rp 25.000</p>
              <Link
                href={`/product/${i}`}
                className="mt-4 block w-full py-3 text-center bg-gray-50 dark:bg-gray-800 rounded-xl font-black text-sm hover:bg-orange-600 hover:text-white transition-all"
              >
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
