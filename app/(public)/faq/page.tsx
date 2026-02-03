"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ShoppingBag, CreditCard } from "lucide-react";

export default function PusatBantuanPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Pemesanan",
      icon: <ShoppingBag size={20} />,
      questions: [
        {
          q: "Kenapa saya harus checkout via WhatsApp?",
          a: "AsliSini menggunakan pendekatan personal. Dengan WhatsApp, Anda bisa bernegosiasi langsung dengan penjual terkait detail produk atau ongkos kirim yang paling murah.",
        },
        {
          q: "Apakah stok barang selalu akurat?",
          a: "Ya! Saat Anda klik tombol 'Checkout WA', sistem kami otomatis mencatatkan pesanan dan mengurangi stok sementara di dashboard penjual.",
        },
      ],
    },

    {
      category: "Pembayaran",
      icon: <CreditCard size={20} />,
      questions: [
        {
          q: "Bagaimana metode pembayarannya?",
          a: "Pembayaran dilakukan secara transfer langsung ke rekening penjual atau metode lain (E-Wallet/COD) yang disepakati saat chat di WhatsApp.",
        },
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex p-4 bg-orange-100 dark:bg-orange-950/30 text-orange-600 rounded-[2rem] mb-4">
          <HelpCircle size={40} />
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter">
          Pusat <span className="text-orange-600">Bantuan</span>
        </h1>
        <p className="text-gray-500 font-medium">
          Ada yang bisa kami bantu? Cari jawaban cepat di sini.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-12">
        {faqs.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-4">
            <div className="flex items-center gap-2 mb-6 ml-4">
              <div className="text-orange-600 font-bold">{group.icon}</div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                {group.category}
              </h2>
            </div>

            <div className="space-y-4">
              {group.questions.map((item, qIdx) => {
                const globalIdx = groupIdx * 10 + qIdx; // Unique ID sederhana
                const isOpen = openIndex === globalIdx;

                return (
                  <div
                    key={qIdx}
                    className={`border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden transition-all ${isOpen ? "bg-orange-50/30 dark:bg-orange-950/10 border-orange-200" : "bg-white dark:bg-gray-900"}`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                      className="w-full px-8 py-6 flex items-center justify-between text-left"
                    >
                      <span className="font-bold text-gray-900 dark:text-white">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-orange-600" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-8 pb-6 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
