"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/formatRupiah";
import { toast } from "sonner";
import { CheckCircle2, Clock, Package } from "lucide-react";
import { confirmOrder } from "@/lib/action";
import { OrderItem } from "@/types/order";

export default function OrderList({
  initialOrders,
}: {
  initialOrders: OrderItem[];
}) {
  const [activeTab, setActiveTab] = useState<"PENDING" | "COMPLETED">(
    "PENDING",
  );
  const filteredOrders = initialOrders.filter((o) => o.status === activeTab);

  const handleConfirm = async (id: string) => {
    const res = await confirmOrder(id);
    if (res.success) {
      toast.success("Pesanan berhasil dikonfirmasi & stok berkurang!");
      // Kamu bisa tambahkan router.refresh() di sini
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("PENDING")}
          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
            activeTab === "PENDING"
              ? "bg-white shadow-sm text-orange-600"
              : "text-gray-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock size={16} /> Pesanan Masuk
          </div>
        </button>
        <button
          onClick={() => setActiveTab("COMPLETED")}
          className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
            activeTab === "COMPLETED"
              ? "bg-white shadow-sm text-emerald-600"
              : "text-gray-500"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} /> Selesai
          </div>
        </button>
      </div>

      {/* List Orders */}
      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed rounded-[3rem] text-gray-400">
            <Package className="mx-auto mb-4 opacity-20" size={48} />
            <p className="font-bold">Belum ada pesanan di kategori ini</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest text-gray-500">
                      ID: {order.id.slice(-6)}
                    </span>
                  </div>

                  {/* List Item yang dibeli */}
                  <div className="space-y-2">
                    {(order.items as unknown as OrderItem[]).map(
                      (item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm font-medium"
                        >
                          <span className="text-gray-600 dark:text-gray-400">
                            {item.name}{" "}
                            <b className="text-gray-900 dark:text-white">
                              x{item.quantity}
                            </b>
                          </span>
                          <span>
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Total Bayar
                    </p>
                    <p className="text-xl font-black text-orange-600">
                      {formatCurrency(order.totalPrice as number)}
                    </p>
                  </div>
                </div>

                {/* Tombol Aksi */}
                {activeTab === "PENDING" && (
                  <div className="flex md:flex-col justify-end gap-2">
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-orange-600 transition-all flex items-center gap-2"
                    >
                      Konfirmasi Terjual
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
