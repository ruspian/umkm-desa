export interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  color: string;
}

export type PenjualDashboardProps = {
  stats: StatItem[];
  lowStockList: Pick<
    ProductType,
    "slug" | "name" | "stock" | "images" | "id"
  >[];
  tip: string;
  lastUpdate: string;
};
