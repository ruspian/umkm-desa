"use client";

import React, { useEffect, useState } from "react";
import { Search, LogIn } from "lucide-react";
import Link from "next/link";
import ProfilDropdown from "./ProfilDropdown";
import { ThemeToggle } from "./ThemeToggle";
import CartBadge from "./CartBadge";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { NavbarProps } from "@/types/navbar";

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openSearch, setOpenSearch] = useState(false);

  const isAuthenticated = !!user;
  const [debounceSearch] = useDebounce(searchQuery, 500);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentSearch = searchParams.get("search") || "";

    if (debounceSearch !== currentSearch) {
      if (debounceSearch) {
        params.set("search", debounceSearch);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debounceSearch, pathname, router, searchParams]);

  return (
    <>
      {/* Overlay: Muncul hanya di HP saat search terbuka */}
      {openSearch && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden transition-opacity"
          onClick={() => setOpenSearch(false)} // Klik dimana saja untuk tutup
        />
      )}

      <nav className="sticky top-0 z-100 w-full px-4 pt-4">
        <div className="max-w-7xl mx-auto h-16 md:h-20 backdrop-blur-xl border border-white/20 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[1.5rem] px-6 flex items-center justify-between gap-6 transition-all bg-white/70 dark:bg-black/70">
          <div className="shrink-0">
            <Link href="/" className="group flex items-center gap-1">
              <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <span className="font-black text-xl">A</span>
              </div>
              <span className="text-2xl font-black tracking-tighter hidden md:block">
                Asli<span className="text-orange-600">Sini</span>
              </span>
            </Link>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex-1 max-w-xl relative group hidden sm:block"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari produk desa..."
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-12 text-sm font-medium focus:ring-2 focus:ring-orange-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Menu Aksi */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenSearch(!openSearch)}
              className="sm:hidden p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90"
            >
              <Search
                className={`w-4 h-4 ${openSearch ? "text-orange-600" : ""}`}
              />
            </button>

            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center">
                <CartBadge />
                <ProfilDropdown user={user} />
              </div>
            ) : (
              <Link
                href="/login"
                className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        <div
          className={`sm:hidden relative z-50 overflow-hidden transition-all duration-300 ease-in-out ${
            openSearch ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-orange-600" />
            </div>
            <input
              type="text"
              placeholder="Cari camilan desa..."
              className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl py-4 px-12 text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={openSearch}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
