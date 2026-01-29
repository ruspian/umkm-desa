"use client";

import { Eye, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import { TokoAdminProps } from "@/types/toko";
import ModalDelete from "./ModalDelete";
import { toast } from "sonner";
import { DeleteToko } from "@/lib/action";
import Link from "next/link";

const TokoAdminClient = ({
  toko,
  totalCount,
  currentPage,
  totalPages,
  totalProduct,
}: TokoAdminProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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

  const handleDelete = async (id: string) => {
    if (!id) return;

    toast.promise(DeleteToko(id), {
      loading: "Menghapus toko...",
      success: (data) => data.message || "Toko berhasil dihapus.",
      error: (err) => err.message || "Gagal menghapus toko.",
    });
  };

  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Daftar <span className="text-orange-600">Toko</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Daftar toko yang telah terkonfirmasi di ekosistem AsliSini.
          </p>
        </div>
      </div>

      {/*  Search  */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors w-5 h-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/*  Table Container */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Nama
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Alamat
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Whatsapp
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Produk
                </th>

                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {toko.length > 0 ? (
                toko.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {item.logo ? (
                          <Image
                            src={item.logo}
                            alt={item.namaToko as string}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-2xl object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-orange-600 font-black text-lg shadow-inner">
                            {item.namaToko?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-black text-gray-900 dark:text-white leading-none mb-1">
                            {item.namaToko}
                          </p>
                          <p className="text-sm text-gray-400 font-medium">
                            {item.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {item.alamat}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {item.noWhatsapp}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {totalProduct} Produk
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/kurasi-toko/${item.slug as string}`}
                            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-orange-600 hover:text-white transition-all"
                          >
                            <Eye size={18} />
                          </Link>
                        </div>
                        <ModalDelete
                          onConfirm={() => handleDelete(item.id as string)}
                          name={item.namaToko}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* colSpan={7} agar sel ini menempati seluruh lebar tabel */}
                  <td colSpan={7} className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-gray-400">
                        {/* Kamu bisa tambah ikon search atau box kosong di sini */}
                        <Search size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-black text-gray-900 dark:text-white">
                          Toko tidak ditemukan
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Coba gunakan kata kunci lain atau periksa filter kamu.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            totalPages={totalPages}
            handlePageChange={handleChangePage}
            data="Toko"
          />
        </div>
      </div>
    </div>
  );
};

export default TokoAdminClient;
