"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeUserRole } from "@/lib/action";
import { Role } from "@prisma/client";
import { MousePointer2, Store, User, UserStar } from "lucide-react";
import { toast } from "sonner";

export default function RoleDropdown({ userId }: { userId: string }) {
  const handleRoleChange = async (role: string) => {
    if (role === "role") return;

    toast.promise(
      async () => {
        const result = await ChangeUserRole(userId, role as Role);

        if (!result.success) {
          throw new Error(result.message || "Terjadi kesalahan!");
        }

        return result;
      },
      {
        loading: "Mengubah role...",
        success: (data) => data.message,
        error: (err) => err.message,
      },
    );
  };
  return (
    <Select
      defaultValue="role"
      indicatorPosition="right"
      onValueChange={handleRoleChange}
    >
      <SelectTrigger className="w-30">
        <SelectValue placeholder="Select framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="role">
          <span className="flex items-center gap-2">
            <MousePointer2 className="size-4 opacity-60" />
            <span>Role</span>
          </span>
        </SelectItem>
        <SelectItem value="ADMIN">
          <span className="flex items-center gap-2">
            <UserStar className="size-4 opacity-60" />
            <span>Admin</span>
          </span>
        </SelectItem>
        <SelectItem value="PENJUAL">
          <span className="flex items-center gap-2">
            <Store className="size-4 opacity-60" />
            <span>Penjual</span>
          </span>
        </SelectItem>
        <SelectItem value="USER">
          <span className="flex items-center gap-2">
            <User className="size-4 opacity-60" />
            <span>User</span>
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
