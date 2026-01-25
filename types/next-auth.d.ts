import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: Role;
      tokoId: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: Role;
    tokoId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image: string;
    role: Role;
    tokoId?: string;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role?: Role;
  }
}
