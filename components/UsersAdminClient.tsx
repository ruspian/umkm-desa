"use client";

import { formatDateDisplay } from "@/lib/formatDate";
import { Search, ShieldCheck, Store, User } from "lucide-react";
import Pagination from "./Pagination";
import { UserProps } from "@/types/user";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RoleDropdown from "./RoleDropdown";
import ModaltambahUser from "./ModalTambahUser";
import ModalDelete from "./ModalDelete";
import { DeleteUser } from "@/lib/action";
import { toast } from "sonner";

const UsersAdminClient = ({
  users,
  totalCount,
  currentPage,
  totalPages,
}: UserProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentSearch = searchParams.get("search") || "";

    if (debouncedSearch !== currentSearch) {
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debouncedSearch, pathname, router, searchParams]);

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (role: string) => {
    const params = new URLSearchParams(searchParams);

    if (role !== "semua") {
      params.set("role", role);
    } else {
      params.delete("role");
    }

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    toast.promise(
      async () => {
        const res = await DeleteUser(id);

        if (!res.success) {
          throw new Error(res.message || "Gagal menghapus pengguna.");
        }

        return res;
      },
      {
        loading: "Menghapus pengguna...",
        success: (data) => data.message || "Pengguna berhasil dihapus.",
        error: (err) => err.message || "Gagal menghapus pengguna.",
      },
    );
  };

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

        <ModaltambahUser />
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={searchParams?.get("role") || "semua"}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="flex-1 md:w-40 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer"
          >
            <option value="semua">Semua Role</option>
            <option value="ADMIN">Admin</option>
            <option value="PENJUAL">Penjual</option>
            <option value="USER">User</option>
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
                        {user.name?.charAt(0).toUpperCase() || <User />}
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
                      {formatDateDisplay(
                        user.createdAt?.toLocaleString() || "",
                      )}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-end justify-end gap-2">
                      <RoleDropdown userId={user.id as string} />

                      <ModalDelete
                        name={user.name as string}
                        onConfirm={() => handleDelete(user.id as string)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            handlePageChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersAdminClient;
