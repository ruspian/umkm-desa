import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      <Sidebar />

      <main className="flex-1 ml-0 lg:ml-64 w-full transition-all duration-300">
        <div className="p-6 md:p-10 pt-28 lg:pt-10">{children}</div>
      </main>
    </div>
  );
}
