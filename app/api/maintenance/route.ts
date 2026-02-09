export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const config = await prisma.webConfig.findUnique({
    where: { id: "site_configuration_id" },
  });

  return NextResponse.json({ isMaintenance: config?.isMaintenance ?? false });
}
