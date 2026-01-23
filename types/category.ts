import {
  LayoutGrid,
  Leaf,
  LucideIcon,
  Milk,
  Scissors,
  Shirt,
  Utensils,
} from "lucide-react";

export type KategoriType =
  | "Semua"
  | "Makanan"
  | "Kerajinan"
  | "Minuman"
  | "Fashion"
  | "Lainnya";

export type KategoriMap = {
  name: KategoriType;
  icon: LucideIcon;
};

export const KategoriIcon: KategoriMap[] = [
  { name: "Semua", icon: LayoutGrid },
  { name: "Makanan", icon: Utensils },
  { name: "Minuman", icon: Milk },
  { name: "Kerajinan", icon: Scissors },
  { name: "Fashion", icon: Shirt },
  { name: "Lainnya", icon: Leaf },
];
