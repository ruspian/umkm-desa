"use client";

import { LogOut, MessageCircle, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

type MenuItems = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

const SidebarToko = ({ menuItems }: { menuItems: MenuItems[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClickHubungi = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const message = "Halo Admin AsliSini, saya seller ingin bertanya...";
    const phone = "6282293308893";
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, "_blank");
  };

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

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 z-50 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 p-6 flex flex-col`}
      >
        {/* Tombol Close Mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-gray-400"
        >
          <X size={20} />
        </button>

        <div className="mb-10 px-2">
          <Link
            href="/"
            className="text-2xl font-black text-orange-600 tracking-tighter"
          >
            <span className="text-gray-900 dark:text-white">Asli</span>Sini
          </Link>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">
            Seller Center
          </p>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] transition-all duration-300 font-bold group
                ${
                  isActive
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                    : "text-gray-500 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-800"
                }`}
              >
                <span
                  className={`${isActive ? "" : "group-hover:scale-110"} transition-transform`}
                >
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4">
          <div className="px-5 py-2 bg-orange-600 rounded-3xl text-white shadow-xl dark:shadow-none relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

            <p className="text-[10px] font-black opacity-70 uppercase tracking-widest mb-1">
              Butuh Bantuan?
            </p>
            <p className="text-xs font-medium mb-3 leading-relaxed">
              Ada kendala dengan toko? Hubungi admin AsliSini.
            </p>
            <button
              onClick={handleClickHubungi}
              className="flex items-center gap-2 text-[10px] bg-white text-orange-600 px-4 py-2 rounded-xl font-black uppercase tracking-wider hover:bg-orange-50 transition-colors"
            >
              <MessageCircle size={14} /> Chat Admin
            </button>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut size={22} /> Keluar
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarToko;
