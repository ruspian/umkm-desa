import { CartStore } from "@/types/cart";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === newItem.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: 1 }] };
        }),
      updateQuantity: (id, type) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              const newQty =
                type === "plus" ? item.quantity + 1 : item.quantity - 1;
              // Minimal quantity adalah 1, jangan sampai nol atau minus
              return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
          }),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" },
  ),
);
