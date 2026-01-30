import ConfigurationClient from "@/components/ConfigurationClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  const webConfig = await prisma.webConfig.findFirst();
  const profilAdmin = await prisma.user.findUnique({
    where: { id: session?.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      role: true,
      email: true,
    },
  });

  if (profilAdmin?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <ConfigurationClient webConfig={webConfig} profilAdmin={profilAdmin} />
  );
}
