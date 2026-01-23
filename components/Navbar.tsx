"use client";

import React, { useState } from "react";
import { ShoppingCart, Search, LogIn } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfilDropdown from "./ProfilDropdown";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { status } = useSession();

  return (
    <nav className="sticky top-0 z-100 w-full px-4 pt-4">
      {/* Container utama dengan efek Glassmorphism */}
      <div className="max-w-7xl mx-auto h-16 md:h-20 bg-foreground/80 dark:bg-background/80 backdrop-blur-xl border  shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-lg px-6 flex items-center justify-between gap-6 transition-all">
        {/* logo */}
        <div className="shrink-0">
          <Link href="/" className="group flex items-center gap-1">
            <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-black text-xl">A</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-background dark:text-foreground hidden md:block">
              Asli<span className="text-orange-600">Sini</span>
            </span>
          </Link>
        </div>

        {/* bar pencarian */}
        <form className="flex-1 max-w-xl relative group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Cari kerajinan atau camilan khas..."
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-12 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-6 select-none items-center gap-1 rounded border bg-white dark:bg-gray-900 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100 uppercase">
            ⌘ K
          </kbd>
        </form>

        {/* Actions Menu */}
        <div className="flex items-center gap-2">
          {/* tampilan pencarian hp */}
          <button className="sm:hidden p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Keranjang dengan Badge Modern */}
          <button className="relative p-3 text-background dark:text-foreground hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 rounded-2xl transition-all">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-2 right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[10px] font-black text-white items-center justify-center">
                3
              </span>
            </span>
          </button>

          {status === "authenticated" ? (
            <ProfilDropdown />
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-lg shadow-gray-200 dark:shadow-none active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">Masuk</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
