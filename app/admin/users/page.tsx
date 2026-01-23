import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Search,
  UserPlus,
  MoreVertical,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";

export default async function ManageUsersPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Daftar <span className="text-orange-600">Pengguna</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Total {users.length} pengguna terdaftar di ekosistem AsliSini.
          </p>
        </div>

        <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95">
          <UserPlus size={18} />
          Tambah Pengguna
        </button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Cari nama atau email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="flex-1 md:w-40 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer">
            <option>Semua Role</option>
            <option>Admin</option>
            <option>Penjual</option>
            <option>User</option>
          </select>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Pengguna
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Akses Role
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Tanggal Gabung
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-orange-600 font-black text-lg shadow-inner">
                        {user.name?.charAt(0) || <User />}
                      </div>
                      <div>
                        <p className="font-black text-gray-900 dark:text-white leading-none mb-1">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-400 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {user.role === "ADMIN" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-black uppercase tracking-tighter border border-purple-100 dark:border-purple-800">
                        <ShieldCheck size={14} /> Admin
                      </span>
                    )}
                    {user.role === "PENJUAL" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-tighter border border-emerald-100 dark:border-emerald-800">
                        <Store size={14} /> Penjual
                      </span>
                    )}
                    {user.role === "USER" && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-tighter border border-blue-100 dark:border-blue-800">
                        <User size={14} /> Pembeli
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-xl shadow-none hover:shadow-md transition-all text-gray-400 hover:text-orange-600">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
