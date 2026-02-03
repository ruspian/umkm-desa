import {
  Lock,
  Eye,
  ShieldCheck,
  Database,
  Smartphone,
  Share2,
} from "lucide-react";

export default function PrivacyPage() {
  const privacyPoints = [
    {
      icon: <Database className="text-orange-600" />,
      title: "Data yang Kami Kumpulkan",
      content:
        "Kami mengumpulkan informasi minimal yang diperlukan seperti nama, alamat email, dan nomor WhatsApp untuk memfasilitasi komunikasi transaksi antara Anda dan penjual UMKM.",
    },
    {
      icon: <Eye className="text-orange-600" />,
      title: "Penggunaan Informasi",
      content:
        "Data Anda digunakan untuk memproses pesanan, mengelola akun, dan meningkatkan pengalaman belanja. Kami tidak menggunakan data Anda untuk keperluan iklan pihak ketiga tanpa izin.",
    },
    {
      icon: <Share2 className="text-orange-600" />,
      title: "Berbagi Data ke Penjual",
      content:
        "Saat Anda mengklik 'Checkout via WA', sistem kami mencatat ID pesanan. Data produk yang Anda pilih akan dibagikan kepada penjual terkait agar mereka dapat memproses pesanan Anda secara akurat.",
    },
    {
      icon: <Smartphone className="text-orange-600" />,
      title: "Keamanan Perangkat",
      content:
        "Kami menggunakan enkripsi standar industri untuk melindungi data Anda selama transmisi. Pastikan Anda selalu logout jika menggunakan perangkat publik untuk menjaga keamanan akun.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-6 mb-20">
        <div className="w-20 h-20 bg-orange-600/10 text-orange-600 rounded-[2rem] flex items-center justify-center shadow-inner">
          <Lock size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-black italic tracking-tighter">
            Kebijakan <span className="text-orange-600">Privasi</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Melindungi data Anda adalah prioritas utama kami di{" "}
            <span className="font-bold text-gray-900 dark:text-white underline decoration-orange-500">
              AsliSini
            </span>
            .
          </p>
        </div>
      </div>

      {/* Intro Text */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[3rem] p-10 mb-16 shadow-sm">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          Kami menghargai privasi Anda dan berkomitmen untuk melindungi
          informasi pribadi yang Anda bagikan kepada kami. Kebijakan ini
          menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga
          informasi Anda saat menggunakan platform AsliSini. Dengan menggunakan
          layanan kami, Anda menyetujui praktik data yang dijelaskan dalam
          kebijakan ini.
        </p>
      </div>

      {/* Privacy Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {privacyPoints.map((point, index) => (
          <div
            key={index}
            className="p-8 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-900 hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-500 group"
          >
            <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
              {point.icon}
            </div>
            <h3 className="text-xl font-black mb-3 tracking-tight">
              {point.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
              {point.content}
            </p>
          </div>
        ))}
      </div>

      {/* Cookie Section */}
      <section className="mt-16 p-10 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 p-5 bg-gray-100 dark:bg-gray-800 rounded-full">
          <ShieldCheck size={32} className="text-emerald-600" />
        </div>
        <div>
          <h4 className="text-lg font-black mb-2 tracking-tight">
            Penggunaan Cookies
          </h4>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Kami menggunakan cookies teknis untuk mengingat sesi login dan
            preferensi tema Anda. Kami tidak menggunakan tracking cookies untuk
            membuntuti aktivitas Anda di luar platform kami.
          </p>
        </div>
      </section>
    </main>
  );
}
