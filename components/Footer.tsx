"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const menuItems = [
    {
      name: "Syarat & Ketentuan",
      href: "/terms",
    },
    {
      name: "Kebijakan Privasi",
      href: "/privacy",
    },
    {
      name: "Cara Belanja",
      href: "/cara-belanja",
    },
    {
      name: "Pusat Bantuan",
      href: "/faq",
    },
  ];
  return (
    <footer className="w-full px-4 pb-8 mt-20">
      <div className="max-w-7xl mx-auto bg-gray-900 dark:bg-zinc-900 rounded-[3rem] p-10 md:p-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] z-0" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="space-y-6 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-all shadow-lg shadow-orange-600/30">
                <span className="font-black text-xl">A</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Asli<span className="text-orange-500">Sini</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              Platform UMKM untuk menemukan produk lokal kualitas premium
              langsung dari tangan pertama.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 bg-white/5 hover:bg-orange-600 text-gray-400 hover:text-white rounded-xl flex items-center justify-center transition-all active:scale-90"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">
              Dukungan
            </h4>
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li key={item.name + index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-orange-500 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black uppercase tracking-widest text-xs">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-orange-600 shrink-0" />
                <span>
                  Desa Banuroja, Randangan, Pohuwato, Gorontalo, indonesia
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-orange-600 shrink-0" />
                <span>+62 822-9330-8893</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-orange-600 shrink-0" />
                <span>ruspianntb@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2026 RUSPIAN MAJID • ASLISINI UMKM
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 grayscale opacity-50">
              <div className="w-8 h-5 bg-gray-700 rounded-sm" />
              <div className="w-8 h-5 bg-gray-700 rounded-sm" />
              <div className="w-8 h-5 bg-gray-700 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
