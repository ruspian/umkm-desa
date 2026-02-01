export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  tokoName: string;
  tokoWa: string;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, type: "plus" | "minus") => void;
}
