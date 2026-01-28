import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UsersAdminClient from "@/components/UsersAdminClient";
import { Prisma, Role } from "@prisma/client";

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/");

  const params = await searchParams;

  const search = params.search || "";
  const role = params.role || "semua";

  const limit = 10;
  const page = Math.max(1, Number(params.page) || 1);

  // Validasi Role agar sesuai dengan Enum Prisma
  const validRoles: Role[] = ["ADMIN", "PENJUAL", "USER"];
  const selectedRole = validRoles.includes(role as Role)
    ? (role as Role)
    : undefined;

  const whereCondition: Prisma.UserWhereInput = {
    ...(selectedRole && { role: selectedRole }),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.user.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <UsersAdminClient
      users={users}
      totalCount={totalCount}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
