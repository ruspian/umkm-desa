"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/basic-dropdown";
import { CreditCard, LogOut, Settings, User, UserCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilDropdown() {
  const session = useSession();

  const { data } = session;
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-100 p-4">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer text-background dark:text-foreground hover:bg-orange-500 rounded-full p-2">
          <User className="h-5 w-5" />
        </DropdownTrigger>
        <DropdownContent align="end" className="w-56">
          {data?.user.role === "PENJUAL" ? (
            <DropdownItem
              className="gap-2"
              onClick={() => router.push("/toko")}
            >
              <UserCircle className="h-4 w-4" />
              Toko
            </DropdownItem>
          ) : (
            <DropdownItem className="gap-2">
              <UserCircle className="h-4 w-4" />
              Admin
            </DropdownItem>
          )}
          <DropdownItem className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </DropdownItem>
          <DropdownItem className="gap-2">
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
