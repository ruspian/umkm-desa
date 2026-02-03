import { SaveAddressSettingUser } from "@/lib/action";
import { SettingAlamatUser } from "@/types/user";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TabAlamatUser = ({ data }: { data: SettingAlamatUser }) => {
  const [formData, setFormData] = useState({
    id: data?.id || "",
    alamat: data?.alamat || "",
    whatsapp: data?.whatsapp || "",
  });

  const handleChangeInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.alamat || !formData.whatsapp || !formData.id) {
      toast.error("Lengkapi semua data terlebih dahulu!");
      return;
    }

    toast.promise(SaveAddressSettingUser(formData), {
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
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 grid grid-cols-1  gap-6 w-full">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Alamat Lengkap
                </label>
                <textarea
                  value={formData.alamat}
                  name="alamat"
                  onChange={(e) => handleChangeInput("alamat", e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  No WhatsApp
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  name="whatsapp"
                  onChange={(e) =>
                    handleChangeInput("whatsapp", e.target.value)
                  }
                  className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95"
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

export default TabAlamatUser;
