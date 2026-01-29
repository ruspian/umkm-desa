import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Package, ArrowLeft, Store, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function DetailKurasiProdukPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      toko: {
        include: { user: true },
      },
    },
  });

  if (!product) notFound();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Navigasi */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/kurasi-produk"
            className="flex items-center gap-2 text-orange-600 text-sm font-bold group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Kembali ke Daftar Kurasi
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Tinjau Produk</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sisi Kiri: Foto Produk */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-4 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group">
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-gray-50 relative">
              {product.images ? (
                <Image
                  src={product.images}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Package size={64} />
                </div>
              )}
              {/* Badge Status Floating */}
              <div className="absolute top-6 left-6">
                <span
                  className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg ${
                    product.status === "Approved"
                      ? "bg-green-500 text-white"
                      : product.status === "Rejected"
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Detail Informasi */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div>
              <p className="text-orange-600 font-black text-xs uppercase tracking-widest mb-1">
                {product.category}
              </p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h2>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-gray-50 dark:border-gray-800">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Harga Jual
                </p>
                <p className="text-2xl font-black text-green-600">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="w-px h-10 bg-gray-100 dark:bg-gray-800" />
              <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Stok Tersedia
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  {product.stock}{" "}
                  <span className="text-sm font-medium text-gray-400">
                    Unit
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Layers size={18} className="text-orange-600" /> Deskripsi
                Produk
              </p>
              <p className="text-gray-500 leading-relaxed font-medium">
                {product.description || "Tidak ada deskripsi produk."}
              </p>
            </div>
          </div>

          {/* Info Toko Pengirim */}
          <div className="bg-orange-50 dark:bg-orange-900/10 rounded-[2.5rem] p-6 border border-orange-100 dark:border-orange-900/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm text-orange-600">
                <Store size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest leading-none mb-1">
                  Produk Dari Toko
                </p>
                <p className="font-black text-gray-900 dark:text-white leading-none">
                  {product.toko.namaToko}
                </p>
              </div>
            </div>
            <Link
              href={`/admin/kurasi-toko/${product.toko.id}`}
              className="text-xs font-black text-orange-600 hover:underline"
            >
              Cek Profil Toko
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
