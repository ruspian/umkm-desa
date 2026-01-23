import {
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  Star,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DetailProduct = () => {
  const product = {
    name: "Keripik Singkong Pedas Jeruk",
    price: 15000,
    rating: 4.8,
    reviews: 124,
    description:
      "Keripik singkong khas desa yang diiris tipis renyah, dibumbui dengan cabai asli dan daun jeruk segar. Tanpa pengawet dan MSG berlebihan.",
    image: "https://images.unsplash.com/photo-1613919113166-296c0c11d945?w=800",
    seller: {
      id: "shop-123",
      name: "Barokah Food",
      location: "Desa Sukamaju",
      image:
        "https://ui-avatars.com/api/?name=Barokah+Food&background=f97316&color=fff",
    },
  };
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 font-bold mb-8 hover:text-orange-600 transition-colors"
      >
        <ChevronLeft size={20} /> Kembali Belanja
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Kiri: Gambar Produk */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-100 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Kanan: Info Produk */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-500 font-black text-sm uppercase tracking-widest">
              <Star size={16} fill="currentColor" /> {product.rating} (
              {product.reviews} Ulasan)
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              {product.name}
            </h1>
            <p className="text-3xl font-black text-orange-600">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800">
            <h3 className="font-black text-gray-900 dark:text-white mb-2 uppercase text-xs tracking-widest">
              Deskripsi Produk
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {/* Info Penjual */}
          <Link
            href={`/seller/${product.seller.id}`}
            className="flex items-center justify-between p-6 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-orange-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.seller.image}
                alt={product.seller.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-2xl shadow-lg"
              />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Penjual
                </p>
                <h4 className="font-black text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {product.seller.name}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {product.seller.location}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Tombol Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-5 bg-orange-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-orange-200 dark:shadow-none hover:bg-orange-700 transition-all flex items-center justify-center gap-3">
              <MessageCircle size={24} /> Hubungi via WhatsApp
            </button>
            <button className="p-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-[2rem] font-black hover:bg-gray-200 transition-all">
              <Share2 size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 py-4 border-t border-gray-100 dark:border-gray-800">
            <ShieldCheck className="text-emerald-500" size={24} />
            <p className="text-sm font-bold text-gray-500 italic">
              Produk ini telah melewati verifikasi kurasi tim ASLISINI.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default DetailProduct;
