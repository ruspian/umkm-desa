"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Tambahkan ini untuk deteksi menu aktif
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
  ShieldCheck,
  Store,
  BoxIcon,
  Menu, // Icon buka
  X, // Icon tutup
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Ringkasan", icon: <LayoutDashboard size={20} />, href: "/admin" },
    {
      name: "Daftar Pengguna",
      icon: <Users size={20} />,
      href: "/admin/users",
    },
    {
      name: "Daftar Produk",
      icon: <BoxIcon size={20} />,
      href: "/admin/products",
    },
    { name: "Daftar Toko", icon: <Store size={20} />, href: "/admin/toko" },
    {
      name: "Kurasi Produk",
      icon: <ShoppingBag size={20} />,
      href: "/admin/kurasi-products",
    },
    {
      name: "Kurasi Toko",
      icon: <ShieldCheck size={20} />,
      href: "/admin/kurasi-toko",
    },
    {
      name: "Konfigurasi",
      icon: <Settings size={20} />,
      href: "/admin/konfigurasi",
    },
  ];

  return (
    <>
      {/* TOMBOL TOGGLE MOBILE */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${isOpen ? "hidden" : "block"} lg:hidden fixed top-6 left-6 z-60 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl text-gray-600 dark:text-gray-300 animate-in fade-in duration-300`}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ASIDE SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-50 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Tombol Tutup di dalam Sidebar */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-gray-400 hover:text-orange-500"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            Asli<span className="text-orange-500">Sini</span>
          </Link>
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="mt-4 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)} // Tutup sidebar setelah klik menu (di mobile)
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-200 font-bold text-sm
                ${
                  isActive
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30 rotate-0"
                    : "text-gray-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-900"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-8 w-full px-4">
          <button
            onClick={() => signOut({ redirectTo: "/" })}
            className="flex items-center gap-3 px-5 py-3.5 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            Keluar Akun
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
