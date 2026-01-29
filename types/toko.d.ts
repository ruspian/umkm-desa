export type TokoType = {
  id?: string;
  namaToko: string;
  deskripsi: string | null;
  logo: string | null;
  alamat: string | null;
  user?: {
    name?: string | null;
    email: string | null;
    image?: string | null;
  } | null;
  noWhatsapp: string | null;
  isVerified?: boolean;
  createdAt?: Date;
};

export type TokoProps = {
  dataToko: TokoType | null;
  verified: boolean | undefined;
};

export type TokoAdminProps = {
  toko: TokoType[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  totalProduct: number;
};
