import { prisma } from "@/lib/prisma";
import { Check, Store, Eye } from "lucide-react";
import Link from "next/link";

export default async function KurasiTokoPage() {
  // Ambil data toko yang belum diverifikasi atau semua toko
  const daftarToko = await prisma.toko.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="p-8 space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight">
          Kurasi <span className="text-orange-600">Toko UMKM</span>
        </h1>
        <p className="text-gray-500 font-medium">
          Tinjau dan verifikasi toko baru agar bisa mulai berjualan di AsliSini.
        </p>
      </header>

      {/* Grid Status Singkat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Total Toko
          </p>
          <p className="text-3xl font-black">{daftarToko.length}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-[2rem] border border-orange-100 dark:border-orange-900/30 text-orange-600">
          <p className="text-xs font-black uppercase tracking-widest opacity-70">
            Menunggu Verifikasi
          </p>
          <p className="text-3xl font-black">
            {daftarToko.filter((t) => !t.isVerified).length}
          </p>
        </div>
      </div>

      {/* Tabel Kurasi */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                Toko & Pemilik
              </th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                Status
              </th>
              <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {daftarToko.map((toko) => (
              <tr
                key={toko.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
                      <Store size={24} />
                    </div>
                    <div>
                      <p className="font-black text-gray-900 dark:text-white">
                        {toko.namaToko}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {toko.user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-center">
                  {toko.isVerified ? (
                    <span className="px-4 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-tighter">
                      Terverifikasi
                    </span>
                  ) : (
                    <span className="px-4 py-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs font-black uppercase tracking-tighter">
                      Menunggu
                    </span>
                  )}
                </td>
                <td className="p-6">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/kurasi-toko/${toko.id}`}
                      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-orange-600 hover:text-white transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                    {!toko.isVerified && (
                      <button className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all">
                        <Check size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
