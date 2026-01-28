import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductAdminClient from "@/components/ProductAdminClient";
import { Prisma } from "@prisma/client";

export default async function ManageProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");

  const params = await searchParams;

  const search = params?.search || "";

  const limit = 10;
  const page = Math.max(1, Number(params?.page) || 1);

  const whereCondition: Prisma.ProductWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          {
            toko: {
              namaToko: { contains: search, mode: "insensitive" },
            },
          },
        ],
      }
    : {};

  const [products, totalCount] = await prisma.$transaction([
    prisma.product.findMany({
      where: whereCondition,
      include: {
        toko: {
          include: { user: true },
        },
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <ProductAdminClient
      products={products}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
