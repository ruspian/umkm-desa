export type ProductType = {
  id: string;
  nama: string;
  price: number;
  description: string;
  discount: number;
  stock: number;
  images: string;
  category: string;
  status?: "Pending" | "Approved" | "Rejected";
};
