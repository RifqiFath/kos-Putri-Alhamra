import React from 'react';
import { Bed, Users, Check, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';

export const HalamanKatalogKamar = () => {
  const nomorWhatsApp = '6281371958826';

  const daftarKamar = [
    {
      id: 'kamar-sendiri',
      nama: 'Kamar Tipe Sendiri',
      harga: 700000,
      kapasitas: '1 Orang (Privat)',
      total: '16 Kamar',
      status: 'Tersedia (Sisa 1 Kamar)',
      statusTersedia: true,
      deskripsi:
        'Kamar privat yang tenang dan nyaman untuk mahasiswi yang menginginkan privasi belajar penuh.',
      fasilitas: [
        'Kamar mandi dalam',
        'Kasur & bantal empuk',
        'Lemari pakaian',
        'Lantai granit bersih',
        'Sudah termasuk pemakaian air',
        'Listrik sistem token mandiri',
        'Akses Free WiFi bersama',
      ],
    },
    {
      id: 'kamar-berdua',
      nama: 'Kamar Tipe Berdua',
      harga: 900000,
      kapasitas: '2 Orang (Berbagi)',
      total: '4 Kamar',
      status: 'Hubungi Pengelola',
      statusTersedia: false,
      deskripsi:
        'Kamar lebih lega yang cocok untuk ditinggali berdua bersama teman akrab atau saudara sekampus.',
      fasilitas: [
        'Kamar mandi dalam',
        'Kasur & perlengkapan tidur berdua',
        'Lemari pakaian luas',
        'Lantai granit bersih',
        'Sudah termasuk pemakaian air',
        'Listrik sistem token mandiri',
        'Akses Free WiFi bersama',
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
          Pilihan Kamar Mahasiswi
        </span>
        <h1 className="text-3xl font-extrabold text-marun tracking-tight">
          Katalog Tipe Kamar & Tarif Sewa
        </h1>
        <p className="text-sm text-cokelat-tua/75 leading-relaxed">
          Semua tipe kamar dilengkapi kamar mandi dalam dan lantai granit bersih. Biaya sewa bulanan sudah termasuk pemakaian air.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {daftarKamar.map((kamar) => (
          <div
            key={kamar.id}
            className={`kartu-bento p-6 sm:p-8 flex flex-col justify-between ${
              kamar.statusTersedia ? 'border-kuning-mas/60 ring-2 ring-kuning-mas/30' : ''
            }`}
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    kamar.statusTersedia
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {kamar.status}
                </span>
                <span className="text-xs text-cokelat-tua/60 font-medium">{kamar.total}</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-marun">{kamar.nama}</h2>
                <p className="text-xs text-cokelat-tua/70 mt-1">{kamar.deskripsi}</p>
              </div>

              <div className="pt-2 pb-1 border-y border-garis">
                <p className="text-xs text-cokelat-tua/70">Biaya Sewa Bulanan:</p>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-marun">
                    {formatMataUang(kamar.harga)}
                  </span>
                  <span className="text-xs text-cokelat-tua/60">/ bulan (termasuk air)</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-terakota">
                  Fasilitas Kamar Termasuk:
                </p>
                <ul className="space-y-2 text-xs text-cokelat-tua/80">
                  {kamar.fasilitas.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-garis">
              <a
                href={`https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(
                  `Halo Pak Yusuf, saya ingin menanyakan ketersediaan ${kamar.nama} di Kos Putri Alhamra.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-marun hover:bg-marun/90 text-permukaan font-semibold text-sm transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-kuning-mas" />
                <span>Tanya Ketersediaan Kamar</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HalamanKatalogKamar;
