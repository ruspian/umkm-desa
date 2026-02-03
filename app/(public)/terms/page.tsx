import { ShieldCheck, Scale, FileText, Lock, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      icon: <FileText className="text-orange-600" />,
      title: "Ketentuan Umum",
      content:
        "AsliSini adalah platform penghubung antara pelaku UMKM desa dengan pembeli. Dengan menggunakan layanan kami, Anda menyetujui untuk memberikan data yang akurat dan bertanggung jawab atas keamanan akun Anda sendiri.",
    },
    {
      icon: <Scale className="text-orange-600" />,
      title: "Hak & Kewajiban Penjual",
      content:
        "Penjual wajib memastikan stok barang akurat. Transaksi dilakukan via WhatsApp, namun data pesanan yang tercatat di dashboard tetap menjadi acuan stok. Penjual dilarang menjual barang ilegal atau melanggar hak cipta.",
    },
    {
      icon: <ShieldCheck className="text-orange-600" />,
      title: "Keamanan Transaksi",
      content:
        "Kami memfasilitasi pencatatan pesanan, namun pembayaran dilakukan langsung antara pembeli dan penjual. Pastikan Anda melakukan konfirmasi pembayaran hanya kepada nomor WhatsApp resmi yang tertera di profil toko.",
    },
    {
      icon: <Lock className="text-orange-600" />,
      title: "Privasi Data",
      content:
        "Data pribadi Anda hanya digunakan untuk keperluan transaksi dan pengembangan layanan AsliSini. Kami tidak akan menjual data Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Halaman */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex p-4 bg-orange-100 dark:bg-orange-950/30 text-orange-600 rounded-[2rem] mb-4">
          <Scale size={40} />
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter">
          Syarat & <span className="text-orange-600">Ketentuan</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
          Terakhir diperbarui: 4 Februari 2026. Mohon baca dengan seksama aturan
          main di platform AsliSini.
        </p>
      </div>

      {/* Grid Konten */}
      <div className="grid grid-cols-1 gap-12">
        {sections.map((section, index) => (
          <section
            key={index}
            className="group flex flex-col md:flex-row gap-8 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900 transition-all hover:bg-orange-50/30 dark:hover:bg-orange-950/10"
          >
            <div className="shrink-0 w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl shadow-gray-200/50 dark:shadow-none group-hover:scale-110 transition-transform">
              {section.icon}
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                {section.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                {section.content}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Footer Kontak */}
      <div className="mt-20 p-10 bg-gray-900 rounded-[3rem] text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl" />
        <HelpCircle className="mx-auto text-orange-500" size={48} />
        <h3 className="text-2xl font-black text-white italic">
          Punya Pertanyaan?
        </h3>
        <p className="text-gray-400 max-w-md mx-auto">
          Jika ada poin yang kurang jelas, tim dukungan kami siap membantu Anda
          memahami lebih lanjut.
        </p>
        <Link
          href="https://wa.me/6282293308893"
          className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black transition-all active:scale-95"
        >
          Hubungi Admin AsliSini
        </Link>
      </div>
    </main>
  );
}
