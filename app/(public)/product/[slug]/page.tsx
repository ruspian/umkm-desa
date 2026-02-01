import DetailProductClient from "@/components/DetailProductClient";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

const DetailProduct = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

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
