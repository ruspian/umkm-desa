"use client";

import React, { useState } from "react";
import {
  Globe,
  Shield,
  Bell,
  User as UserIcon,
  Save,
  Smartphone,
  Lock,
  Camera,
  AlertTriangle,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Umum");

  // Menu Navigasi Samping
  const menuItems = [
    { label: "Umum", icon: <Globe size={20} /> },
    { label: "Profil Admin", icon: <UserIcon size={20} /> },
    { label: "Keamanan", icon: <Shield size={20} /> },
    { label: "Notifikasi", icon: <Bell size={20} /> },
  ];

  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800 pb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Konfigurasi <span className="text-orange-600">Sistem</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Atur pengaturan sistem AsliSini.
            <span className="text-orange-600 font-bold">{activeTab}</span>
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95">
          <Save size={18} /> Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* SIDEBAR NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-4 px-6 py-5 rounded-[1.8rem] font-black text-sm transition-all duration-300 ${
                activeTab === item.label
                  ? "bg-white dark:bg-gray-900 text-orange-600 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 scale-105"
                  : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:translate-x-2"
              }`}
            >
              <span
                className={`${activeTab === item.label ? "text-orange-600" : "text-gray-400"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <div className="lg:col-span-3 min-h-150">
          {/* TAB: UMUM */}
          {activeTab === "Umum" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Globe className="text-orange-600" /> Identitas Platform
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Nama Platform
                    </label>
                    <input
                      type="text"
                      defaultValue="AsliSini"
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Slogan
                    </label>
                    <input
                      type="text"
                      defaultValue="Produk Lokal, Kualitas Global"
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      WhatsApp Bantuan
                    </label>
                    <div className="relative">
                      <Smartphone
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        defaultValue="081234567890"
                        className="w-full pl-16 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Shield className="text-orange-600" /> Pengaturan Publik
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Pendaftaran Penjual",
                      desc: "Izinkan UMKM mendaftar akun baru.",
                      status: true,
                    },
                    {
                      title: "Mode Pemeliharaan",
                      desc: "Tampilkan halaman 'Under Maintenance' ke publik.",
                      status: false,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 dark:border-gray-800"
                    >
                      <div>
                        <p className="font-black text-gray-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-400 font-medium">
                          {item.desc}
                        </p>
                      </div>
                      <div
                        className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer ${item.status ? "bg-orange-600" : "bg-gray-200 dark:bg-gray-700"}`}
                      >
                        <div
                          className={`w-6 h-6 bg-white rounded-full transition-all ${item.status ? "translate-x-6" : "translate-x-0"}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROFIL ADMIN */}
          {activeTab === "Profil Admin" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-2xl font-black mb-10">Profil Pribadi</h3>
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-orange-100 flex items-center justify-center text-4xl font-black text-orange-600 overflow-hidden border-4 border-white shadow-xl">
                      R
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-3 bg-gray-900 text-white rounded-2xl shadow-lg hover:bg-orange-600 transition-colors">
                      <Camera size={18} />
                    </button>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        defaultValue="Ruspian Majid"
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        Email Admin
                      </label>
                      <input
                        type="email"
                        defaultValue="ruspian@example.com"
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KEAMANAN */}
          {activeTab === "Keamanan" && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Lock className="text-orange-600" /> Kata Sandi
                </h3>
                <div className="max-w-xl space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Password Lama
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                    />
                  </div>
                  <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm active:scale-95 transition-all">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 flex items-center gap-6">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl text-red-600 shadow-sm">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <p className="font-black text-red-600">Zona Berbahaya</p>
                  <p className="text-sm text-red-500/80 font-medium">
                    Menghapus akun admin akan membuat kamu kehilangan akses ke
                    platform secara permanen.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: NOTIFIKASI */}
          {activeTab === "Notifikasi" && (
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <Bell className="text-orange-600" /> Preferensi Notifikasi
              </h3>
              <div className="space-y-6">
                {[
                  {
                    label: "Email Penjual Baru",
                    desc: "Dapatkan email setiap kali ada UMKM baru mendaftar.",
                  },
                  {
                    label: "Laporan Mingguan",
                    desc: "Ringkasan transaksi dan pengunjung dikirim ke email kamu.",
                  },
                  {
                    label: "Pesan Support",
                    desc: "Notifikasi browser jika ada pesan bantuan masuk.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-6 h-6 accent-orange-600"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
