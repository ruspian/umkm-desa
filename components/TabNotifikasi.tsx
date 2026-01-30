import { Bell, Save } from "lucide-react";

const TabNotifikasi = () => {
  return (
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
      <button className="flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-[1.5rem] font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-xl active:scale-95">
        <Save size={18} /> Simpan Perubahan
      </button>
    </div>
  );
};

export default TabNotifikasi;
