import PenjualProfileClient from "@/components/PenjualProfileClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function PenjualProfilePage() {
  const session = await auth();

  if (!session?.user || session?.user.role !== "PENJUAL") {
    redirect("/");
  }

  const dataToko = await prisma.toko.findUnique({
    where: { userId: session.user.id },
  });

  const formatedToko = {
    namaToko: dataToko?.namaToko || "",
    deskripsi: dataToko?.deskripsi || "",
    logo: dataToko?.logo || "",
    alamat: dataToko?.alamat || "",
    noWhatsapp: dataToko?.noWhatsapp || "",
  };

  const tokoVerified = dataToko?.isVerified;

  return (
    <PenjualProfileClient dataToko={formatedToko} verified={tokoVerified} />
  );
}
