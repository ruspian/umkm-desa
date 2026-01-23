import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  Users,
  Package,
  MessageSquare,
  ArrowUpRight,
  Activity,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    redirect("/");
  }

  const totalUser = await prisma.user.count();
  const totalProduk = await prisma.product.count();

  const stats = [
    {
      label: "Total Pengguna",
      value: totalUser,
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-50",
      detail: "Warga & Pelaku UMKM",
    },
    {
      label: "Produk UMKM",
      value: totalProduk,
      icon: <Package className="text-orange-600" />,
      color: "bg-orange-50",
      detail: "Aktif di Katalog",
    },
    {
      label: "Pesan Bantuan",
      value: "0",
      icon: <MessageSquare className="text-emerald-600" />,
      color: "bg-emerald-50",
      detail: "Tiket Support",
    },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-400 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Ringkasan <span className="text-orange-600">Platform</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Halo, {session.user.name.split(" ")[0]}! Pantau ekosistem UMKM kamu
            hari ini.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
            {session.user.name.charAt(0)}
          </div>
          <div className="pr-4 pl-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              Status
            </p>
            <p className="text-sm font-black text-gray-900 dark:text-white">
              Admin Utama
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-orange-200 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${stat.color} opacity-20 rounded-bl-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500`}
            />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-5xl font-black text-gray-900 dark:text-white">
                  {stat.value}
                </h2>
                <span className="text-xs font-bold text-gray-400">
                  {stat.detail}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center text-xs font-bold text-orange-600 cursor-pointer">
              Lihat Detail <ArrowUpRight size={14} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section: Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Activity className="text-orange-600" /> Pendaftar Terbaru
            </h3>
            <button className="text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors">
              Lihat Semua
            </button>
          </div>

          <div className="space-y-6">
            {/* Mockup Row */}
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
                  <div>
                    <p className="font-black text-gray-900 dark:text-white">
                      Memuat Data...
                    </p>
                    <p className="text-xs font-medium text-gray-400">
                      Menunggu sinkronisasi Neon
                    </p>
                  </div>
                </div>
                <div className="h-8 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl" />
              </div>
            ))}
            <p className="text-center text-sm text-gray-400 font-medium italic pt-4">
              Data diambil langsung dari Neon Database kamu.
            </p>
          </div>
        </div>

        {/* Quick Action Card */}
        <div className="bg-orange-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-orange-200 dark:shadow-none flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32" />
          <div className="relative">
            <h3 className="text-2xl font-black leading-tight">
              Butuh Bantuan <br /> Kelola Platform?
            </h3>
            <p className="text-orange-100 mt-4 text-sm font-medium leading-relaxed">
              Dokumentasi sistem sudah siap untuk membantu kamu mengelola para
              pelaku UMKM.
            </p>
          </div>
          <button className="relative w-full py-4 bg-white text-orange-600 rounded-2xl font-black text-sm hover:bg-orange-50 transition-colors mt-8">
            Buka Panduan Admin
          </button>
        </div>
      </div>
    </div>
  );
}
