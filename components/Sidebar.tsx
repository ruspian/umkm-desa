"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Ringkasan",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
    },
    {
      name: "Daftar Pengguna",
      icon: <Users size={20} />,
      href: "/dashboard/admin/users",
    },
    {
      name: "Kurasi Produk",
      icon: <ShoppingBag size={20} />,
      href: "/dashboard/admin/products",
    },
    {
      name: "Konfigurasi",
      icon: <Settings size={20} />,
      href: "/dashboard/admin/settings",
    },
  ];
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-foreground dark:bg-background border-r border-gray-200 dark:border-gray-800 z-50">
      <div className="p-6">
        <h2 className="text-2xl font-black text-background dark:text-foreground tracking-tighter">
          Asli<span className="text-orange-500">Sini</span>
        </h2>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="mt-4 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-background dark:text-foreground hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-8 w-full px-4">
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
        >
          <LogOut size={20} />
          Keluar
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
