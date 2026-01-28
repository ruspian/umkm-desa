import { KategoriType } from "./category";

export type ProductType = {
  id: string;
  nama?: string;
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
  verified?: boolean | undefined;
};

type EditProductProps = {
  product: ProductType;
  verified?: boolean | undefined;
};

export interface ModalDeleteProps {
  name: string;
  onConfirm: () => Promise<void> | void;
}

export type ProductAdminType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  discount: number;
  images: string;
  createdAt: Date;
  toko: {
    id: string;
    namaToko: string;
    user: {
      name: string | null;
      email: string | null;
    } | null;
  } | null;
};

export type ProductAdminProps = {
  products: ProductAdminType[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
};
