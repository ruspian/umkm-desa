import { ImagePlus, Hash, Type } from "lucide-react";

export default function TambahPoductPage() {
  return (
    <div className="p-8 md:p-12 max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-black tracking-tight text-gray-900">
          Upload <span className="text-orange-600">Produk Baru</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Pastikan foto produk cerah agar menarik minat pembeli.
        </p>
      </header>

      <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
        {/* Dropzone Foto */}
        <div className="space-y-4">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
            Foto Produk
          </label>
          <div className="border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-12 flex flex-col items-center justify-center group hover:border-orange-200 transition-colors cursor-pointer bg-gray-50/50 dark:bg-gray-800/30">
            <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center text-orange-600 shadow-xl group-hover:scale-110 transition-transform mb-4">
              <ImagePlus size={32} />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              Klik untuk upload foto
            </p>
            <p className="text-sm text-gray-400">
              Maksimal 2MB, format JPG atau PNG
            </p>
          </div>
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
                placeholder="Contoh: Keripik Singkong Pedas"
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
                placeholder="15000"
                className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-bold outline-none focus:ring-2 ring-orange-500/20"
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2">
              Deskripsi Produk
            </label>
            <textarea
              rows={5}
              placeholder="Jelaskan bahan baku, berat, atau keunikan produk kamu..."
              className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-3xl font-bold outline-none focus:ring-2 ring-orange-500/20 resize-none"
            />
          </div>
        </div>

        <button className="w-full py-5 bg-orange-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-orange-200 dark:shadow-none hover:bg-orange-700 transition-all active:scale-95">
          Daftarkan Produk Sekarang
        </button>
      </div>
    </div>
  );
}
