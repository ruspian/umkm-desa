import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import PenjualDashboardClient from "@/components/PenjualDashboardClient";
import { Package, Percent, AlertTriangle } from "lucide-react";
import { formatDateDisplay } from "@/lib/formatDate";

const TIPS_JUALAN = [
  "Produk dengan foto berlatar terang terbukti mendapatkan klik 2x lebih banyak.",
  "Gunakan deskripsi yang singkat namun jelas tentang keunggulan produkmu.",
  "Update stok secara berkala agar pembeli tidak kecewa saat memesan.",
  "Promosikan produkmu di status WhatsApp untuk menjangkau warga desa lebih cepat.",
  "Berikan diskon kecil pada produk yang kurang laku untuk menarik minat.",
];

export default async function PenjualDashboard() {
  const session = await auth();

  //  Proteksi Role & Login
  if (!session?.user || session.user.role !== "PENJUAL") {
    redirect("/");
  }

  // Pilih tips secara acak
  const tipIndex = session?.user?.id
    ? session.user.id.length % TIPS_JUALAN.length
    : 0;

  const randomTip = TIPS_JUALAN[tipIndex];

  // Ambil waktu sekarang dalam format WITA
  const lastUpdate = formatDateDisplay(new Date().toISOString());

  //  Ambil tokoId
  const userToko = await prisma.toko.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!userToko) {
    redirect("/toko/profile"); // Arahkan jika belum punya profil toko
  }

  const tokoId = userToko.id;

  //  Ambil data Statistik secara paralel
  const [lowStockList, totalProducts, discountProducts, lowStockProducts] =
    await prisma.$transaction([
      prisma.product.findMany({
        where: {
          tokoId,
          stock: { lt: 5 }, // Ambil yang stoknya di bawah 5
        },
        orderBy: { stock: "asc" }, // Urutkan dari yang paling mau habis
        take: 5, // Ambil 5 saja biar gak kepanjangan
      }),
      // Hitung Total Produk
      prisma.product.count({ where: { tokoId } }),

      // Hitung Produk yang punya Diskon > 0
      prisma.product.count({
        where: {
          tokoId,
          discount: { gt: 0 },
        },
      }),

      // Hitung Produk dengan Stok < 5
      prisma.product.count({
        where: {
          tokoId,
          stock: { lt: 5 },
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Produk",
      value: totalProducts.toString(),
      icon: <Package className="text-blue-600" />,
      change: "Produk Aktif",
      color: "bg-blue-50",
    },
    {
      label: "Produk Diskon",
      value: discountProducts.toString(),
      icon: <Percent className="text-orange-600" />,
      change: `${discountProducts} Produk Berpromo`,
      color: "bg-orange-50",
    },
    {
      label: "Stok Menipis",
      value: lowStockProducts.toString(),
      icon: <AlertTriangle className="text-red-600" />,
      change: lowStockProducts > 0 ? "Segera Restock!" : "Stok Aman",
      color: "bg-red-50",
    },
  ];

  return (
    <PenjualDashboardClient
      stats={stats}
      lowStockList={lowStockList}
      tip={randomTip}
      lastUpdate={lastUpdate}
    />
  );
}
