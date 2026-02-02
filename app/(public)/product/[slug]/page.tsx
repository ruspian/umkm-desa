import DetailProductClient from "@/components/DetailProductClient";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

const DetailProduct = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const session = await auth();

  const { slug } = await params;

  if (!session?.user) {
    redirect("/");
  }

  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      toko: {
        select: {
          id: true,
          logo: true,
          namaToko: true,
          isVerified: true,
          alamat: true,
          noWhatsapp: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return <DetailProductClient product={product} />;
};

export default DetailProduct;
