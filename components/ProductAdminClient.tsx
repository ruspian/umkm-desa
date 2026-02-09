"use client";

import { Search } from "lucide-react";
import { formatCurrency } from "@/lib/formatRupiah";
import { formatDateDisplay } from "@/lib/formatDate";
import Image from "next/image";
import { ProductAdminProps } from "@/types/product";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";
import ModalDelete from "./ModalDelete";
import { toast } from "sonner";
import { DeleteProduct } from "@/lib/action";

const ProductAdminClient = ({
  products,
  totalCount,
  currentPage,
  totalPages,
}: ProductAdminProps) => {
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

    toast.promise(
      async () => {
        const res = await DeleteProduct(id);

        if (!res.success) {
          throw new Error(res.message || "Gagal menghapus produk.");
        }

        return res;
      },
      {
        loading: "Menghapus produk...",
        success: (data) => data.message || "Produk berhasil dihapus.",
        error: (err) => err.message || "Gagal menghapus produk.",
      },
    );
  };
  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Daftar <span className="text-orange-600">Produk</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Daftar produk yang telah terkonfirmasi di ekosistem AsliSini.
          </p>
        </div>
      </div>

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

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800">
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Produk
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Toko
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Harga
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Stok
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Diskon
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400">
                  Tanggal Dibuat
                </th>
                <th className="px-8 py-6 text-sm font-black uppercase tracking-widest text-gray-400 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        {product.images ? (
                          <Image
                            src={product.images}
                            alt={product.name as string}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-2xl object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-orange-600 font-black text-lg shadow-inner">
                            {product.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-black text-gray-900 dark:text-white leading-none mb-1">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-400 font-medium">
                            {product.toko?.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {product.toko?.namaToko}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {formatCurrency(product.price)}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {product.stock}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {product.discount}%
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        {formatDateDisplay(product.createdAt.toLocaleString())}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <ModalDelete
                        onConfirm={() => handleDelete(product.id)}
                        name={product.name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-gray-400">
                        <Search size={32} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xl font-black text-gray-900 dark:text-white">
                          Produk tidak ditemukan
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
            data="Produk"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAdminClient;
