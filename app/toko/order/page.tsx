import { prisma } from "@/lib/prisma";
import { Package2 } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import OrderList from "@/components/OrderList";

export default async function TokoOrderPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Ambil data toko si user
  const toko = await prisma.toko.findUnique({
    where: { userId: session.user.id },
  });

  if (!toko) return <div>Toko tidak ditemukan.</div>;

  // Ambil semua order milik toko in
  const orders = await prisma.order.findMany({
    where: { tokoId: toko.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-4 bg-orange-100 text-orange-600 rounded-[1.5rem]">
          <Package2 size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tighter">
            Manajemen Pesanan
          </h1>
          <p className="text-gray-500 font-medium">
            Pantau dan konfirmasi pesanan masuk dari WhatsApp
          </p>
        </div>
      </div>

      <OrderList initialOrders={JSON.parse(JSON.stringify(orders))} />
    </main>
  );
}
