import Link from "next/link";
import { Home, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center px-6 py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-orange-600/5 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-orange-600/10 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 text-center space-y-10 max-w-2xl">
        <div className="relative inline-block group animate-bounce duration-1000">
          <div className="absolute inset-0 bg-orange-600 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

          <div className="relative w-40 h-40 md:w-48 md:h-48 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[3.5rem] flex items-center justify-center shadow-2xl overflow-hidden">
            <span className="absolute text-8xl font-black text-gray-200/30 dark:text-gray-800/30 select-none">
              404
            </span>
            <Ghost
              size={80}
              className="text-orange-600 relative z-10 animate-pulse"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-600">
              Page Not Found
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white leading-[1.1]">
            Walah we <br />
            <span className="text-orange-600 italic">Halaman Gak ada!</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md mx-auto text-lg">
            Mungkin link-nya salah ketik, atau emang halamannya lagi dipindah.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="group w-full sm:w-auto px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-2xl hover:shadow-orange-600/20 active:scale-95"
          >
            <Home
              size={20}
              className="group-hover:-translate-y-1 transition-transform"
            />
            Balik Ke Beranda
          </Link>
        </div>

        <div className="pt-12 flex items-center justify-center gap-3 opacity-30">
          <div className="h-px w-8 bg-gray-400" />
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">
            AsliSini UMKM Platform
          </p>
          <div className="h-px w-8 bg-gray-400" />
        </div>
      </div>
    </main>
  );
}
