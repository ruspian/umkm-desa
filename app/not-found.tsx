import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-600/10 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 text-center space-y-8 max-w-xl">
        {/* Ikon Animatif */}
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-orange-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] flex items-center justify-center animate-bounce duration-2000ms">
            <SearchX size={64} className="text-orange-600" />
          </div>
        </div>

        {/* Teks Utama */}
        <div className="space-y-3">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-orange-600">
            Waduh, Kesasar di Mana Nih?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md mx-auto">
            Halaman yang kamu cari nggak ada coy!.
          </p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95"
          >
            <Home size={18} /> Balik Ke Beranda
          </Link>
        </div>

        {/* Footer Kecil */}
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 pt-10">
          AsliSini • UMKM
        </p>
      </div>
    </main>
  );
}
