import { prisma } from "@/lib/prisma";
import { Settings } from "lucide-react";
import { redirect } from "next/navigation";

export default async function MaintenancePage() {
  const result = await prisma.webConfig.findUnique({
    where: { id: "site_configuration_id" },
    select: {
      isMaintenance: true,
    },
  });

  if (!result || !result.isMaintenance) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Ikon Animasi */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-orange-200 dark:bg-orange-900/20 blur-3xl rounded-full scale-150 animate-pulse" />
          <div className="relative bg-orange-600 p-6 rounded-[2.5rem] shadow-2xl">
            <Settings className="text-white w-12 h-12 animate-spin-slow" />
          </div>
        </div>

        {/* Konten Teks */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
            Web Sedang <span className="text-orange-600">Maintnance!</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Sabar ya, kami sedang melakukan pemeliharaan sistem.
          </p>
        </div>

        {/* Badge Estimasi */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-widest">
            Maintenance Sedang Berjalan
          </span>
        </div>
      </div>
    </div>
  );
}
