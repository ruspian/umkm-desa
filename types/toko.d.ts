export type TokoType = {
  namaToko: string;
  deskripsi: string;
  logo: string;
  alamat: string;
  noWhatsapp: string;
};

export type TokoProps = {
  dataToko: TokoType | null;
  verified: boolean | undefined;
};
