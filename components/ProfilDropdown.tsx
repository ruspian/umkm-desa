"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/basic-dropdown";
import { NavbarProps } from "@/types/navbar";
import { LogOut, Settings, User, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilDropdown({ user }: NavbarProps) {
  console.log("user", user);

  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-100 p-4">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer hover:bg-orange-500 rounded-lg p-2">
          <User className="h-4 w-4 md:h-5 md:w-5" />
        </DropdownTrigger>
        <DropdownContent align="end" className="w-56">
          {user?.role === "PENJUAL" ? (
            <DropdownItem
              className="gap-2"
              onClick={() => router.push("/toko")}
            >
              <UserCircle className="h-4 w-4" />
              Toko
            </DropdownItem>
          ) : (
            user?.role === "ADMIN" && (
              <DropdownItem
                className="gap-2"
                onClick={() => router.push("/admin")}
              >
                <UserCircle className="h-4 w-4" />
                Admin
              </DropdownItem>
            )
          )}
          <DropdownItem
            className="gap-2"
            onClick={() => router.push("/setting")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem onClick={() => signOut()} className="gap-2" destructive>
            <LogOut className="h-4 w-4" />
            Keluar
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
