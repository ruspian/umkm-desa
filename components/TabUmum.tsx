import { SaveGeneralConfig } from "@/lib/action";
import { UmumType } from "@/types/web.config";
import { Globe, Save, Shield, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TabUmum = ({ webConfig }: { webConfig: UmumType }) => {
  const [formData, setFormData] = useState({
    id: webConfig?.id || "",
    name: webConfig?.siteName || "",
    slogan: webConfig?.slogan || "",
    phone: webConfig?.contactWa || "",
  });
  const [isMaintenance, setIsMaintenance] = useState(webConfig?.isMaintenance);
  const [isRegister, setIsRegister] = useState(webConfig?.isOpenRegistration);

  const handleChangeInput = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      id: formData.id,
      siteName: formData.name,
      slogan: formData.slogan,
      contactWa: formData.phone,
      isMaintenance: isMaintenance,
      isOpenRegistration: isRegister,
    };

    toast.promise(SaveGeneralConfig(payload), {
      loading: "Memproses perubahan...",
      success: (res) => res.message,
      error: (err) => err.message,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
                value={formData?.name}
                onChange={(e) => handleChangeInput("name", e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Slogan
              </label>
              <input
                type="text"
                value={formData?.slogan}
                onChange={(e) => handleChangeInput("slogan", e.target.value)}
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
                  value={formData?.phone}
                  onChange={(e) => handleChangeInput("phone", e.target.value)}
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
            <div className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 dark:border-gray-800">
              <div>
                <p className="font-black text-gray-900 dark:text-white">
                  Pendaftaran Penjual
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Izinkan UMKM mendaftar akun baru.
                </p>
              </div>
              <div
                onClick={() => setIsRegister(!isRegister)}
                className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer ${isRegister ? "bg-orange-600" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all ${isRegister ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-6 rounded-3xl border border-gray-50 dark:border-gray-800">
              <div>
                <p className="font-black text-gray-900 dark:text-white">
                  Mode Pemeliharaan
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Tampilkan halaman &quot;Under Maintenance&quot; ke publik.
                </p>
              </div>
              <div
                onClick={() => setIsMaintenance(!isMaintenance)}
                className={`w-14 h-8 rounded-full p-1 transition-all cursor-pointer ${isMaintenance ? "bg-orange-600" : "bg-gray-200 dark:bg-gray-700"}`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all ${isMaintenance ? "translate-x-6" : "translate-x-0"}`}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95"
        >
          <Save size={18} /> Simpan Perubahan
        </button>
      </div>
    </form>
  );
};

export default TabUmum;
