"use client";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/basic-dropdown";
import { CreditCard, LogOut, Settings, User, UserCircle } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProfilDropdown() {
  return (
    <div className="flex items-center justify-center min-h-100 p-4">
      <Dropdown>
<<<<<<< HEAD
        <DropdownTrigger className="cursor-pointer text-background dark:text-foreground hover:bg-orange-500 rounded-2xl p-2">
          <User className="h-5 w-5 " />
=======
        <DropdownTrigger className="cursor-pointer text-background dark:text-foreground hover:bg-orange-500 rounded-full p-2">
          <User className="h-3 w-3 md:h-6 md:w-6 " />
>>>>>>> 6e6c6e3c7aae4aa30b7e5853d49ce3525439116f
        </DropdownTrigger>
        <DropdownContent align="end" className="w-56">
          <DropdownItem className="gap-2">
            <UserCircle className="h-4 w-4" />
            Profile
          </DropdownItem>
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
