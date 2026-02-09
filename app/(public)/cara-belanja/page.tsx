import {
  Search,
  ShoppingCart,
  MessageCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function CaraBelanjaPage() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Cari Produk",
      desc: "Telusuri berbagai produk UMKM unggulan melalui kolom pencarian atau filter kategori yang tersedia.",
      color: "bg-blue-500",
    },
    {
      icon: <ShoppingCart size={32} />,
      title: "Masukkan Keranjang",
      desc: "Pilih varian atau jumlah yang diinginkan, lalu klik 'Tambah ke Keranjang' untuk mengumpulkan belanjaan Anda.",
      color: "bg-purple-500",
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Checkout via WA",
      desc: "Klik tombol Checkout WhatsApp. Sistem akan mencatat pesanan Anda dan membuka chat otomatis ke penjual.",
      color: "bg-green-500",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Konfirmasi & Bayar",
      desc: "Selesaikan detail pengiriman dan pembayaran langsung dengan penjual di WhatsApp. Aman dan kekeluargaan!",
      color: "bg-orange-500",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl font-black italic tracking-tighter">
          Gampang Banget <br />
          <span className="text-orange-600">Cara Belanjanya!</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-lg mx-auto">
          Ikuti 4 langkah mudah berikut untuk mendapatkan produk UMKM terbaik
          dari desa langsung ke rumah Anda.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative p-10 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-orange-200/20 transition-all group overflow-hidden"
          >
            <span className="absolute -top-4 -right-4 text-[120px] font-black text-gray-50 dark:text-gray-800/30 group-hover:text-orange-500/10 transition-colors z-0">
              {index + 1}
            </span>

            <div className="relative z-10 space-y-6">
              <div
                className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}
              >
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-gray-900 dark:bg-orange-600 rounded-[4rem] text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tight">
            Sudah Paham Caranya? <br /> Yuk, Mulai Belanja Sekarang!
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <Link
              href="/"
              className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-black hover:bg-orange-100 transition-all flex items-center justify-center gap-2"
            >
              Lihat Semua Produk <ArrowRight size={20} />
            </Link>
            <Link
              href="https://wa.me/6282293308893?text=Halo%20Admin%20AsliSini,%20saya%20ingin%20bertanya%20tentang%20produk."
              className="px-10 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 transition-all"
            >
              Tanya Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          Sistem kami mencatat stok secara otomatis saat Anda Checkout WA
        </div>
      </div>
    </main>
  );
}
