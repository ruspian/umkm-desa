"use client";

import { useState } from "react";
import { UserPlus, X, Mail, User, Shield } from "lucide-react";
import { toast } from "sonner";
import { CreateNewUser } from "@/lib/action";
import { UserFormInput } from "@/types/user";

export default function ModaltambahUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      async () => {
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const res = await CreateNewUser(data as UserFormInput);

        if (!res.success) {
          setLoading(false);
          throw new Error(res.message || "Terjadi kesalahan!");
        }

        (e.target as HTMLFormElement).reset();
        setLoading(false);
        setIsOpen(false);

        return res;
      },
      {
        loading: "Menambahkan pengguna...",
        success: (res) => res.message,
        error: (err) => err.message,
      },
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all shadow-xl active:scale-95"
      >
        <UserPlus size={18} />
        Tambah Pengguna
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black">
                  Tambah <span className="text-orange-600">User</span>
                </h2>
                <p className="text-gray-400 text-sm font-medium">
                  Daftarkan pengguna baru ke sistem.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input Nama */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Contoh: Ruspian Majid"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                  />
                </div>
              </div>

              {/* Input Email */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="pian@aslisini.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/20 font-medium"
                  />
                </div>
              </div>

              {/* Pilih Role */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">
                  Akses Role
                </label>
                <div className="relative">
                  <Shield
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <select
                    name="role"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-orange-500/20 font-bold appearance-none"
                  >
                    <option value="USER">User</option>
                    <option value="PENJUAL">Penjual</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>

              {/* Password Default */}
              <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">
                  Catatan
                </p>
                <p className="text-xs text-orange-700 dark:text-orange-400 font-medium italic">
                  Password default adalah{" "}
                  <span className="font-bold">123456</span>. Pengguna bisa
                  mengubahnya nanti.
                </p>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[2rem] font-black hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan Pengguna"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
