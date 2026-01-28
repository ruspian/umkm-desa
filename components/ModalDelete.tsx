import { Trash2, AlertCircle } from "lucide-react";
import { ModalDeleteProps } from "@/types/product";
import { useState } from "react";

export default function ModalDelete({ onConfirm, name }: ModalDeleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Tombol Pemicu */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 flex items-center justify-center  text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
      >
        <Trash2 size={18} />
      </button>

      {/* Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl space-y-6 scale-in-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={40} />
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Hapus Produk?
              </h2>
              <p className="text-gray-500 text-sm">
                Kamu yakin ingin menghapus{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  &quot;{name}&quot;
                </span>
                ? Data yang dihapus tidak bisa dikembalikan.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 dark:shadow-none transition-all disabled:bg-red-400"
              >
                {loading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
