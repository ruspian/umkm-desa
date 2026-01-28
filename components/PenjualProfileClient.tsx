"use client";

import React, { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  Camera,
  Save,
  CheckCircle,
  Trash2,
  X,
} from "lucide-react";
import { TokoProps, TokoType } from "@/types/toko";
import { toast } from "sonner";
import {
  deleteFromCloudinary,
  uploadToCloudinarySigned,
} from "@/lib/cloudinary";
import Image from "next/image";
import { CreateToko } from "@/lib/action";
import { useRouter } from "next/navigation";

export default function PenjualProfileClient({
  dataToko,
  verified,
}: TokoProps) {
  const [formData, setFormData] = useState<TokoType>({
    namaToko: dataToko?.namaToko || "",
    deskripsi: dataToko?.deskripsi || "",
    logo: dataToko?.logo || "",
    alamat: dataToko?.alamat || "",
    noWhatsapp: dataToko?.noWhatsapp || "",
  });

  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.promise(
      async () => {
        const url = await uploadToCloudinarySigned({
          file: file,
          folder: "umkm",
          resourceType: "image",
        });

        setFormData((prev) => ({
          ...prev,
          logo: url,
        }));
      },
      {
        loading: "Mengunggah logo...",
        success: "Logo berhasil diunggah!",
        error: (error) => error.message,
      },
    );
  };

  const handleDeleteLogo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.promise(
      async () => {
        await deleteFromCloudinary({
          url: formData.logo,
          resourceType: "image",
        });

        setFormData((prev) => ({
          ...prev,
          logo: "",
        }));
      },
      {
        loading: "Menghapus logo...",
        success: "Logo berhasil dihapus!",
        error: (error) => error.message,
      },
    );
  };

  const onSaveProfile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (
      !formData.namaToko ||
      !formData.deskripsi ||
      !formData.alamat ||
      !formData.noWhatsapp
    ) {
      toast.error("Lengkapi semua data profil toko terlebih dahulu!");
      return;
    }

    toast.promise(
      async () => {
        const result = await CreateToko(formData);

        if (!result.success) {
          throw new Error(result.message || "Gagal menyimpan profil toko");
        }

        router.refresh();
        return result;
      },
      {
        loading: "Menyimpan profil toko...",
        success: (res) => res.message,
        error: (error) => error.message,
      },
    );
  };

  return (
    <div className="p-4 md:p-10 max-w-300 mx-auto space-y-10 animate-in fade-in duration-700">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Profil <span className="text-orange-600">Toko UMKM</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Lengkapi data toko kamu agar pembeli lebih percaya.
          </p>
        </div>

        <button
          onClick={onSaveProfile}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-orange-700 transition-all shadow-sm shadow-orange-200 active:scale-95 cursor-pointer"
        >
          <Save size={18} /> Simpan Profil
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Branding & Identitas */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <Store className="text-orange-600" size={24} />{" "}
              <span className="text-background dark:text-foreground">
                Informasi Toko
              </span>
            </h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  Nama Toko / UMKM
                </label>
                <input
                  type="text"
                  value={formData.namaToko}
                  onChange={(e) =>
                    handleInputChange("namaToko", e.target.value)
                  }
                  name="namaToko"
                  placeholder="Keripik Tempe Barokah"
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  Deskripsi Singkat Toko
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    handleInputChange("deskripsi", e.target.value)
                  }
                  name="deskripsi"
                  rows={4}
                  placeholder="Ceritakan sejarah singkat atau keunggulan produk kamu..."
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Kontak & Lokasi */}
          <div className="rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <MapPin className="text-orange-600" size={24} />{" "}
              <span className="text-background dark:text-foreground">
                Kontak & Lokasi
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  No. WhatsApp
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    value={formData.noWhatsapp}
                    onChange={(e) =>
                      handleInputChange("whatsapp", e.target.value)
                    }
                    name="whatsapp"
                    type="text"
                    placeholder="0812..."
                    className="w-full pl-16 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">
                  Alamat Lengkap
                </label>
                <input
                  value={formData.alamat}
                  onChange={(e) => handleInputChange("alamat", e.target.value)}
                  type="text"
                  placeholder="Jl. Raya Utama No. 123..."
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* logo dan verifikasi toko */}
        <div className="space-y-8">
          {/* Logo Toko */}
          <div className="rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
            {formData.logo ? (
              <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden group border-4 border-gray-50 dark:border-gray-800 shadow-xl">
                <Image
                  src={formData.logo}
                  alt="Preview Produk"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />

                {/* Overlay untuk Hapus */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleDeleteLogo}
                    className="bg-red-500 text-white flex p-2 text-center justify-center rounded-xl font-black text-sm hover:bg-red-600 transition-all"
                  >
                    <Trash2 size={16} className="inline-block" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2.5rem] bg-orange-100 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-950 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                  <Store size={48} className="text-orange-600" />
                </div>
                <button className="absolute -bottom-2 -right-2 p-4 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl active:scale-90">
                  <Camera size={20} />
                </button>

                <input
                  className="absolute inset-0 opacity-0 w-full"
                  type="file"
                  name="logo"
                  onChange={handleUploadLogo}
                />
              </div>
            )}
            <h4 className="mt-8 font-black text-xl ">Logo UMKM</h4>
            <p className="text-sm text-gray-400 font-medium mt-1 px-4">
              Disarankan ukuran 1:1 (Persegi) dengan kualitas tinggi.
            </p>
          </div>

          {/* Status Verifikasi */}
          {verified ? (
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
          ) : (
            <div className="bg-red-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-red-200">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
              <X className="mb-4 opacity-50" size={32} />
              <h4 className="text-xl font-black leading-tight">
                Status Toko Belum Terverifikasi
              </h4>
              <p className="text-emerald-100 text-xs font-medium mt-2 leading-relaxed italic">
                Silahkan tunggu proses verifikasi dari admin. Hubungi admin jika
                verifikasi memakan waktu lama.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
