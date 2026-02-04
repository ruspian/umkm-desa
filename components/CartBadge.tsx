"use client";

import { useCart } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const CartBadge = () => {
  const items = useCart((state) => state.items);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true, // Hasil saat di Browser
    () => false, // Hasil saat di Server (SSR)
  );

  // Hitung total items Hanya jika di client, kalau di server 0
  const totalItems = isClient
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <Link
      href="/keranjang"
      className="relative p-3 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 rounded-2xl transition-all"
    >
      <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
      <span className="absolute top-2 right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[10px] font-black text-white items-center justify-center">
          {totalItems > 0 && totalItems > 9 ? "9+" : totalItems}
        </span>
      </span>
    </Link>
  );
};

export default CartBadge;
