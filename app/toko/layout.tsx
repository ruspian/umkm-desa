import SidebarToko from "@/components/SidebarToko";
import {
  LayoutDashboard,
  PackagePlus,
  Store,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export default function PenjualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems = [
    {
      name: "Statistik Toko",
      icon: <LayoutDashboard size={22} />,
      href: "/toko",
    },
    {
      name: "Upload Produk",
      icon: <PackagePlus size={22} />,
      href: "/toko/produk-saya/tambah",
    },
    {
      name: "Produk Saya",
      icon: <ShoppingBag size={22} />,
      href: "/toko/produk-saya",
    },
    {
      name: "Profil UMKM",
      icon: <Store size={22} />,
      href: "/toko/profile",
    },
    {
      name: "Orderan",
      icon: <ShoppingCart size={22} />,
      href: "/toko/order",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <SidebarToko menuItems={menuItems} />

      <main className="flex-1 ml-0 lg:ml-72 w-full min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8 lg:p-10 pt-28 lg:pt-10">{children}</div>
      </main>
    </div>
  );
}
