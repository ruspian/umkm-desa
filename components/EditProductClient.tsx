"use client";

import { EditProduct } from "@/lib/action";
import {
  deleteFromCloudinary,
  uploadToCloudinarySigned,
} from "@/lib/cloudinary";
import { KategoriIcon, KategoriType } from "@/types/category";
import { EditProductProps, ProductType } from "@/types/product";
import {
  ImagePlus,
  Hash,
  Type,
  CirclePercent,
  CirclePile,
  ChevronDown,
  ListTodo,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EditProductClient({
  product,
  verified,
}: EditProductProps) {
  const [formData, setFormData] = useState<ProductType>({
    id: product.id || "",
    nama: product.nama || "",
    description: product.description || "",
    category: product.category || ("Semua" as KategoriType),
    price: product.price || 0,
    images: product.images || "",
    discount: product.discount || 0,
    stock: product.stock || 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChangeInput = (name: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (!file) return;

    toast.promise(
      async () => {
        const url = await uploadToCloudinarySigned({
          file: file[0],
          folder: "umkm",
          resourceType: "image",
        });

        setFormData((prev) => ({
          ...prev,
          images: url,
        }));
      },
      {
        loading: "Tunggu sebentar...",
        success: "Foto berhasil diupload!",
        error: (err) => {
          return err.message;
        },
      },
    );
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.promise(
      async () => {
        await deleteFromCloudinary({
          url: formData.images,
          resourceType: "image",
        });

        setFormData((prev) => ({
          ...prev,
          images: "",
        }));
      },
      {
        loading: "Tunggu sebentar...",
        success: "Foto berhasil dihapus.",
        error: (err) => {
          return err.message;
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.images ||
      !formData.nama ||
      !formData.price ||
      !formData.stock
    ) {
      toast.warning("Data belum lengkap!");
      return;
    }
    toast.promise(
      async () => {
        setIsSubmitting(true);
        const payload = {
          ...formData,
          slug: product.slug,
        };

        const result = await EditProduct(payload);

        if (!result.success) {
          setIsSubmitting(false);
          throw new Error(result.message || "Terjadi kesalahan!");
        }

        router.push("/toko/produk-saya");
        setIsSubmitting(false);
        return result;
      },
      {
        loading: "Sedang menambahkan produk...",
        success: (res) => res.message,
        error: (err) => err.message,
      },
    );
  };

  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-background dark:text-foreground">
          Edit <span className="text-orange-600">Produk Saya</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Pastikan foto produk cerah agar menarik minat pembeli.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className={!verified ? "opacity-60 grayscale-[0.5]" : ""}
      >
        <div className="bg-foreground dark:bg-background rounded-[3rem] p-10 shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
          {/*  Foto */}
          <div className="space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
              Foto Produk
            </label>

            {/* Jika sudah ada gambar  */}
            {formData.images ? (
              <div className="relative aspect-video md:aspect-2/1 rounded-[2.5rem] overflow-hidden group border-4 border-gray-50 dark:border-gray-800 shadow-xl">
                <Image
                  src={formData?.images}
                  alt="Preview Produk"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />

                {/* Overlay untuk Hapus */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="bg-red-500 text-white px-6 py-2 rounded-2xl font-black text-sm hover:bg-red-600 transition-all"
                    disabled={isSubmitting || !verified}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              /* Tampilan Dropzone jika belum ada gambar */
              <label className="border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-12 flex flex-col items-center justify-center group hover:border-orange-200 transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
                <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-orange-600 shadow-xl group-hover:scale-110 transition-transform mb-4">
                  <ImagePlus size={32} />
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-center">
                  Klik untuk upload foto utama
                </p>
                <p className="text-sm text-gray-400">
                  Maksimal 1MB, format JPG/PNG
                </p>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                  disabled={isSubmitting || !verified}
                />
              </label>
            )}
          </div>

          {/* Input Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Nama Produk
              </label>
              <div className="relative">
                <Type
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="text"
                  name="nama"
                  value={formData?.nama}
                  onChange={(e) => handleChangeInput("nama", e.target.value)}
                  placeholder="Keripik Singkong Pedas"
                  disabled={isSubmitting || !verified}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Harga (Rp)
              </label>
              <div className="relative">
                <Hash
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="number"
                  value={formData?.price}
                  onChange={(e) => handleChangeInput("price", e.target.value)}
                  placeholder="15000"
                  name="price"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                  disabled={isSubmitting || !verified}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Stok
              </label>
              <div className="relative">
                <CirclePile
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="number"
                  value={formData?.stock}
                  onChange={(e) => handleChangeInput("stock", e.target.value)}
                  placeholder="10"
                  name="stock"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                  disabled={isSubmitting || !verified}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Diskon
              </label>
              <div className="relative">
                <CirclePercent
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="number"
                  value={formData?.discount}
                  onChange={(e) =>
                    handleChangeInput("discount", e.target?.value)
                  }
                  name="discount"
                  placeholder="10"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
                  disabled={isSubmitting || !verified}
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Kategori Produk
              </label>
              <div className="relative group">
                <ListTodo
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleChangeInput("category", e.target.value)
                  }
                  name="category"
                  className="w-full pl-14 pr-10 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-black outline-none focus:ring-2 ring-orange-500/20 appearance-none cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={isSubmitting || !verified}
                >
                  {KategoriIcon.map((item) => (
                    <option
                      key={item.name}
                      value={item.name === "Semua" ? "" : item.name}
                      className="font-bold py-2"
                    >
                      {item.name === "Semua" ? "Pilih Kategori" : item.name}
                    </option>
                  ))}
                </select>

                {/* Ikon Panah Custom di Sisi Kanan */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown size={18} strokeWidth={3} />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
                Deskripsi Produk
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleChangeInput("description", e.target.value)
                }
                name="description"
                rows={5}
                placeholder="Jelaskan bahan baku, berat, atau keunikan produk kamu..."
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl font-bold outline-none focus:ring-2 ring-orange-500/20 resize-none"
                disabled={isSubmitting || !verified}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-orange-600 text-white rounded-[2rem] font-black text-lg  dark:shadow-none hover:bg-orange-700 transition-all active:scale-95 disabled:bg-orange-600/50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !verified}
          >
            {!verified ? "Toko Belum Terverifikasi" : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
