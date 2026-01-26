import EditProductClient from "@/components/EditProductClient";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types/product";
import { notFound } from "next/navigation";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug: slug },
  });

  if (!product) {
    return notFound();
  }

  const formatedProduct: ProductType = {
    id: product.id,
    nama: product.name,
    price: product.price,
    stock: product.stock,
    status: product.status,
    images: product.images,
    discount: product.discount,
    category: product.category,
    description: product.description,
    slug: product.slug,
  };
  return <EditProductClient product={formatedProduct} />;
};

export default EditProductPage;
