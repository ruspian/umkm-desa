import HomeClient from "@/components/HomeClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Category, Prisma, StatusProduct } from "@prisma/client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const kategori = (params?.kategori as string) || "semua";
  const search = (params?.search as string) || "";

  const session = await auth();
  const user = session?.user ?? null;

  const ITEMS_PER_PAGE = 12;
  const currentPage = Math.max(1, Number(params?.page) || 1);

  const baseWhere = {
    status: "Approved" as StatusProduct,
    stock: { gt: 0 },
  };

  const whereClause = {
    ...baseWhere,
    ...(kategori !== "semua" ? { category: kategori as Category } : {}),
    ...(search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive" as Prisma.QueryMode,
              },
            },
          ],
        }
      : {}),
  };

  const totalItems = await prisma.product.count({ where: whereClause });
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Query Rekomendasi Hanya muncul jika tidak sedang mencari spesifik
  const featuredProducts = await prisma.product.findMany({
    where: { ...baseWhere },
    include: { toko: { select: { namaToko: true, logo: true } } },
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  // Query Semua Produk + Filter Kategori + Search
  const allProducts = await prisma.product.findMany({
    where: whereClause,
    orderBy: { updatedAt: "desc" },
    include: { toko: { select: { namaToko: true, logo: true } } },
  });

  return (
    <HomeClient
      featuredProducts={featuredProducts}
      allProducts={allProducts}
      totalPages={totalPages}
      currentPage={currentPage}
      user={user}
    />
  );
}
