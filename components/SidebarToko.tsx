"use client";

import { LogOut, MessageCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
type MenuItems = {
  name: string;
  icon: React.ReactNode;
  href: string;
};
const SidebarToko = ({ menuItems }: { menuItems: MenuItems[] }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 border-r border-gray-100 dark:border-gray-800 z-50 p-6">
      <div className="mb-10 px-2">
        <h2 className="text-2xl font-black text-orange-600 tracking-tighter">
          <span className="text-background dark:text-foreground">Asli</span>Sini
        </h2>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1">
          Seller Center
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-4 px-5 py-4 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-800 rounded-[1.5rem] transition-all duration-300 font-bold group"
          >
            <span className="group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Bantuan Button */}
      <div className="absolute bottom-10 left-6 right-6 space-y-4">
        <div className="p-5 bg-orange-600 rounded-3xl text-white shadow-xl  dark:shadow-none">
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">
            Butuh Bantuan?
          </p>
          <p className="text-sm font-medium mb-3">
            Hubungi Admin AsliSini jika kesulitan.
          </p>
          <button className="flex items-center gap-2 text-xs bg-white text-orange-600 px-4 py-2 rounded-xl font-black">
            <MessageCircle size={14} /> Chat Admin
          </button>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-4 px-5 py-4 w-full text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={22} /> Keluar
        </button>
      </div>
    </aside>
  );
};

export default SidebarToko;
