"use client";

import { formatCurrency } from "@/lib/formatRupiah";
import { useCart } from "@/store/cart";
import { CartItem } from "@/types/cart";
import { Trash2, Plus, Minus, MessageCircle, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function KeranjangPage() {
  const { items, updateQuantity, removeItem } = useCart();

  // Kelompokkan barang berdasarkan nama toko
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.tokoName]) acc[item.tokoName] = [];
      acc[item.tokoName].push(item);
      return acc;
    },
    {} as Record<string, CartItem[]>,
  );

  // Fungsi Kirim WA per Toko
  const handleCheckoutWA = (tokoName: string, itemsToko: CartItem[]) => {
    const rawWa = itemsToko[0].tokoWa;

    // Bersihkan nomor dari spasi, strip, atau karakter non-angka
    let formattedWa = rawWa.replace(/\D/g, "");

    // Ubah awalan 0 menjadi 62
    if (formattedWa.startsWith("0")) {
      formattedWa = "62" + formattedWa.slice(1);
    }

    let message = `Halo *${tokoName}*, saya ingin memesan produk berikut dari AsliSini:\n\n`;

    let total = 0;
    itemsToko.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      message += `${index + 1}. *${item.name}* (${item.quantity}x) - ${formatCurrency(subtotal)}\n`;
    });

    message += `\n*Total Pesanan: ${formatCurrency(total)}*\n\nApakah stok tersedia?`;

    window.open(
      `https://wa.me/${formattedWa}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-10">
        <div className="bg-gray-100 p-8 rounded-[3rem] text-gray-400 mb-6">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-2xl font-black italic">Keranjangmu Kosong</h2>
        <p className="text-gray-500 font-medium mt-2">
          Yuk, cari produk UMKM terbaik di desa!
        </p>
        <Link
          href="/"
          className="mt-8 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black shadow-lg hover:bg-orange-700 transition-all"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-black italic tracking-tighter mb-10">
        Keranjang <span className="text-orange-600">Belanja</span>
      </h1>

      <div className="space-y-12">
        {Object.entries(groupedItems).map(([tokoName, products]) => (
          <div
            key={tokoName}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm"
          >
            {/* Header Toko */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-50 dark:border-gray-800 pb-5">
              <div>
                <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">
                  Penjual
                </p>
                <h3 className="text-xl font-black">{tokoName}</h3>
              </div>
              <button
                onClick={() => handleCheckoutWA(tokoName, products)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl font-black text-sm transition-all"
              >
                <MessageCircle size={18} /> Checkout via WA
              </button>
            </div>

            {/* Daftar Produk di Toko Ini */}
            <div className="space-y-6">
              {products.map((item) => (
                <div key={item.id} className="flex items-center gap-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-orange-600 font-black">
                      {formatCurrency(item.price)}
                    </p>

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-100 dark:border-gray-700">
                        <button
                          onClick={() => updateQuantity(item.id, "minus")}
                          className="p-1 hover:text-orange-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-black text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "plus")}
                          className="p-1 hover:text-orange-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
