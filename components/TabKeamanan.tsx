import { UpdateSecurityConfig } from "@/lib/action";
import { AlertTriangle, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TabKeamanan = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangeInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Lengkapi semua data terlebih dahulu!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Password baru dan konfirmasi password harus sama!");
      return;
    }

    toast.promise(
      async () => {
        const result = await UpdateSecurityConfig(formData);

        if (!result.success) {
          throw new Error(result.message || "Terjadi kesalahan!");
        }

        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        return result;
      },
      {
        loading: "Memproses perubahan...",
        success: (res) => res.message,
        error: (err) => err.message,
      },
    );
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
          <Lock className="text-orange-600" /> Kata Sandi
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="max-w-xl space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Password Lama
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleChangeInput("oldPassword", e.target.value)
                }
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
                name="newPassword"
                value={formData.newPassword}
                onChange={(e) =>
                  handleChangeInput("newPassword", e.target.value)
                }
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChangeInput("confirmPassword", e.target.value)
                }
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm active:scale-95 transition-all"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 flex items-center gap-6">
        <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl text-red-600 shadow-sm">
          <AlertTriangle size={24} />
        </div>
        <div>
          <p className="font-black text-red-600">Zona Berbahaya</p>
          <p className="text-sm text-red-500/80 font-medium">
            Menghapus akun admin akan membuat kamu kehilangan akses ke platform
            secara permanen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TabKeamanan;
