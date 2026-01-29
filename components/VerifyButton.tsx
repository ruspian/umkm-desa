"use client";

import { VerifyToko } from "@/lib/action";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface VerifyButtonProps {
  tokoId: string;
  isVerified: boolean;
}

const VerifyButton = ({ tokoId, isVerified }: VerifyButtonProps) => {
  const router = useRouter();

  const handleToggle = async () => {
    toast.promise(VerifyToko(tokoId), {
      loading: "Memproses perubahan status...",
      success: (res) => {
        if (!res.success) throw new Error(res.message);
        router.refresh(); // Biar data di halaman server terupdate
        return res.message;
      },
      error: (err) => err.message || "Terjadi kesalahan!",
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-sm ${
        isVerified
          ? "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100"
          : "bg-green-600 text-white hover:bg-green-700 shadow-green-200"
      }`}
    >
      {isVerified ? (
        <>
          <XCircle size={18} />
          Cabut Verifikasi
        </>
      ) : (
        <>
          <CheckCircle size={18} />
          Setujui Toko
        </>
      )}
    </button>
  );
};

export default VerifyButton;
