import HomeClient from "@/components/HomeClient";
import { prisma } from "@/lib/prisma";
import { Category, StatusProduct } from "@prisma/client";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const kategori = params?.kategori || "semua";

  const whereClause = {
    status: "Approved" as StatusProduct,
    ...(kategori && kategori !== "semua"
      ? { category: kategori as Category }
      : {}),
  };

  const products = await prisma.product.findMany({
    where: whereClause,
    take: 4,
    orderBy: { createdAt: "desc" },
    include: {
      toko: { select: { namaToko: true, logo: true } },
    },
  });

  return <HomeClient featuredProducts={products} />;
}
