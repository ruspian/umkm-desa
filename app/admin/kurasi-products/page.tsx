import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CheckCircle, XCircle, Eye, ShoppingBag, Clock } from "lucide-react";
import Image from "next/image";

export default async function ProductCurationPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");

  // Ambil produk yang statusnya 'PENDING' atau baru didaftarkan
  // Asumsi di skema Prisma ada field 'status' (PENDING, APPROVED, REJECTED)
  const pendingProducts = await prisma.product.findMany({
    where: { status: "Pending" },
    include: {
      toko: {
        select: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-10 max-w-400 mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            Kurasi <span className="text-orange-600">Produk</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Review dan setujui produk UMKM agar tampil di halaman utama.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <Clock className="text-orange-500" size={20} />
          <span className="font-black text-gray-900 dark:text-white">
            {pendingProducts.length} Menunggu Antrean
          </span>
        </div>
      </div>

      {/* Grid Produk */}
      {pendingProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <ShoppingBag size={64} className="text-gray-200 mb-4" />
          <p className="text-gray-400 font-bold italic">
            Semua produk sudah dikurasi. Belum ada produk baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {pendingProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                <Image
                  src={product.images}
                  alt={product.name}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-orange-600 font-black text-lg mt-1">
                      Rp {product.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <button className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-orange-600 transition-colors">
                    <Eye size={20} />
                  </button>
                </div>

                <div className="flex items-center gap-3 py-4 border-y border-gray-50 dark:border-gray-800">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                    {product.toko.user.name?.charAt(0)}
                  </div>
                  <div className="text-xs">
                    <p className="text-gray-400 font-medium tracking-tight">
                      Penjual:
                    </p>
                    <p className="text-gray-900 dark:text-white font-bold">
                      {product.toko.user.name}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 bg-gray-50 dark:bg-gray-800 text-red-500 rounded-2xl font-black text-sm hover:bg-red-50 transition-all active:scale-95">
                  <XCircle size={18} /> Tolak
                </button>
                <button className="flex items-center justify-center gap-2 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-black text-sm hover:bg-orange-600 dark:hover:bg-orange-600 dark:hover:text-white transition-all shadow-lg active:scale-95">
                  <CheckCircle size={18} /> Setujui
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
