import { SaveGeneralSettingUser } from "@/lib/action";
import {
  deleteFromCloudinary,
  uploadToCloudinarySigned,
} from "@/lib/cloudinary";
import { Users } from "@/types/user";
import { Camera, Save, Trash2, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const TabUmumUser = ({ userSetting }: { userSetting: Users }) => {
  const [formData, setFormData] = useState({
    id: userSetting?.id || "",
    name: userSetting?.name || "",
    email: userSetting?.email || "",
    image: userSetting?.image || "",
  });

  const handleChangeInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast.promise(
      async () => {
        const url = await uploadToCloudinarySigned({
          file: file,
          folder: "umkm",
          resourceType: "image",
        });

        setFormData((prev) => {
          return {
            ...prev,
            image: url,
          };
        });

        return url;
      },
      {
        loading: "Mengunggah foto...",
        success: "Foto berhasil diunggah",
        error: (error) => error.message,
      },
    );
  };

  const handleDeleteImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    toast.promise(
      async () => {
        const response = await deleteFromCloudinary({
          url: formData.image,
          resourceType: "image",
        });

        setFormData((prev) => {
          return {
            ...prev,
            image: "",
          };
        });

        return response;
      },
      {
        loading: "Menghapus foto...",
        success: "Foto berhasil dihapus",
        error: (error) => error.message,
      },
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(SaveGeneralSettingUser(formData), {
      loading: "Memproses perubahan...",
      success: (res) => res.message,
      error: (err) => err.message,
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
          <h3 className="text-2xl font-black mb-10">Profil Pribadi</h3>
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start w-full">
            {/* Bagian Foto Profil */}
            <div className="shrink-0">
              {formData.image ? (
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group border-4 border-gray-50 dark:border-gray-800 shadow-xl">
                  <Image
                    src={formData.image}
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
                      className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] md:rounded-[2.5rem] bg-orange-100 dark:bg-gray-800 flex items-center justify-center border-4 border-white dark:border-gray-950 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    <User className="text-orange-600 w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-3 md:p-4 bg-gray-900 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-xl active:scale-90 pointer-events-none">
                    <Camera size={20} />
                  </div>

                  <input
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                    type="file"
                    name="image"
                    onChange={handleUploadImage}
                  />
                </div>
              )}
            </div>

            {/* Bagian Input Form */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-widest">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  name="name"
                  onChange={(e) => handleChangeInput("name", e.target.value)}
                  className="w-full px-5 py-4 md:px-6 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-widest">
                  Email Admin
                </label>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChangeInput("email", e.target.value)}
                  className="w-full px-5 py-4 md:px-6 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-4 mt-2 md:mt-0 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.2rem] md:rounded-[1.5rem] font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95 md:col-span-2 w-full"
              >
                <Save size={18} /> Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TabUmumUser;
