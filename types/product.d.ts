import { KategoriType } from "./category";

export type ProductType = {
  id: string;
  nama: string;
  price: number;
  description: string;
  discount: number;
  stock: number;
  images: string;
  category: KategoriType;
  slug?: string;
  status?: "Pending" | "Approved" | "Rejected";
};

export type ProductProps = {
  products: ProductType[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

type EditProductProps = {
  product: ProductType;
};
