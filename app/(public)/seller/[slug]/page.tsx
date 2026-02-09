import ProductListSeller from "@/components/ProductListSeller";
import { prisma } from "@/lib/prisma";
import { MapPin, Package } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function TokoProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sParams = await searchParams;

  const page = Math.max(1, Number(sParams?.page) || 1);

  const ITEMS_PER_PAGE = 12;

  const sellerInfo = await prisma.toko.findUnique({
    where: { slug: slug },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          price: true,
          discount: true,
          images: true,
          slug: true,
        },
        take: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!sellerInfo) {
    return notFound();
  }

  const seller = {
    name: sellerInfo?.namaToko as string,
    location: sellerInfo?.alamat,
    bio: sellerInfo?.deskripsi,
    image: sellerInfo?.logo as string,
    joined: sellerInfo?.createdAt,
    totalProducts: sellerInfo?._count?.products,
  };

  // Olah data produk di dalam map
  const products = sellerInfo?.products.map((product) => {
    const price = product.price ?? 0;
    const discount = product.discount ?? 0;
    const hasDiscount = discount > 0;
    const finalPrice = hasDiscount ? price - (price * discount) / 100 : price;

    return {
      id: product.id,
      name: product.name,
      price: price,
      discount: discount as number,
      hasDiscount: hasDiscount,
      finalPrice: finalPrice,
      images: product.images,
      slug: product.slug,
    };
  });

  const totalPage = Math.ceil(seller.totalProducts / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="bg-gray-50 dark:bg-gray-900/50 py-16 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <Image
            src={seller.image}
            alt={seller.name}
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 rounded-[3rem] shadow-2xl border-8 border-white dark:border-gray-800"
          />
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                {seller.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-500">
                <span className="flex items-center gap-1 text-orange-600">
                  <MapPin size={16} /> {seller.location}
                </span>
                <span className="flex items-center gap-1">
                  <Package size={16} /> {seller.totalProducts} Produk
                </span>
              </div>
            </div>
            <p className="max-w-2xl text-gray-500 dark:text-gray-400 font-medium italic">
              &quot;{seller.bio}&quot;
            </p>
          </div>
        </div>
      </section>

      <ProductListSeller
        products={products}
        totalPage={totalPage}
        currentPage={page}
      />
    </div>
  );
}
