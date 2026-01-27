import ProductSayaClient from "@/components/ProductSayaClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma, StatusProduct } from "@prisma/client";
import { redirect } from "next/navigation";

// Next.js 15: searchParams adalah Promise
export default async function MyProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const params = await searchParams; // Tunggu promise searchParams

  const search = typeof params.search === "string" ? params.search : undefined;
  const status = typeof params.status === "string" ? params.status : "semua";
  const limit = 10;
  const page = Math.max(1, Number(params.page) || 1);

  const tokoId = session?.user.tokoId;

  if (!session?.user || session?.user.role !== "PENJUAL") {
    return redirect("/");
  }

  // Bangun kondisi query yang bersih
  const whereCondition: Prisma.ProductWhereInput = {
    tokoId: tokoId,
    // Gunakan pengecekan kondisional yang aman untuk Prisma
    ...(status && status !== "semua"
      ? { status: status as StatusProduct }
      : {}),
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {}),
  };
  // Transaction untuk ambil Data sekaligus Total Count (buat pagination di UI)
  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where: whereCondition }),
  ]);

  const formatedProducts = products.map((product) => ({
    id: product.id,
    nama: product.name,
    price: product.price,
    stock: product.stock,
    status: product.status,
    images: product.images,
    discount: product.discount,
    category: product.category,
    description: product.description,
    slug: product.slug,
  }));

  const totalPages = Math.ceil(totalCount / limit);

  // Kirim totalCount juga ke Client supaya bisa bikin tombol 'Next/Prev'
  return (
    <ProductSayaClient
      products={formatedProducts}
      totalCount={totalCount}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
