import SidebarToko from "@/components/SidebarToko";
import { LayoutDashboard, PackagePlus, Store, ShoppingBag } from "lucide-react";

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
  ];

  return (
    <div className="flex min-h-screen bg-foreground dark:bg-background">
      {/* Sidebar Penjual */}
      <SidebarToko menuItems={menuItems} />
      {/* Main Content Area */}
      <main className="ml-72 w-full">{children}</main>
    </div>
  );
}
