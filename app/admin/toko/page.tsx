import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import TokoAdminClient from "@/components/TokoAdminClient";

export default async function ManageTokoPage({
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

  const whereCondition: Prisma.TokoWhereInput = {
    isVerified: true,
    ...(search
      ? {
          OR: [
            {
              namaToko: { contains: search, mode: "insensitive" },
            },
          ],
        }
      : {}),
  };

  const [toko, totalCount, totalProduct] = await prisma.$transaction([
    prisma.toko.findMany({
      where: whereCondition,
      include: { user: true },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.toko.count({
      where: whereCondition,
    }),
    prisma.toko.count({
      where: {
        ...whereCondition,
        products: {
          some: {}, // Hitung toko yang minimal punya satu produk
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <TokoAdminClient
      toko={toko}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
      totalProduct={totalProduct}
    />
  );
}
