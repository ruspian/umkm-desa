import { Role } from "@prisma/client";

export interface NavbarUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: Role;
  tokoId?: string | null;
}

export type NavbarProps = {
  user: NavbarUser | null;
};
