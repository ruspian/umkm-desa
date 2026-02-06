"use client";

import {
  MessageCircle,
  ShieldCheck,
  ChevronLeft,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatCurrency } from "@/lib/formatRupiah";
import { toast } from "sonner";
import { HomeProductType } from "@/types/product";
import { NavbarUser } from "@/types/navbar";

type DetailProductProps = {
  product: HomeProductType;
  user: NavbarUser | null;
};

const DetailProductClient = ({ product, user }: DetailProductProps) => {
  const addItem = useCart((state) => state.addItem);

  const isOutOfStock = product.stock <= 0;

  const handleWhatsAppDirect = () => {
    const message = `Halo ${product?.toko?.namaToko}, saya tertarik dengan produk *${product?.name}* seharga ${formatCurrency(priceWithDiscount)}. Apakah stok masih tersedia?`;
    window.open(
      `https://wa.me/${product?.toko?.noWhatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: product!.id,
      name: product!.name,
      price: priceWithDiscount,
      image: product!.images,
      tokoName: product!.toko?.namaToko as string,
      tokoWa: product!.toko?.noWhatsapp || "",
      quantity: 1,
      stock: product!.stock,
      tokoId: product!.toko?.id as string,
    });
    toast.success("Berhasil masuk keranjang!");
  };

  const price = product?.price ?? 0;
  const discount = product?.discount ?? 0;
  const isDiscount = discount > 0;

  const priceWithDiscount = isDiscount
    ? price - (price * discount) / 100
    : price;
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 font-bold mb-8 hover:text-orange-600 transition-colors"
      >
        <ChevronLeft size={20} /> Kembali Belanja
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gambar Produk */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-100 border border-gray-100 dark:border-gray-800 shadow-2xl">
            <Image
              src={product?.images as string}
              alt={product?.name as string}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/*  Info Produk */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
              {product?.name}
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-black text-orange-600">
                {formatCurrency(priceWithDiscount)}
              </p>

              {isDiscount && (
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 line-through">
                  {formatCurrency(price)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-emerald-500"}`}
              />
              <p className="text-xs font-bold text-gray-500">
                {isOutOfStock ? "Stok Habis" : `Tersisa ${product.stock} unit`}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800">
            <h3 className="font-black text-gray-900 dark:text-white mb-2 uppercase text-xs tracking-widest">
              Deskripsi Produk
            </h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              {product?.description}
            </p>
          </div>

          {/* Info Penjual */}
          <Link
            href={`/seller/${product?.toko?.slug}`}
            className="flex items-center justify-between p-6 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] hover:border-orange-500 transition-all group"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product?.toko?.logo as string}
                alt={product?.toko?.namaToko as string}
                width={56}
                height={56}
                className="w-14 h-14 rounded-2xl shadow-lg"
              />
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Penjual
                </p>
                <h4 className="font-black text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors">
                  {product?.toko?.namaToko}
                </h4>
                <p className="text-xs text-gray-500 font-medium">
                  {product?.toko?.alamat}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Tombol Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex-1 py-5 bg-gray-900  rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 ${
                isOutOfStock || !user
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 text-white hover:bg-orange-600 shadow-xl"
              }`}
            >
              {isOutOfStock ? (
                "Maaf, Stok Habis"
              ) : !user ? (
                "Anda Belum Login"
              ) : (
                <>
                  <ShoppingBag size={24} /> Masukkan Keranjang
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="flex-1 py-5 bg-green-600 text-white rounded-[2rem] font-black text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} /> Tanya Penjual
            </button>
          </div>

          <div className="flex items-center gap-4 py-4 border-t border-gray-100 dark:border-gray-800">
            <ShieldCheck className="text-emerald-500" size={24} />
            <p className="text-sm font-bold text-gray-500 italic">
              Produk ini telah melewati verifikasi kurasi tim ASLISINI.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default DetailProductClient;
