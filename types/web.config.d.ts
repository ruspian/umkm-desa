export type UmumType = {
  id?: string;
  siteName: string | null;
  slogan: string | null;
  contactWa: string | null;
  isMaintenance: boolean;
  isOpenRegistration: boolean;
};

export type ProfilAdminType = {
  id?: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

export type SecurityType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ConfigurationTypeProps = {
  webConfig?: UmumType | null;
  profilAdmin?: ProfilAdminType | null;
};
