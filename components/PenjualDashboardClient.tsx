import { PenjualDashboardProps } from "@/types/penjual.dashboard";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PenjualDashboardClient = ({
  stats,
  lowStockList,
  tip,
  lastUpdate,
}: PenjualDashboardProps) => {
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
            {lastUpdate}
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
              <AlertTriangle className="text-red-600" size={24} />
              Stok Hampir Habis
            </h3>
            <Link
              href="/penjual/produk-saya"
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">
                  <th className="pb-2 pl-4">Produk</th>
                  <th className="pb-2 text-center">Sisa Stok</th>
                  <th className="pb-2 text-right pr-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {lowStockList.length > 0 ? (
                  lowStockList.map((product) => (
                    <tr
                      key={product.id}
                      className="group bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 pl-4 rounded-l-2xl border-y border-l border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 relative rounded-lg overflow-hidden border border-gray-200">
                            <Image
                              src={product.images}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center border-y border-gray-100 dark:border-gray-800">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            product.stock <= 2
                              ? "bg-red-100 text-red-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {product.stock} Unit
                        </span>
                      </td>
                      <td className="py-4 text-right pr-4 rounded-r-2xl border-y border-r border-gray-100 dark:border-gray-800">
                        <Link
                          href={`/penjual/edit-produk/${product.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 rounded-lg text-gray-400 hover:text-orange-600 shadow-sm border border-gray-100 transition-all"
                        >
                          <ArrowUpRight size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-10 text-center text-gray-400 font-medium italic"
                    >
                      Alhamdulillah, stok semua aman!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600 opacity-20 rounded-full -mr-20 -mt-20" />
          <h3 className="text-2xl font-black leading-tight mb-4">
            Tips Jualan <br /> Pekan Ini
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export default PenjualDashboardClient;
