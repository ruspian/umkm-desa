import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Store, MapPin, Phone, Mail, User, Calendar } from "lucide-react";
import Link from "next/link";
import VerifyButton from "@/components/VerifyButton";
import Image from "next/image";

export default async function DetailKurasiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const toko = await prisma.toko.findUnique({
    where: { slug: slug },
    include: { user: true },
  });

  if (!toko) notFound();

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header & Navigasi */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/kurasi-toko"
            className="text-orange-600 text-sm font-bold hover:underline"
          >
            ← Kembali ke Antrean
          </Link>
          <h1 className="text-3xl font-black mt-2">Detail Tinjauan Toko</h1>
        </div>
        <div className="flex gap-3">
          {/* Komponen Client untuk Button Action */}
          <VerifyButton tokoId={toko.id} isVerified={toko.isVerified} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Profil Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 bg-gray-100 rounded-[2rem] overflow-hidden shrink-0 border-4 border-white shadow-md">
                {toko.logo ? (
                  <Image
                    src={toko.logo}
                    alt="Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Store size={48} />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  {toko.namaToko}
                </h2>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {toko.deskripsi}
                </p>
                <div className="pt-4 flex flex-wrap gap-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${toko.isVerified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {toko.isVerified ? "Terverifikasi" : "Menunggu Persetujuan"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Detail */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl h-fit">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Alamat Toko
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {toko.alamat || "Alamat belum diisi"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl h-fit">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  WhatsApp
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {toko.noWhatsapp}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Data Pemilik */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="font-black text-xl">Informasi Pemilik</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User size={18} className="text-orange-500" />
                  <p className="text-sm font-medium">
                    {toko.user?.name || "Nama tidak tersedia"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-orange-500" />
                  <p className="text-sm font-medium">{toko.user?.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-orange-500" />
                  <p className="text-sm font-medium">
                    Mendaftar:{" "}
                    {new Date(toko.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-10 text-white rotate-12">
              <Store size={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
