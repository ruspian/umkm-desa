"use client";

import React, { useState } from "react";
import { ShoppingCart, Search, DoorClosedLocked } from "lucide-react"; // Pakai lucide-react biar icon-nya cakep
import Link from "next/link";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartCount, setCartCount] = useState<number>(0); // Nanti bisa disambung ke state management

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mencari:", searchQuery);
    // Logic pencarian produk UMKM di sini
  };

  return (
    <nav className="bg-foreground dark:bg-background shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/*logo */}
        <div className="shrink-0">
          <Link
            href="/"
            className="text-2xl font-bold text-background dark:text-foreground"
          >
            Asli<span className="text-orange-500">Sini</span>
          </Link>
        </div>

        {/*pencarian */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl relative group hidden sm:block"
        >
          <input
            type="text"
            placeholder="Cari produk disini..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border-none rounded-full py-2.5 px-5 pl-12 focus:ring-2 ring-2 ring-white focus:ring-orange-500 transition-all outline-none "
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-background dark:text-foreground  group-focus-within:text-orange-500 w-5 h-5" />
        </form>

        {/* keranjang dan pencarian hp */}
        <div className="flex items-center gap-3">
          {/* ikon pencarian */}
          <button className="sm:hidden p-2 text-background dark:text-foreground">
            <Search className="w-6 h-6" />
          </button>

          {/* ikon keranjang */}
          <button className="relative p-2 text-background dark:text-foreground hover:bg-orange-500 rounded-full transition">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          <button className="relative p-2 text-background dark:text-foreground hover:bg-orange-500 rounded-full transition">
            <DoorClosedLocked className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
