import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import KurasiProductClient from "@/components/KurasiProductClient";

export default async function ProductCurationPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");

  // Ambil produk yang statusnya 'PENDING' atau baru didaftarkan
  // Asumsi di skema Prisma ada field 'status' (PENDING, APPROVED, REJECTED)
  const pendingProducts = await prisma.product.findMany({
    where: { status: "Pending" },
    include: {
      toko: {
        select: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return <KurasiProductClient pendingProducts={pendingProducts} />;
}
