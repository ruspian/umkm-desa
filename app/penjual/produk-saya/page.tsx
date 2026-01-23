"use client";

import React from "react";
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyProductsPage() {
  // Mock data produk (nanti ambil dari Prisma)
  const products = [
    {
      id: "1",
      name: "Keripik Singkong Pedas Jeruk",
      price: 15000,
      stock: 50,
      status: "APPROVED",
      image:
        "https://images.unsplash.com/photo-1613919113166-296c0c11d945?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "2",
      name: "Kain Tenun Ikat Motif NTT",
      price: 250000,
      stock: 5,
      status: "PENDING",
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "3",
      name: "Sambal Roa Botol Premium",
      price: 35000,
      stock: 20,
      status: "REJECTED",
      image:
        "https://images.unsplash.com/photo-1589135339689-191541bc950e?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10 max-w-400 mx-auto animate-in fade-in duration-700">
      {/* Header & Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Produk <span className="text-orange-600">Saya</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Kelola stok dan pantau status verifikasi produk kamu.
          </p>
        </div>
        <Link href="/dashboard/penjual/add-product">
          <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black shadow-xl hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all active:scale-95">
            <Plus size={20} />
            Tambah Produk
          </button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari produk kamu..."
            className="w-full pl-14 pr-6 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
          />
        </div>
        <select className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-black outline-none cursor-pointer">
          <option>Semua Status</option>
          <option>Disetujui</option>
          <option>Menunggu</option>
          <option>Ditolak</option>
        </select>
      </div>

      {/* Product List Layout */}
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all flex flex-col md:flex-row items-center gap-6"
          >
            {/* Image Preview */}
            <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 shrink-0 border-4 border-gray-50 dark:border-gray-800">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 space-y-1 text-center md:text-left">
              <h3 className="text-xl font-black text-gray-900 dark:text-white">
                {product.name}
              </h3>
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
              {product.status === "APPROVED" && (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-emerald-100">
                  <CheckCircle2 size={16} /> Aktif & Terverifikasi
                </div>
              )}
              {product.status === "PENDING" && (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-orange-100">
                  <Clock size={16} /> Menunggu Kurasi
                </div>
              )}
              {product.status === "REJECTED" && (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-tighter border border-red-100">
                  <AlertCircle size={16} /> Perlu Perbaikan
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-center">
              <button
                title="Lihat di Toko"
                className="p-3 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
              >
                <ExternalLink size={20} />
              </button>
              <button
                title="Edit Produk"
                className="p-3 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
              >
                <Edit3 size={20} />
              </button>
              <button
                title="Hapus Produk"
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
