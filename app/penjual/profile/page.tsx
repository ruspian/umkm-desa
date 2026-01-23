"use client";

import React, { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Instagram,
  Camera,
  Save,
  CheckCircle,
} from "lucide-react";

export default function PenjualProfilePage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-4 md:p-10 max-w-300 mx-auto space-y-10 animate-in fade-in duration-700">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Profil <span className="text-orange-600">Toko UMKM</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Lengkapi data toko kamu agar pembeli lebih percaya.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 active:scale-95">
          <Save size={18} /> Simpan Profil
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Branding & Identitas */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Store className="text-orange-600" size={24} /> Informasi Dasar
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Nama Toko / UMKM
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Keripik Tempe Barokah"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Deskripsi Singkat Toko
                </label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan sejarah singkat atau keunggulan produk kamu..."
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Kategori Utama
                  </label>
                  <select className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none appearance-none">
                    <option>Kuliner</option>
                    <option>Fashion</option>
                    <option>Kerajinan Tangan</option>
                    <option>Pertanian</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Tahun Berdiri
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Kontak & Lokasi */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <MapPin className="text-orange-600" size={24} /> Kontak & Lokasi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  No. WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="0812..."
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Instagram (Opsional)
                </label>
                <div className="relative">
                  <Instagram
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="@toko_umkm"
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Jl. Raya Utama No. 123..."
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Photo & Verification */}
        <div className="space-y-8">
          {/* Logo Toko */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] bg-orange-100 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-950 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                <Store size={48} className="text-orange-600" />
              </div>
              <button className="absolute -bottom-2 -right-2 p-4 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl active:scale-90">
                <Camera size={20} />
              </button>
            </div>
            <h4 className="mt-8 font-black text-xl">Logo UMKM</h4>
            <p className="text-sm text-gray-400 font-medium mt-1 px-4">
              Disarankan ukuran 1:1 (Persegi) dengan kualitas tinggi.
            </p>
          </div>

          {/* Status Verifikasi */}
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
            <CheckCircle className="mb-4 opacity-50" size={32} />
            <h4 className="text-xl font-black leading-tight">
              Status Toko Terverifikasi
            </h4>
            <p className="text-emerald-100 text-xs font-medium mt-2 leading-relaxed italic">
              Toko kamu sudah melewati proses kurasi oleh admin. Produk kamu
              akan diprioritaskan di halaman depan.
            </p>
          </div>

          {/* Statistik Toko Singkat */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                Dilihat
              </span>
              <span className="font-black text-gray-900 dark:text-white">
                1,240 x
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                Produk
              </span>
              <span className="font-black text-gray-900 dark:text-white">
                12 Item
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
