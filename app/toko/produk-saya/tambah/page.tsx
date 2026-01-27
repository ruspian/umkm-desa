import TambahPoductClient from "@/components/TambahProductClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TambahPoductPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "PENJUAL") {
    redirect("/");
  }

  const toko = await prisma.toko.findUnique({
    where: { userId: session.user.id },
    select: { isVerified: true },
  });

  return <TambahPoductClient isVerified={toko?.isVerified} />;
}
