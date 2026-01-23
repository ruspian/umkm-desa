// import { auth } from "@/lib/auth";
// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
import {
  TrendingUp,
  Eye,
  Package,
  ArrowUpRight,
  MousePointerClick,
} from "lucide-react";

export default async function PenjualDashboard() {
  //   const session = await auth();

  // Proteksi Role
  //   if (session?.user.role !== "PENJUAL") {
  //     redirect("/");
  //   }

  // Ambil data real dari Neon Postgres berdasarkan ID Penjual
  //   const productCount = await prisma.product.count({
  //     where: { userId: session.user.id },
  //   });

  const stats = [
    {
      label: "Total Tayangan",
      value: "1,284",
      icon: <Eye className="text-blue-600" />,
      change: "+12.5%",
      color: "bg-blue-50",
    },
    {
      label: "Klik Produk",
      value: "456",
      icon: <MousePointerClick className="text-orange-600" />,
      change: "+5.2%",
      color: "bg-orange-50",
    },
    {
      label: "Jumlah Produk",
      value: "22", //productCount,
      icon: <Package className="text-emerald-600" />,
      change: "Aktif",
      color: "bg-emerald-50",
    },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-400 mx-auto animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Statistik <span className="text-orange-600">Dagangan</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Pantau performa produk UMKM kamu secara real-time.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Update Terakhir
          </p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">
            Hari ini, 17:00 WITA
          </p>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-orange-200 transition-all duration-300 shadow-sm relative overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-30 rounded-bl-full -mr-8 -mt-8`}
            />

            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <p className="text-gray-400 font-black text-xs uppercase tracking-widest">
                {stat.label}
              </p>
              <div className="flex items-end justify-between mt-2">
                <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </h2>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Placeholder (Produk Terpopuler) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black flex items-center gap-2">
              <TrendingUp className="text-orange-600" /> Produk Paling Dilirik
            </h3>
          </div>

          <div className="space-y-6">
            {/* Simple Bar Chart UI */}
            {[
              { name: "Keripik Singkong Level 10", views: 85 },
              { name: "Sambal Matah Botol", views: 65 },
              { name: "Kain Tenun Ikat", views: 45 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{item.name}</span>
                  <span className="text-gray-400">{item.views}% tayangan</span>
                </div>
                <div className="w-full h-3 bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 rounded-full transition-all duration-1000"
                    style={{ width: `${item.views}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600 opacity-20 rounded-full -mr-20 -mt-20" />
          <h3 className="text-2xl font-black leading-tight mb-4">
            Tips Jualan <br /> Pekan Ini
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Produk dengan foto berlatar terang terbukti mendapatkan klik 2x
            lebih banyak. Coba update foto produk kamu!
          </p>
          <button className="flex items-center gap-2 text-sm font-black text-orange-500 hover:text-orange-400 transition-colors">
            Baca Tips Lengkap <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
