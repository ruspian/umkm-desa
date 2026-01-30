import { Role } from "@prisma/client";

export type Users = {
  id: string | null;
  name: string | null;
  email: string | null;
  role: Role | null;
  createdAt?: Date | null;
  password?: string | null;
  image?: string | null;
};

export type UserProps = {
  users: Users[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type UserFormInput = {
  name: string;
  email: string;
  role: Role;
};

export type UserConfigType = {
  name: string;
  email: string;
  image: string;
};
