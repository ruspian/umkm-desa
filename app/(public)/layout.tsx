import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user ?? null} />
      {children}
      <Footer />
    </>
  );
}
