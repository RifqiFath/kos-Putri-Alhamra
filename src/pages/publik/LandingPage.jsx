import React, { useState } from 'react';
import {
  Bed,
  ShieldCheck,
  Wifi,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle,
  HelpCircle,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  Video,
  Info,
  Calendar,
  Lock,
  Ban,
  Zap,
  Coffee,
  Tv,
  Users,
  Car,
  Star,
  ArrowRight,
} from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';
import logoAlhamra from '../../assets/logos/logo-alhamra.svg';

export const LandingPage = () => {
  const nomorWhatsApp = '6281371958826';
  const urlGoogleMaps = 'https://maps.app.goo.gl/PycGPbLDyoL2gSMo7';

  // State untuk FAQ accordion
  const [faqTerbuka, setFaqTerbuka] = useState(null);

  const toggleFaq = (indeks) => {
    setFaqTerbuka(faqTerbuka === indeks ? null : indeks);
  };

  const pesanWhatsApp = (pesan) =>
    `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;

  const daftarFasilitas = [
    {
      judul: 'Kamar Mandi Dalam',
      deskripsi: 'Setiap kamar dilengkapi kamar mandi privat bersih dengan sanitasi terjaga.',
      ikon: CheckCircle,
    },
    {
      judul: 'Perabot Lengkap (Full Furnished)',
      deskripsi: 'Kasur empuk, bantal, dan lemari pakaian siap pakai sejak hari pertama.',
      ikon: Bed,
    },
    {
      judul: 'Lantai Granit Bersih',
      deskripsi: 'Bangunan modern berlantai granit sejuk, bersih, dan mudah dirawat.',
      ikon: Sparkles,
    },
    {
      judul: 'Free WiFi Bersama',
      deskripsi: 'Koneksi internet nirkabel untuk mendukung kelancaran kuliah dan tugas mahasiswi.',
      ikon: Wifi,
    },
    {
      judul: 'CCTV 24 Jam & Penjaga',
      deskripsi: 'Pengawasan kamera keamanan di area bersama serta kehadiran penjaga kos.',
      ikon: ShieldCheck,
    },
    {
      judul: 'Dapur & Ruang TV Bersama',
      deskripsi: 'Dapur bersama untuk memasak santai dan ruang tamu dengan televisi.',
      ikon: Coffee,
    },
    {
      judul: 'Parkiran Motor Gratis',
      deskripsi: 'Kapasitas sekitar 10 motor di dalam pagar aman tanpa biaya tambahan.',
      ikon: Car,
    },
    {
      judul: 'Pengelolaan Sampah',
      deskripsi: 'Kebersihan lingkungan luar dan penanganan sampah dikelola langsung oleh pihak kos.',
      ikon: Zap,
    },
  ];

  const daftarFaq = [
    {
      tanya: 'Apakah Kos Putri Alhamra khusus putri?',
      jawab: 'Ya, Kos Putri Alhamra adalah hunian yang dikhususkan bagi mahasiswi putri demi kenyamanan dan ketenangan bersama.',
    },
    {
      tanya: 'Berapa biaya sewa per bulan dan sistem pembayarannya?',
      jawab: 'Biaya sewa Rp700.000 per bulan untuk Tipe Sendiri dan Rp900.000 per bulan untuk Tipe Berdua. Pembayaran dilakukan secara bulanan melalui transfer bank, jatuh tempo setiap tanggal 1.',
    },
    {
      tanya: 'Apakah biaya sewa sudah termasuk listrik dan air?',
      jawab: 'Biaya sewa sudah termasuk penggunaan air bersih. Sedangkan untuk listrik menggunakan sistem token mandiri per kamar yang dibeli sendiri oleh penghuni.',
    },
    {
      tanya: 'Berapa total kamar dan ketersediaannya saat ini?',
      jawab: 'Terdapat total 20 kamar (16 kamar Tipe Sendiri dan 4 kamar Tipe Berdua). Saat ini tersedia 1 kamar kosong untuk survei dan pemesanan segera.',
    },
    {
      tanya: 'Bagaimana ketentuan jam malam di kos ini?',
      jawab: 'Pintu gerbang batas dikunci pukul 22.00 WIB pada hari biasa dan 22.30 WIB pada malam Minggu. Setiap penghuni tetap memegang kunci kamarnya masing-masing.',
    },
    {
      tanya: 'Apakah tamu boleh berkunjung dan menginap?',
      jawab: 'Tamu boleh berkunjung dengan jam wajar di ruang tamu. Tamu menginap dibatasi jatah 2 kali dalam sebulan: keluarga maksimal 1 minggu dan teman sesama mahasiswi maksimal 2 hari.',
    },
    {
      tanya: 'Bolehkah membawa barang elektronik tambahan?',
      jawab: 'Boleh. Kamu diperbolehkan membawa kulkas mini, dispenser, kompor listrik, setrika, atau penanak nasi tanpa dikenakan biaya tambahan.',
    },
    {
      tanya: 'Bagaimana cara menjadwalkan survei kamar?',
      jawab: 'Kamu bisa langsung menghubungi Pak Yusuf via WhatsApp untuk janjian jadwal survei, atau datang langsung ke kos dan meminta bantuan penjaga di jam kerja.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION (BERANDA) */}
      <section
        id="beranda"
        aria-label="Beranda Utama"
        className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Kolom Teks Hero */}
            <div className="lg:col-span-7 space-y-6">
              {/* Logo Resmi & Lencana Slogan */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 border border-garis shadow-sm shrink-0 flex items-center justify-center">
                  <img
                    src={logoAlhamra}
                    alt="Logo Resmi Kos Putri Alhamra"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kuning-mas/20 border border-kuning-mas/40 text-cokelat-tua text-xs font-semibold w-fit">
                  <Sparkles className="w-4 h-4 text-marun" />
                  <span>Rumah kos minimalis, unik, bersih, dan nyaman</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-marun tracking-tight leading-[1.15]">
                Hunian Kos Putri Idaman Dekat Kampus Pekanbaru
              </h1>

              <p className="text-base sm:text-lg text-cokelat-tua/80 leading-relaxed max-w-2xl">
                Suasana tenang, aman, dan bersih untuk mahasiswi{' '}
                <strong className="text-marun">UNRI</strong>,{' '}
                <strong className="text-marun">STIFAR</strong>, dan{' '}
                <strong className="text-marun">UIN Suska</strong>. Dilengkapi perabot lengkap, kamar mandi dalam, dan pengawasan CCTV 24 jam.
              </p>

              {/* Sorotan Ringkas */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="text-xs bg-permukaan border border-garis px-3 py-1.5 rounded-lg font-medium text-cokelat-tua shadow-sm flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Kamar Mandi Dalam
                </span>
                <span className="text-xs bg-permukaan border border-garis px-3 py-1.5 rounded-lg font-medium text-cokelat-tua shadow-sm flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Free WiFi
                </span>
                <span className="text-xs bg-permukaan border border-garis px-3 py-1.5 rounded-lg font-medium text-cokelat-tua shadow-sm flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> CCTV 24 Jam
                </span>
                <span className="text-xs bg-permukaan border border-garis px-3 py-1.5 rounded-lg font-medium text-cokelat-tua shadow-sm flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Air Sudah Termasuk
                </span>
              </div>

              {/* Tombol Aksi CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <a
                  href={pesanWhatsApp(
                    'Halo Pak Yusuf, saya tertarik ingin memesan kamar di Kos Putri Alhamra. Mohon info ketersediaannya.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tombol-marun gap-2 text-sm shadow-md"
                >
                  <MessageCircle className="w-5 h-5 text-kuning-mas" />
                  <span>Pesan via WhatsApp</span>
                </a>
                <a href="#kamar" className="tombol-garis gap-2 text-sm">
                  <Bed className="w-4 h-4 text-terakota" />
                  <span>Lihat Tipe Kamar</span>
                </a>
                <a
                  href={pesanWhatsApp(
                    'Halo Pak Yusuf, saya ingin menjadwalkan survei lokasi ke Kos Putri Alhamra.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tombol-kuning gap-2 text-sm shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-cokelat-tua" />
                  <span>Jadwalkan Survei</span>
                </a>
              </div>
            </div>

            {/* Kolom Kartu Hero Bento */}
            <div className="lg:col-span-5 space-y-4">
              <div className="kartu-bento p-6 sm:p-7 border-kuning-mas/60 relative overflow-hidden bg-gradient-to-br from-permukaan via-permukaan to-kuning-mas/10">
                <div className="flex items-center justify-between pb-4 border-b border-garis">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-terakota">
                      Tarif Sewa Bulanan
                    </span>
                    <h3 className="text-2xl font-extrabold text-marun mt-0.5">
                      Mulai {formatMataUang(700000)}
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                    Sisa 1 Kamar Tersedia
                  </span>
                </div>

                <div className="space-y-3 py-4 text-xs text-cokelat-tua/85">
                  <div className="flex items-center justify-between">
                    <span>Total Kapasitas:</span>
                    <span className="font-semibold text-marun">20 Kamar (16 Sendiri + 4 Berdua)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sistem Pembayaran:</span>
                    <span className="font-semibold text-marun">Bulanan (Jatuh tempo tgl 1)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fasilitas Air:</span>
                    <span className="font-semibold text-emerald-700">Sudah Termasuk Sewa</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Listrik Kamar:</span>
                    <span className="font-semibold text-marun">Token Mandiri</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-garis flex items-center justify-between text-xs text-cokelat-tua/70">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-terakota" /> Binawidya, Pekanbaru
                  </span>
                  <a
                    href={urlGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-marun underline hover:text-terakota"
                  >
                    Buka Google Maps
                  </a>
                </div>
              </div>

              {/* Bento Kecil: Kampus Terdekat */}
              <div className="kartu-bento p-4 flex items-center justify-between text-xs bg-latar border-garis">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-terakota/20 text-terakota flex items-center justify-center font-bold">
                    UNRI
                  </div>
                  <div>
                    <p className="font-bold text-cokelat-tua">Sangat Dekat Kampus</p>
                    <p className="text-[11px] text-cokelat-tua/70">5-8 menit ke UNRI, UIN & STIFAR</p>
                  </div>
                </div>
                <span className="font-semibold text-marun">Lokasi Strategis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TIPE KAMAR & HARGA */}
      <section id="kamar" aria-label="Tipe Kamar dan Harga" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Katalog & Pilihan Sewa
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Pilihan Tipe Kamar & Tarif Sewa
          </h2>
          <p className="text-sm text-cokelat-tua/75 leading-relaxed">
            Semua tipe kamar dibangun dengan spesifikasi lantai granit sejuk, ventilasi nyaman, dan kamar mandi dalam untuk menjaga privasi mahasiswi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Tipe Sendiri */}
          <div className="kartu-bento p-6 sm:p-8 flex flex-col justify-between border-kuning-mas ring-2 ring-kuning-mas/30">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  Tersedia (Sisa 1 Kamar)
                </span>
                <span className="text-xs text-cokelat-tua/60 font-semibold">16 Kamar Total</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-marun">Kamar Tipe Sendiri</h3>
                <p className="text-xs text-cokelat-tua/70 mt-1">
                  Kamar privat yang tenang dan nyaman, dirancang untuk mahasiswi yang membutuhkan ruang belajar fokus.
                </p>
              </div>

              <div className="pt-2 pb-1 border-y border-garis">
                <span className="text-xs text-cokelat-tua/60">Biaya Sewa Bulanan:</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-marun">
                    {formatMataUang(700000)}
                  </span>
                  <span className="text-xs text-cokelat-tua/60">/ bulan (sudah termasuk air)</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-terakota">
                  Fasilitas Dalam Kamar:
                </p>
                <ul className="space-y-2 text-xs text-cokelat-tua/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kamar mandi dalam privat (bersih & higienis)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kasur, bantal, dan lemari pakaian (Full Furnished)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lantai granit modern yang sejuk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Biaya air gratis (termasuk dalam harga sewa)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Listrik token mandiri per kamar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Akses internet WiFi bersama tanpa biaya tambahan</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-garis">
              <a
                href={pesanWhatsApp(
                  'Halo Pak Yusuf, saya berminat memesan Kamar Tipe Sendiri (Rp700.000/bln) di Kos Putri Alhamra.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-marun hover:bg-marun/90 text-permukaan font-semibold text-sm transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-kuning-mas" />
                <span>Pesan Kamar Tipe Sendiri</span>
              </a>
            </div>
          </div>

          {/* Tipe Berdua */}
          <div className="kartu-bento p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                  Hubungi Pengelola
                </span>
                <span className="text-xs text-cokelat-tua/60 font-semibold">4 Kamar Total</span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-marun">Kamar Tipe Berdua</h3>
                <p className="text-xs text-cokelat-tua/70 mt-1">
                  Kamar dengan kapasitas 2 orang, cocok untuk ditinggali bersama teman sekampus atau saudara agar lebih hemat.
                </p>
              </div>

              <div className="pt-2 pb-1 border-y border-garis">
                <span className="text-xs text-cokelat-tua/60">Biaya Sewa Bulanan:</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="text-3xl font-extrabold text-marun">
                    {formatMataUang(900000)}
                  </span>
                  <span className="text-xs text-cokelat-tua/60">/ bulan (sudah termasuk air)</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-terakota">
                  Fasilitas Dalam Kamar:
                </p>
                <ul className="space-y-2 text-xs text-cokelat-tua/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kamar mandi dalam privat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kapasitas 2 orang mahasiswi dengan perabot lengkap</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Lantai granit modern yang sejuk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Biaya air gratis (termasuk dalam harga sewa)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Listrik token mandiri per kamar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Akses internet WiFi bersama</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-garis">
              <a
                href={pesanWhatsApp(
                  'Halo Pak Yusuf, saya ingin menanyakan ketersediaan Kamar Tipe Berdua (Rp900.000/bln) di Kos Putri Alhamra.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-garis hover:bg-latar text-cokelat-tua font-semibold text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-terakota" />
                <span>Tanya Ketersediaan Tipe Berdua</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FASILITAS & KEAMANAN */}
      <section id="fasilitas" aria-label="Fasilitas dan Keamanan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Kenyamanan & Keamanan
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Fasilitas Lengkap untuk Menunjang Perkuliahan
          </h2>
          <p className="text-sm text-cokelat-tua/75 leading-relaxed">
            Menghadirkan lingkungan tempat tinggal yang kondusif, terjaga, dan didukung fasilitas bersama yang fungsional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {daftarFasilitas.map((f, i) => {
            const Ikon = f.ikon;
            return (
              <div key={i} className="kartu-bento p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-kuning-mas/30 text-marun flex items-center justify-center">
                  <Ikon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-marun leading-tight">{f.judul}</h3>
                <p className="text-xs text-cokelat-tua/75 leading-relaxed">{f.deskripsi}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. GALERI FOTO & VIDEO (PLACEHOLDER RESMI DENGAN KETERANGAN) */}
      <section id="galeri" aria-label="Galeri Foto dan Video" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Dokumentasi Hunian
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Galeri Bangunan & Fasilitas
          </h2>
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-xl mx-auto flex items-center gap-2.5">
            <Info className="w-4 h-4 shrink-0 text-amber-700" />
            <p>
              Dokumentasi visual saat ini berupa placeholder penataan ruang. Foto asli kos akan dipublikasikan setelah persetujuan pemilik (Pak Yusuf).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-terakota/20 via-kuning-mas/20 to-marun/20 flex flex-col items-center justify-center p-4 text-center">
              <Camera className="w-8 h-8 text-marun/60 mb-2" />
              <span className="text-xs font-bold text-marun">Tampak Depan Bangunan Kos</span>
              <span className="text-[11px] text-cokelat-tua/60 mt-1">Fasad minimalis warna kuning mas & marun</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Area Masuk & Pagar Keamanan</p>
            </div>
          </div>

          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-kuning-mas/20 via-terakota/20 to-latar flex flex-col items-center justify-center p-4 text-center">
              <Bed className="w-8 h-8 text-marun/60 mb-2" />
              <span className="text-xs font-bold text-marun">Kamar Tidur (Tipe Sendiri & Berdua)</span>
              <span className="text-[11px] text-cokelat-tua/60 mt-1">Lantai granit, kasur, bantal & lemari pakaian</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Interior Kamar Mahasiswi</p>
            </div>
          </div>

          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-marun/20 via-latar to-kuning-mas/20 flex flex-col items-center justify-center p-4 text-center">
              <CheckCircle className="w-8 h-8 text-marun/60 mb-2" />
              <span className="text-xs font-bold text-marun">Kamar Mandi Dalam</span>
              <span className="text-[11px] text-cokelat-tua/60 mt-1">Kebersihan sanitasi terjamin di setiap kamar</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Sanitasi & Kamar Mandi</p>
            </div>
          </div>

          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-terakota/20 via-latar to-marun/20 flex flex-col items-center justify-center p-4 text-center">
              <Coffee className="w-8 h-8 text-marun/60 mb-2" />
              <span className="text-xs font-bold text-marun">Dapur Bersama & Ruang Santai</span>
              <span className="text-[11px] text-cokelat-tua/60 mt-1">Fasilitas memasak praktis dan ruang TV</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Fasilitas Bersama Penghuni</p>
            </div>
          </div>

          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-kuning-mas/20 via-marun/20 to-terakota/20 flex flex-col items-center justify-center p-4 text-center">
              <Car className="w-8 h-8 text-marun/60 mb-2" />
              <span className="text-xs font-bold text-marun">Area Parkir Motor & Pagar</span>
              <span className="text-[11px] text-cokelat-tua/60 mt-1">Kapasitas 10 motor di dalam pagar aman</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Parkiran Motor Gratis</p>
            </div>
          </div>

          <div className="kartu-bento overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-marun/30 via-terakota/30 to-kuning-mas/30 flex flex-col items-center justify-center p-4 text-center">
              <Video className="w-8 h-8 text-marun mb-2" />
              <span className="text-xs font-bold text-marun">Video Tur Hunian</span>
              <span className="text-[11px] text-cokelat-tua/70 mt-1">Simulasi tur keliling kamar kos</span>
            </div>
            <div className="p-4 border-t border-garis">
              <p className="text-xs font-semibold text-cokelat-tua">Video Eksplorasi (Placeholder)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOKASI & AKSES TERDEKAT KAMPUS */}
      <section id="lokasi" aria-label="Lokasi dan Akses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="kartu-bento p-6 sm:p-10 space-y-8 bg-gradient-to-br from-permukaan via-permukaan to-latar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
                Akses Strategis Pekanbaru
              </span>
              <h2 className="text-3xl font-extrabold text-marun tracking-tight">
                Lokasi Tenang, Dekat Kampus & Kawasan Panam
              </h2>
              <p className="text-sm text-cokelat-tua/75 leading-relaxed">
                Berlokasi di pemukiman yang ramah, aman, dan bebas kebisingan jalan raya utama, namun tetap sangat dekat dengan kampus utama mahasiswi di Pekanbaru.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-latar border border-garis">
                  <div className="w-8 h-8 rounded-lg bg-marun text-kuning-mas flex items-center justify-center font-bold text-xs shrink-0">
                    U
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-marun">Universitas Riau (UNRI) Kampus Bina Widya</h4>
                    <p className="text-[11px] text-cokelat-tua/70">± 5 menit perjalanan berkendara dari kos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-latar border border-garis">
                  <div className="w-8 h-8 rounded-lg bg-terakota text-permukaan flex items-center justify-center font-bold text-xs shrink-0">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-marun">Sekolah Tinggi Ilmu Farmasi Riau (STIFAR)</h4>
                    <p className="text-[11px] text-cokelat-tua/70">± 8 menit perjalanan lancar</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-latar border border-garis">
                  <div className="w-8 h-8 rounded-lg bg-kuning-mas text-cokelat-tua flex items-center justify-center font-bold text-xs shrink-0">
                    UIN
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-marun">UIN Sultan Syarif Kasim Riau (UIN Suska)</h4>
                    <p className="text-[11px] text-cokelat-tua/70">± 7 menit perjalanan menuju kampus utama</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={urlGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tombol-marun gap-2 text-xs"
                >
                  <MapPin className="w-4 h-4 text-kuning-mas" />
                  <span>Petunjuk Arah Google Maps</span>
                </a>
              </div>
            </div>

            {/* Peta Visual Info Box */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-2xl border border-garis bg-latar p-6 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-terakota" />
                  <div>
                    <h3 className="font-bold text-sm text-marun">Alamat Lengkap Kos:</h3>
                    <p className="text-xs text-cokelat-tua/80 mt-0.5">
                      Jl. Buraq, Simpang Baru, Kec. Binawidya, Kota Pekanbaru, Riau 28292
                    </p>
                  </div>
                </div>
                <div className="aspect-video w-full rounded-xl bg-gray-200 border border-garis flex flex-col items-center justify-center text-center p-4">
                  <MapPin className="w-10 h-10 text-marun animate-bounce mb-2" />
                  <p className="text-xs font-bold text-cokelat-tua">Peta Lokasi Kos Putri Alhamra</p>
                  <p className="text-[11px] text-cokelat-tua/60 max-w-xs mt-1">
                    Klik tombol di bawah untuk membuka koordinat presisi langsung di Google Maps peramban kamu.
                  </p>
                  <a
                    href={urlGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 px-4 py-2 rounded-lg bg-marun text-permukaan text-xs font-semibold hover:bg-marun/90 shadow-sm transition-all"
                  >
                    Buka Titik Peta Maps &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PERATURAN & KETENTUAN SEWA KOS */}
      <section id="peraturan" aria-label="Peraturan dan Ketentuan Sewa" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Tata Tertib & Ketentuan
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Peraturan Kos untuk Menjaga Ketenteraman
          </h2>
          <p className="text-sm text-cokelat-tua/75 leading-relaxed">
            Diterapkan demi keselamatan, ketenangan istirahat, dan keharmonisan seluruh penghuni kos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="kartu-bento p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-marun text-kuning-mas flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-marun">Jam Malam & Akses</h3>
            <p className="text-xs text-cokelat-tua/75 leading-relaxed">
              Pintu pagar batas kos dikunci pukul <strong>22.00 WIB</strong> (hari biasa) dan <strong>22.30 WIB</strong> (malam Minggu). Setiap penghuni memegang kunci kamarnya sendiri.
            </p>
          </div>

          <div className="kartu-bento p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-terakota text-permukaan flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-marun">Aturan Tamu & Menginap</h3>
            <p className="text-xs text-cokelat-tua/75 leading-relaxed">
              Kunjungan tamu diperkenankan di ruang tamu. Tamu menginap dibatasi jatah <strong>2 kali sebulan</strong>: keluarga maks 1 minggu, teman mahasiswi maks 2 hari.
            </p>
          </div>

          <div className="kartu-bento p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
              <Ban className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-marun">Larangan Tegas</h3>
            <p className="text-xs text-cokelat-tua/75 leading-relaxed">
              Dilarang keras membawa <strong>hewan peliharaan</strong> dan dilarang <strong>merokok</strong> di seluruh area kos demi kebersihan udara dan kenyamanan bersama.
            </p>
          </div>

          <div className="kartu-bento p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-kuning-mas text-cokelat-tua flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-marun">Elektronik Tambahan</h3>
            <p className="text-xs text-cokelat-tua/75 leading-relaxed">
              Boleh membawa kulkas mini, dispenser, kompor, atau setrika <strong>tanpa biaya tambahan</strong>, listrik memakai sistem token masing-masing kamar.
            </p>
          </div>
        </div>

        {/* Info Biaya & Ketentuan Sewa */}
        <div className="mt-8 kartu-bento p-6 sm:p-8 bg-latar border-garis">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-cokelat-tua">
            <div className="space-y-1.5">
              <h4 className="font-bold text-marun uppercase tracking-wider">Jatuh Tempo Sewa</h4>
              <p className="text-cokelat-tua/75">
                Pembayaran sewa bulanan jatuh tempo setiap <strong>tanggal 1</strong> melalui transfer ke rekening pemilik kos.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-marun uppercase tracking-wider">Pemberitahuan Pindah</h4>
              <p className="text-cokelat-tua/75">
                Jika hendak selesai masa sewa atau pindah, mohon memberi tahu pengelola sekurang-kurangnya <strong>1 minggu sebelumnya</strong>.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-marun uppercase tracking-wider">Durasi Sewa</h4>
              <p className="text-cokelat-tua/75">
                Sistem sewa adalah <strong>bulanan</strong> (kos tidak melayani sistem sewa harian).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CARA PEMESANAN & KONTAK */}
      <section id="cara-pesan" aria-label="Cara Pemesanan Kamar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="kartu-bento p-6 sm:p-10 border-marun/20 bg-gradient-to-br from-permukaan via-permukaan to-kuning-mas/10">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
              Langkah Pemesanan
            </span>
            <h2 className="text-3xl font-extrabold text-marun tracking-tight">
              Cara Mudah Memesan Kamar di Kos Alhamra
            </h2>
            <p className="text-sm text-cokelat-tua/75">
              4 langkah praktis mulai dari survei hingga siap huni:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-permukaan border border-garis space-y-3">
              <div className="w-8 h-8 rounded-full bg-marun text-kuning-mas font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h4 className="font-bold text-sm text-marun">Hubungi WhatsApp</h4>
              <p className="text-xs text-cokelat-tua/70 leading-relaxed">
                Kirim pesan ke Pak Yusuf untuk menanyakan ketersediaan kamar yang diinginkan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-permukaan border border-garis space-y-3">
              <div className="w-8 h-8 rounded-full bg-terakota text-permukaan font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h4 className="font-bold text-sm text-marun">Survei Lokasi</h4>
              <p className="text-xs text-cokelat-tua/70 leading-relaxed">
                Atur jadwal survei bersama penjaga kos untuk melihat langsung suasana dan fasilitas kamar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-permukaan border border-garis space-y-3">
              <div className="w-8 h-8 rounded-full bg-kuning-mas text-cokelat-tua font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h4 className="font-bold text-sm text-marun">Pilih & Konfirmasi</h4>
              <p className="text-xs text-cokelat-tua/70 leading-relaxed">
                Tentukan tipe kamar (Sendiri / Berdua) dan lakukan pembayaran sewa bulan pertama via transfer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-permukaan border border-garis space-y-3">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-permukaan font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h4 className="font-bold text-sm text-marun">Serah Terima Kunci</h4>
              <p className="text-xs text-cokelat-tua/70 leading-relaxed">
                Dapatkan kunci kamar dari penjaga kos dan kamar siap kamu tempati dengan nyaman.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center pt-4">
            <a
              href={pesanWhatsApp(
                'Halo Pak Yusuf, saya ingin memesan kamar di Kos Putri Alhamra. Mohon informasi prosedurnya.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="tombol-marun gap-2 text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 text-kuning-mas" />
              <span>Hubungi Pengelola via WhatsApp (+62 813-7195-8826)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONI (GOOGLE MAPS) */}
      <section aria-label="Ulasan Penghuni" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Ulasan Terverifikasi
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Apa Kata Mereka Tentang Kos Alhamra?
          </h2>
          <p className="text-sm text-cokelat-tua/75">
            Dikutip langsung dari ulasan publik Google Maps Kos Putri Alhamra:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="kartu-bento p-6 space-y-4">
            <div className="flex items-center gap-1 text-kuning-mas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-kuning-mas" />
              ))}
            </div>
            <p className="text-xs text-cokelat-tua/80 italic leading-relaxed">
              "Tempat kost yang nyaman dan bersih."
            </p>
            <div className="pt-2 border-t border-garis">
              <p className="text-xs font-bold text-marun">Yulia D*****</p>
              <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
            </div>
          </div>

          <div className="kartu-bento p-6 space-y-4">
            <div className="flex items-center gap-1 text-kuning-mas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-kuning-mas" />
              ))}
            </div>
            <p className="text-xs text-cokelat-tua/80 italic leading-relaxed">
              "Tempatnya bagus dan bersih."
            </p>
            <div className="pt-2 border-t border-garis">
              <p className="text-xs font-bold text-marun">Doni H*** G***</p>
              <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
            </div>
          </div>

          <div className="kartu-bento p-6 space-y-4">
            <div className="flex items-center gap-1 text-kuning-mas">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-kuning-mas" />
              ))}
              <Star className="w-4 h-4 text-gray-300" />
            </div>
            <p className="text-xs text-cokelat-tua/80 italic leading-relaxed">
              "Kamarnya enak, fasilitas dan harga pas. Pemilik dan penjaganya ramah. Sayangnya parkir motor agak sesak kalau sedang ramai."
            </p>
            <div className="pt-2 border-t border-garis">
              <p className="text-xs font-bold text-marun">Kim D****</p>
              <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ INTERAKTIF */}
      <section id="faq" aria-label="Tanya Jawab" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota bg-terakota/10 px-3 py-1 rounded-full">
            Pusat Informasi
          </span>
          <h2 className="text-3xl font-extrabold text-marun tracking-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-sm text-cokelat-tua/75">
            Informasi lengkap seputar operasional dan ketentuan hunian:
          </p>
        </div>

        <div className="space-y-3">
          {daftarFaq.map((item, idx) => {
            const terbuka = faqTerbuka === idx;
            return (
              <div
                key={idx}
                className="kartu-bento overflow-hidden border-garis transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-marun hover:text-terakota transition-colors focus:outline-none"
                  aria-expanded={terbuka}
                >
                  <span className="pr-4">{item.tanya}</span>
                  {terbuka ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-terakota" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-cokelat-tua/60" />
                  )}
                </button>
                {terbuka && (
                  <div className="px-5 pb-5 pt-1 text-xs text-cokelat-tua/80 leading-relaxed border-t border-garis/50 bg-latar/40 animate-fadeIn">
                    {item.jawab}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
