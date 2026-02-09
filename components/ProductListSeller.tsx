"use client";

import { formatCurrency } from "@/lib/formatRupiah";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "./Pagination";

type ProductList = {
  id: string;
  name: string;
  price: number;
  images: string;
  slug: string;
  discount: number;
  hasDiscount: boolean;
  finalPrice: number;
};

interface ProductListSellerProps {
  products: ProductList[];
  totalPage: number;
  currentPage: number;
}
const ProductListSeller = ({
  products,
  totalPage,
  currentPage,
}: ProductListSellerProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-10">
        <h2 className="text-3xl font-black tracking-tight">
          Semua <span className="text-orange-600">Produk Toko</span>
        </h2>
        <div className="h-0.5 flex-1 bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product?.id}
            className="group bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 p-4 transition-all hover:shadow-2xl"
          >
            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gray-100 mb-4">
              <Image
                src={product?.images}
                alt="Produk"
                width={400}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />

              {product?.hasDiscount && (
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black shadow-lg">
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>
            <h3 className="font-black text-lg line-clamp-1">{product?.name}</h3>
            <p className="text-orange-600 font-black mt-2 flex justify-between">
              <span className="text-sm font-black text-gray-900 dark:text-white">
                {formatCurrency(product?.finalPrice)}
              </span>
              {product?.hasDiscount && (
                <p className="text-[10px] text-gray-400 line-through">
                  {formatCurrency(product.price)}
                </p>
              )}
            </p>
            <Link
              href={`/product/${product?.slug}`}
              className="mt-4 block w-full py-3 text-center bg-gray-50 dark:bg-gray-800 rounded-xl font-black text-sm hover:bg-orange-600 hover:text-white transition-all"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPage}
          handlePageChange={handleChangePage}
        />
      </div>
    </section>
  );
};

export default ProductListSeller;
