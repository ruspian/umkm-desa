import { StatusOrder } from "@prisma/client";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  status?: StatusOrder;
  createAt?: string;
  totalPrice?: number;
  items?: OrderItem[];
}
