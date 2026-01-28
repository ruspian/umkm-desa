"use client";

import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit3,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductProps } from "@/types/product";
import Pagination from "./Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ModalDelete from "./ModalDelete";

export default function ProductSayaClient({
  products,
  currentPage,
  totalCount,
  totalPages,
  verified,
}: ProductProps) {
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const currentSearch = searchParams.get("search") || "";

    // jika search berubah
    if (debouncedSearch !== currentSearch) {
      if (debouncedSearch) {
        // kalo ada search, tambahkan ke params
        params.set("search", debouncedSearch);
      } else {
        // kalo gak ada hapus params
        params.delete("search");
      }

      // atur param page ke 1
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`); // ganti url
    }
  });

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status !== "semua") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-400 mx-auto animate-in fade-in duration-700">
      {/* header dan tombol tambah */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-background dark:text-foreground">
            Produk <span className="text-orange-600">Saya</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Kelola stok dan pantau status verifikasi produk kamu.
          </p>
        </div>
        <Link href="/toko/produk-saya/tambah">
          <button
            disabled={!verified}
            className="flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black shadow-xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Tambah Produk
          </button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-[2rem] border border-gray-200 dark:border-gray-200 shadow-sm">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk kamu..."
            className="w-full pl-14 pr-6 py-3 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
          />
        </div>
        <select
          value={searchParams.get("status") || "semua"}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-6 py-3 border-none rounded-2xl font-black outline-none cursor-pointer"
        >
          <option value="semua">Semua Status</option>
          <option value="Approved">Disetujui</option>
          <option value="Pending">Menunggu</option>
          <option value="Rejected">Ditolak</option>
        </select>
      </div>

      {/* Product List Layout */}
      <div className="grid grid-cols-1 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="group p-6 rounded-[2.5rem] border border-gray-100 dark:border-orange-500 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all flex flex-col md:flex-row items-center gap-6"
            >
              {/* Image Preview */}
              <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 shrink-0 border-4 border-gray-50 dark:border-gray-800">
                <Image
                  src={product.images}
                  alt={product.nama as string}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="text-xl font-black ">{product.nama}</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold">
                  <p className="text-orange-600">
                    Rp {product.price.toLocaleString("id-ID")}
                  </p>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                  <p className="text-gray-400">Stok: {product.stock}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {product.status === "Approved" && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-emerald-100">
                    <CheckCircle2 size={16} /> Aktif & Terverifikasi
                  </div>
                )}
                {product.status === "Pending" && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-orange-100">
                    <Clock size={16} /> Menunggu Kurasi
                  </div>
                )}
                {product.status === "Rejected" && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-red-100">
                    <AlertCircle size={16} /> Perlu Perbaikan
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-center">
                <Link
                  href={`/product/${product.slug}`}
                  title="Lihat detail"
                  className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
                >
                  <ExternalLink size={20} />
                </Link>
                <Link
                  href={`/toko/produk-saya/edit/${product.slug}`}
                  title="Edit Produk"
                  className={`p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all`}
                >
                  <Edit3 size={20} />
                </Link>
                <ModalDelete
                  productId={product.id}
                  productName={product.nama as string}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="group p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-500 font-medium text-center w-full">
              Tidak ada produk ditemukan.
            </p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
