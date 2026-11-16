import React from 'react';
import { MessageCircle } from 'lucide-react';

export const TombolWhatsAppMelayang = () => {
  const nomorWhatsApp = '6281371958826';
  const pesanTeks = encodeURIComponent(
    'Halo Pak Yusuf, saya tertarik dengan informasi kamar di Kos Putri Alhamra. Apakah masih ada kamar yang tersedia untuk disurvei?'
  );
  const tautanWhatsApp = `https://wa.me/${nomorWhatsApp}?text=${pesanTeks}`;

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <a
        href={tautanWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="font-semibold text-sm hidden sm:inline-block">
          WhatsApp Pengelola
        </span>
      </a>
      <span className="sr-only">Hubungi Pengelola via WhatsApp di +62 813-7195-8826</span>
    </aside>
  );
};

export default TombolWhatsAppMelayang;
