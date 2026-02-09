import KurasiTokoClient from "@/components/KurasiTokoClient";
import { prisma } from "@/lib/prisma";

export default async function KurasiTokoPage() {
  // Ambil data toko yang belum diverifikasi
  const daftarToko = await prisma.toko.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return <KurasiTokoClient daftarToko={daftarToko} />;
}
