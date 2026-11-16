import React, { useState } from 'react';
import {
  Bed,
  ShieldCheck,
  Wifi,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  HelpCircle,
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
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';

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

  // Data Fasilitas dengan Angka Editorial
  const daftarFasilitasEditorial = [
    {
      nomor: '01',
      judul: 'Kamar Mandi Dalam Privat',
      deskripsi:
        'Setiap kamar dilengkapi kamar mandi dalam pribadi yang higienis, menjamin privasi penuh bagi mahasiswi.',
      highlight: 'Sanitasi Bersih Terjaga',
    },
    {
      nomor: '02',
      judul: 'Full Furnished Siap Huni',
      deskripsi:
        'Dilengkapi kasur empuk, bantal, dan lemari pakaian kokoh. Langsung siap ditempati sejak hari pertama.',
      highlight: 'Kasur, Bantal, Lemari',
    },
    {
      nomor: '03',
      judul: 'Lantai Granit Sejuk',
      deskripsi:
        'Seluruh lantai kamar dan area bersama menggunakan granit modern yang bersih, sejuk, dan mudah dibersihkan.',
      highlight: 'Bangunan Modern Minimalis',
    },
    {
      nomor: '04',
      judul: 'Koneksi WiFi Bersama',
      deskripsi:
        'Akses internet nirkabel gratis untuk kelancaran tugas kuliah, riset daring, dan streaming tanpa kuota habis.',
      highlight: 'Free WiFi Mahasiswi',
    },
    {
      nomor: '05',
      judul: 'CCTV 24 Jam & Penjaga Siaga',
      deskripsi:
        'Kamera pengawas aktif di seluruh titik akses bersama serta kehadiran penjaga kos untuk rasa aman maksimal.',
      highlight: 'Keamanan Lingkungan',
    },
    {
      nomor: '06',
      judul: 'Dapur Bersama & Ruang Santai TV',
      deskripsi:
        'Fasilitas memasak mandiri yang praktis dan ruang TV komunal untuk bersosialisasi santai sesama mahasiswi.',
      highlight: 'Area Komunal Nyaman',
    },
    {
      nomor: '07',
      judul: 'Parkiran Motor Beratap Gratis',
      deskripsi:
        'Kapasitas sekitar 10 motor di dalam pagar berkanopi yang terkunci aman saat jam malam tiba.',
      highlight: 'Parkir Gratis Aman',
    },
    {
      nomor: '08',
      judul: 'Pengelolaan Kebersihan Sampah',
      deskripsi:
        'Penanganan kebersihan lorong dan pengangkutan sampah rutin dikelola langsung tanpa membebani penghuni.',
      highlight: 'Lingkungan Asri',
    },
  ];

  const daftarFaq = [
    {
      tanya: 'Apakah Kos Putri Alhamra khusus putri?',
      jawab:
        'Ya, Kos Putri Alhamra adalah hunian yang dikhususkan bagi mahasiswi putri demi kenyamanan, privasi, dan ketenangan bersama.',
    },
    {
      tanya: 'Berapa biaya sewa per bulan dan sistem pembayarannya?',
      jawab:
        'Biaya sewa Rp700.000 per bulan untuk Tipe Sendiri dan Rp900.000 per bulan untuk Tipe Berdua. Pembayaran dilakukan bulanan via transfer bank, jatuh tempo setiap tanggal 1.',
    },
    {
      tanya: 'Apakah biaya sewa sudah termasuk listrik dan air?',
      jawab:
        'Biaya sewa sudah termasuk pemakaian air bersih sepuasnya. Untuk listrik menggunakan meteran token mandiri per kamar yang dibeli sendiri sesuai pemakaian kamu.',
    },
    {
      tanya: 'Berapa total kamar dan ketersediaannya saat ini?',
      jawab:
        'Terdapat total 20 kamar (16 kamar Tipe Sendiri dan 4 kamar Tipe Berdua). Saat ini tersedia 1 kamar kosong (Kamar 08) yang siap disurvei dan dihuni.',
    },
    {
      tanya: 'Bagaimana ketentuan jam malam di kos ini?',
      jawab:
        'Pintu gerbang batas kos dikunci pukul 22.00 WIB pada hari biasa dan 22.30 WIB pada malam Minggu. Setiap penghuni memegang kunci kamarnya masing-masing.',
    },
    {
      tanya: 'Apakah tamu boleh berkunjung dan menginap?',
      jawab:
        'Tamu boleh berkunjung dengan sopan di ruang tamu bersama. Tamu menginap dibatasi jatah 2 kali dalam sebulan: keluarga maksimal 1 minggu dan teman sesama mahasiswi maksimal 2 hari.',
    },
    {
      tanya: 'Bolehkah membawa barang elektronik tambahan?',
      jawab:
        'Boleh! Kamu bebas membawa kulkas mini, dispenser, penanak nasi (rice cooker), atau setrika tanpa dikenakan biaya tambahan.',
    },
    {
      tanya: 'Bagaimana cara menjadwalkan survei kamar?',
      jawab:
        'Kamu bisa langsung menghubungi Pak Yusuf via WhatsApp untuk membuat janji temu, atau datang langsung ke Jl. Buraq dan menemui penjaga kos pada jam kerja.',
    },
  ];

  return (
    <div className="text-cokelat-tua antialiased selection:bg-kuning-mas/40 selection:text-marun">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (ELEVASI & STRATEGI ANTI-SLOP)           */}
      {/* ========================================================= */}
      <section
        id="beranda"
        aria-label="Beranda Utama"
        className="relative bg-latar pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden"
      >
        {/* Glow ambient background halus */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-kuning-mas/15 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-terakota/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Kolom Teks Hero Kiri */}
            <div className="lg:col-span-7 space-y-7">
              {/* Pill Badge Elegan */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-marun/10 border border-marun/15 text-marun text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-terakota" />
                <span>Rumah Kos Minimalis, Unik, Bersih & Nyaman</span>
              </div>

              {/* Judul Hero Tipografi Berani */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-marun tracking-tight leading-[1.12]">
                Hunian Kos Putri Idaman di Kawasan Kampus Pekanbaru
              </h1>

              {/* Deskripsi Teks Lapang & Bernapas */}
              <p className="text-base sm:text-lg text-cokelat-tua/80 leading-relaxed max-w-2xl font-normal">
                Suasana asri, aman, dan tenang untuk mahasiswi{' '}
                <strong className="text-marun font-bold">UNRI</strong>,{' '}
                <strong className="text-marun font-bold">STIFAR</strong>, dan{' '}
                <strong className="text-marun font-bold">UIN Suska</strong>.
                Lantai granit sejuk, kamar mandi dalam, perabot lengkap, dan penjagaan CCTV 24 jam.
              </p>

              {/* Sorotan Fitur Bersih (Tanpa Kotak Abu-abu Kaku) */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-1 text-xs font-semibold text-cokelat-tua/85">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kamar Mandi Dalam
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free WiFi Cepat
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> CCTV 24 Jam
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Air Gratis Termasuk
                </span>
              </div>

              {/* Tombol Aksi Hero: 1 Primary CTA Menyala + 1 Secondary CTA Elegan */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
                {/* PRIMARY CTA: Bintang Utama Halaman */}
                <a
                  href={pesanWhatsApp(
                    'Halo Pak Yusuf, saya tertarik ingin memesan kamar di Kos Putri Alhamra. Mohon info ketersediaan unit terbaru.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-kuning-mas hover:bg-[#d8b056] text-cokelat-tua font-extrabold text-sm sm:text-base shadow-xl shadow-kuning-mas/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-kuning-mas/80 group"
                >
                  <MessageCircle className="w-5 h-5 text-cokelat-tua group-hover:rotate-12 transition-transform" />
                  <span>Pesan via WhatsApp</span>
                </a>

                {/* SECONDARY CTA: Link Elegan Tanpa Menumpuk */}
                <a
                  href="#kamar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-marun hover:text-terakota font-bold text-sm sm:text-base hover:bg-white/60 transition-all border border-marun/20"
                >
                  <span>Lihat Pilihan Kamar & Tarif</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Kolom Kartu Hero Kanan (Floating Tactile Glassmorphism Card) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-7 sm:p-9 bg-white/95 backdrop-blur-md shadow-2xl shadow-marun/10 border border-kuning-mas/50 space-y-6">
                {/* Aksen Label Eksklusif */}
                <div className="flex items-center justify-between pb-5 border-b border-garis">
                  <span className="text-[11px] font-extrabold tracking-widest uppercase text-terakota">
                    STATUS HUNIAN TERKINI
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>1 Kamar Tersedia</span>
                  </div>
                </div>

                {/* Tampilan Tarif Sewa */}
                <div>
                  <span className="text-xs text-cokelat-tua/60 font-medium">Tarif Sewa Bulanan:</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-marun tracking-tight">
                      Mulai {formatMataUang(700000)}
                    </span>
                    <span className="text-xs font-semibold text-cokelat-tua/70">/ bulan</span>
                  </div>
                  <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Biaya air sudah termasuk di harga sewa
                  </p>
                </div>

                {/* List Informasi Tanpa Garis-Garis Kotak Kaku */}
                <div className="space-y-3.5 text-xs text-cokelat-tua/85 pt-1">
                  <div className="flex items-center justify-between py-1.5 border-b border-garis/60">
                    <span className="text-cokelat-tua/70">Total Unit Kamar:</span>
                    <span className="font-bold text-marun">20 Kamar (16 Sendiri + 4 Berdua)</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-garis/60">
                    <span className="text-cokelat-tua/70">Jatuh Tempo Sewa:</span>
                    <span className="font-bold text-marun">Setiap Tanggal 1 Bulanan</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-garis/60">
                    <span className="text-cokelat-tua/70">Akses Kampus UNRI:</span>
                    <span className="font-bold text-emerald-800">± 5 Menit dari Kos</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-cokelat-tua/70">Listrik Kamar:</span>
                    <span className="font-bold text-marun">Meteran Token Mandiri</span>
                  </div>
                </div>

                {/* Lokasi & Google Maps Link */}
                <div className="pt-4 border-t border-garis flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-cokelat-tua/80 font-medium">
                    <MapPin className="w-4 h-4 text-terakota shrink-0" />
                    Jl. Buraq, Binawidya, Pekanbaru
                  </span>
                  <a
                    href={urlGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-marun hover:text-terakota flex items-center gap-1 underline underline-offset-4"
                  >
                    <span>Peta</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. TIPE KAMAR & HARGA (SURFACE: PUTIH BERSIH & ELEGAN)    */}
      {/* ========================================================= */}
      <section
        id="kamar"
        aria-label="Tipe Kamar dan Harga"
        className="bg-white py-24 lg:py-32 border-y border-garis/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section Editorial */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              PILIHAN HUNIAN MAHASISWI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Pilihan Tipe Kamar & Tarif Sewa
            </h2>
            <p className="text-base text-cokelat-tua/75 leading-relaxed font-normal">
              Semua kamar dilengkapi lantai granit sejuk, ventilasi udara yang baik, dan kamar mandi dalam pribadi untuk kenyamanan studi kamu di Pekanbaru.
            </p>
          </div>

          {/* Grid Dua Pilihan Kamar (Desain Asimetris Berkarakter) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* TIPE SENDIRI (Paling Populer) */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-latar via-white to-latar border-2 border-kuning-mas/60 shadow-xl shadow-kuning-mas/10 flex flex-col justify-between relative">
              {/* Badge Highlight */}
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Tersedia (Kamar 08)
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-terakota uppercase tracking-wider">
                    16 Kamar Tersedia
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-marun mt-1">
                    Kamar Tipe Sendiri
                  </h3>
                  <p className="text-sm text-cokelat-tua/75 mt-2 leading-relaxed">
                    Kamar privat yang tenang dan nyaman, dirancang bagi mahasiswi yang membutuhkan ruang istirahat dan fokus belajar mandiri.
                  </p>
                </div>

                {/* Harga Sewa */}
                <div className="py-4 border-y border-garis/80">
                  <span className="text-xs text-cokelat-tua/60 font-medium">Biaya Sewa Bulanan:</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-marun">
                      {formatMataUang(700000)}
                    </span>
                    <span className="text-xs text-cokelat-tua/70 font-semibold">/ bulan (termasuk air)</span>
                  </div>
                </div>

                {/* Fasilitas Kamar */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-terakota">
                    Fasilitas Kamar Termasuk:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-cokelat-tua/85">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kamar mandi dalam privat (bersih & sanitasi terjaga)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kasur empuk, bantal, dan lemari pakaian (Full Furnished)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Lantai granit modern yang sejuk dan mudah dirawat</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Biaya pemakaian air gratis sudah termasuk sewa</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Meteran token listrik mandiri per unit kamar</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Akses internet WiFi bersama tanpa biaya ekstra</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tombol Pesan */}
              <div className="pt-8 mt-8 border-t border-garis">
                <a
                  href={pesanWhatsApp(
                    'Halo Pak Yusuf, saya berminat memesan Kamar Tipe Sendiri (Rp700.000/bln) di Kos Putri Alhamra.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-marun hover:bg-marun/90 text-permukaan font-bold text-sm sm:text-base shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 text-kuning-mas" />
                  <span>Pesan Kamar Tipe Sendiri</span>
                </a>
              </div>
            </div>

            {/* TIPE BERDUA */}
            <div className="rounded-3xl p-8 sm:p-10 bg-latar/80 border border-garis/80 shadow-md flex flex-col justify-between relative">
              {/* Badge Info */}
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  Hubungi Pengelola
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-terakota uppercase tracking-wider">
                    4 Kamar Total
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-marun mt-1">
                    Kamar Tipe Berdua
                  </h3>
                  <p className="text-sm text-cokelat-tua/75 mt-2 leading-relaxed">
                    Dirancang untuk dihuni 2 orang mahasiswi (teman kuliah atau saudara) agar biaya sewa bulanan terasa jauh lebih hemat.
                  </p>
                </div>

                {/* Harga Sewa */}
                <div className="py-4 border-y border-garis/80">
                  <span className="text-xs text-cokelat-tua/60 font-medium">Biaya Sewa Bulanan:</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-marun">
                      {formatMataUang(900000)}
                    </span>
                    <span className="text-xs text-cokelat-tua/70 font-semibold">/ bulan (termasuk air)</span>
                  </div>
                </div>

                {/* Fasilitas Kamar */}
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-terakota">
                    Fasilitas Kamar Termasuk:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-cokelat-tua/85">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kamar mandi dalam privat</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Kapasitas 2 kasur dan lemari pakaian untuk berdua</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Lantai granit modern yang sejuk</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Biaya air gratis sudah termasuk sewa</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Meteran token listrik mandiri per kamar</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Akses internet WiFi bersama</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tombol Tanya */}
              <div className="pt-8 mt-8 border-t border-garis">
                <a
                  href={pesanWhatsApp(
                    'Halo Pak Yusuf, saya ingin menanyakan ketersediaan Kamar Tipe Berdua (Rp900.000/bln) di Kos Putri Alhamra.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white hover:bg-latar text-cokelat-tua font-bold text-sm sm:text-base border border-garis transition-all shadow-sm active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 text-terakota" />
                  <span>Tanya Ketersediaan Tipe Berdua</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FASILITAS (BREAK THE BOX MATRIX: INFOGRAFIS NOMOR 01-08)*/}
      {/* ========================================================= */}
      <section
        id="fasilitas"
        aria-label="Fasilitas dan Keamanan"
        className="bg-latar py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              KENYAMANAN MAHASISWI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Fasilitas Lengkap Pendukung Kuliah
            </h2>
            <p className="text-base text-cokelat-tua/75 leading-relaxed font-normal">
              Setiap sudut dirancang fungsional untuk menciptakan suasana hunian yang tenang, bersih, dan bebas repot.
            </p>
          </div>

          {/* Grid Editorial Bernomor (Bukan Kotak-Kotak Abu-Abu Generik) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {daftarFasilitasEditorial.map((item) => (
              <div
                key={item.nomor}
                className="group relative pt-6 border-t-2 border-garis hover:border-marun transition-colors"
              >
                {/* Angka Raksasa Tipografi Editorial di Belakang */}
                <span className="text-4xl sm:text-5xl font-black text-kuning-mas/35 tracking-tighter select-none block mb-2 font-mono group-hover:text-marun/20 transition-colors">
                  {item.nomor}
                </span>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-terakota tracking-wide uppercase block">
                    {item.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-marun leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed pt-1">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. GALERI BANGUNAN (ASYMMETRICAL BENTO / EDITORIAL GRID)   */}
      {/* ========================================================= */}
      <section
        id="galeri"
        aria-label="Galeri Foto dan Video"
        className="bg-white py-24 lg:py-32 border-y border-garis/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              DOKUMENTASI VISUAL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Galeri Bangunan & Penataan Ruang
            </h2>
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 max-w-lg mx-auto flex items-center justify-center gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Dokumentasi asli kos akan dipublikasikan setelah persetujuan Pak Yusuf.</span>
            </div>
          </div>

          {/* Asymmetrical Bento Grid (Satu Hero Foto Besar + Grid Pendukung Majalah) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1. Foto Hero Utama Besar (Kiri - 7 Kolom) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden relative group min-h-[380px] sm:min-h-[460px] bg-gradient-to-br from-marun/85 via-cokelat-tua/90 to-marun flex flex-col justify-end p-8 text-white shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(#E3BD67_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase bg-white/20 backdrop-blur-md text-kuning-mas border border-white/20">
                  01 / FASAD BANGUNAN
                </span>
              </div>
              <div className="relative z-10 space-y-2">
                <Camera className="w-8 h-8 text-kuning-mas mb-1 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Tampak Depan & Pagar Keamanan
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                  Fasad minimalis warna marun dan kuning mas, dilengkapi pagar batas keamanan ganda yang dikunci setiap jam malam.
                </p>
              </div>
            </div>

            {/* 2. Grid Pendukung Sebelah Kanan (5 Kolom) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Kamar Tidur */}
              <div className="rounded-3xl p-6 bg-latar border border-garis/80 hover:border-marun/40 transition-all flex flex-col justify-between group shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-terakota uppercase">
                    02 / KAMAR TIDUR
                  </span>
                  <Bed className="w-5 h-5 text-marun group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-8 space-y-1">
                  <h4 className="font-bold text-sm text-marun">Interior Kamar</h4>
                  <p className="text-xs text-cokelat-tua/75 leading-relaxed">
                    Lantai granit, kasur, bantal, dan lemari pakaian.
                  </p>
                </div>
              </div>

              {/* Kamar Mandi */}
              <div className="rounded-3xl p-6 bg-latar border border-garis/80 hover:border-marun/40 transition-all flex flex-col justify-between group shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-terakota uppercase">
                    03 / SANITASI
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-8 space-y-1">
                  <h4 className="font-bold text-sm text-marun">Kamar Mandi Dalam</h4>
                  <p className="text-xs text-cokelat-tua/75 leading-relaxed">
                    Sanitasi higienis privat di setiap kamar.
                  </p>
                </div>
              </div>

              {/* Dapur & Ruang Santai */}
              <div className="rounded-3xl p-6 bg-latar border border-garis/80 hover:border-marun/40 transition-all flex flex-col justify-between group shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-terakota uppercase">
                    04 / KOMUNAL
                  </span>
                  <Coffee className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-8 space-y-1">
                  <h4 className="font-bold text-sm text-marun">Dapur & Ruang TV</h4>
                  <p className="text-xs text-cokelat-tua/75 leading-relaxed">
                    Fasilitas memasak santai dan area kumpul.
                  </p>
                </div>
              </div>

              {/* Parkiran Motor */}
              <div className="rounded-3xl p-6 bg-latar border border-garis/80 hover:border-marun/40 transition-all flex flex-col justify-between group shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-terakota uppercase">
                    05 / PARKIR
                  </span>
                  <Car className="w-5 h-5 text-terakota group-hover:scale-110 transition-transform" />
                </div>
                <div className="mt-8 space-y-1">
                  <h4 className="font-bold text-sm text-marun">Parkir Motor Beratap</h4>
                  <p className="text-xs text-cokelat-tua/75 leading-relaxed">
                    Kapasitas ~10 motor di dalam pagar aman.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. LOKASI & AKSES STRATEGIS (SURFACE: OFF-WHITE LAPANG)   */}
      {/* ========================================================= */}
      <section
        id="lokasi"
        aria-label="Lokasi dan Akses"
        className="bg-latar py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Narasi Akses Kiri */}
            <div className="lg:col-span-6 space-y-7">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
                AKSES STRATEGIS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight leading-tight">
                Lokasi Tenang, Hitungan Menit ke Kampus Utama
              </h2>
              <p className="text-base text-cokelat-tua/80 leading-relaxed font-normal">
                Beralamat di <strong>Jl. Buraq, Simpang Baru, Kec. Binawidya (Panam), Pekanbaru</strong>.
                Bebas dari bisingnya jalan raya utama, namun sangat dekat dengan fasilitas kebutuhan mahasiswa dan tiga kampus ternama.
              </p>

              {/* List Akses Editorial (Tanpa Kotak Berborder Abu-Abu) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 pb-4 border-b border-garis">
                  <span className="text-sm font-mono font-bold text-marun w-12 shrink-0">± 5 mnt</span>
                  <div>
                    <h4 className="text-sm font-bold text-marun">Universitas Riau (UNRI) Kampus Bina Widya</h4>
                    <p className="text-xs text-cokelat-tua/70 mt-0.5">Akses cepat dan lancar tanpa hambatan macet.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-garis">
                  <span className="text-sm font-mono font-bold text-terakota w-12 shrink-0">± 7 mnt</span>
                  <div>
                    <h4 className="text-sm font-bold text-marun">UIN Sultan Syarif Kasim Riau (UIN Suska)</h4>
                    <p className="text-xs text-cokelat-tua/70 mt-0.5">Dekat dengan rute transportasi umum dan warung makan.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-sm font-mono font-bold text-amber-700 w-12 shrink-0">± 8 mnt</span>
                  <div>
                    <h4 className="text-sm font-bold text-marun">Sekolah Tinggi Ilmu Farmasi Riau (STIFAR)</h4>
                    <p className="text-xs text-cokelat-tua/70 mt-0.5">Jarak dekat untuk efisiensi jadwal kuliah padat.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={urlGoogleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-marun hover:text-terakota underline underline-offset-8 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-terakota" />
                  <span>Petunjuk Arah Google Maps Navigasi</span>
                </a>
              </div>
            </div>

            {/* Peta Interaktif Kanan (Tactile Card) */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl p-6 sm:p-8 bg-white shadow-2xl shadow-marun/10 border border-garis/80 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-marun">Peta Presisi Lokasi Kos</h3>
                    <p className="text-xs text-cokelat-tua/70 mt-0.5">Jl. Buraq, Simpang Baru, Binawidya</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Kawasan Panam
                  </span>
                </div>

                <div className="aspect-video w-full rounded-2xl bg-latar border border-garis flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <MapPin className="w-10 h-10 text-marun animate-bounce" />
                  <div>
                    <p className="text-sm font-bold text-cokelat-tua">Kos Putri Alhamra Pekanbaru</p>
                    <p className="text-xs text-cokelat-tua/60 max-w-xs mt-1">
                      Buka titik presisi langsung pada Google Maps peramban untuk panduan rute navigasi.
                    </p>
                  </div>
                  <a
                    href={urlGoogleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-marun hover:bg-marun/90 text-white text-xs font-bold shadow-md transition-all active:scale-95"
                  >
                    <span>Buka Peta Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PERATURAN & KETENTUAN (EDITORIAL TATA TERTIB)          */}
      {/* ========================================================= */}
      <section
        id="peraturan"
        aria-label="Peraturan dan Ketentuan Sewa"
        className="bg-white py-24 lg:py-32 border-y border-garis/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              TATA TERTIB KOS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Peraturan untuk Kenyamanan Bersama
            </h2>
            <p className="text-base text-cokelat-tua/75 leading-relaxed font-normal">
              Diterapkan dengan penuh kesadaran demi ketenangan istirahat, keamanan mahasiswi, dan keharmonisan lingkungan.
            </p>
          </div>

          {/* 4 Pilar Tata Tertib Editorial */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 pb-6 border-b-2 border-garis hover:border-marun transition-colors">
              <span className="text-xs font-mono font-bold text-terakota uppercase">01 / KEAMANAN</span>
              <h3 className="text-lg font-bold text-marun">Jam Malam & Kunci</h3>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Pintu gerbang batas dikunci pukul <strong>22.00 WIB</strong> (Senin–Jumat & Minggu) dan <strong>22.30 WIB</strong> (Sabtu). Kunci kamar dipegang masing-masing penghuni.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b-2 border-garis hover:border-marun transition-colors">
              <span className="text-xs font-mono font-bold text-terakota uppercase">02 / KUNJUNGAN</span>
              <h3 className="text-lg font-bold text-marun">Aturan Tamu & Menginap</h3>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Tamu berkunjung di ruang tamu. Jatah menginap <strong>2 kali sebulan</strong>: keluarga maksimal 1 minggu dan teman sesama mahasiswi maksimal 2 hari.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b-2 border-garis hover:border-marun transition-colors">
              <span className="text-xs font-mono font-bold text-terakota uppercase">03 / KETERTIBAN</span>
              <h3 className="text-lg font-bold text-marun">Larangan Merokok & Hewan</h3>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Dilarang membawa <strong>hewan peliharaan</strong> dan dilarang <strong>merokok/vape</strong> di seluruh area kos demi kualitas udara bersih dan kesehatan.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b-2 border-garis hover:border-marun transition-colors">
              <span className="text-xs font-mono font-bold text-terakota uppercase">04 / FLEKSIBILITAS</span>
              <h3 className="text-lg font-bold text-marun">Elektronik Tanpa Biaya</h3>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Bebas membawa kulkas mini, dispenser, kompor, atau setrika <strong>tanpa biaya tambahan</strong> (listrik menggunakan token mandiri kamar).
              </p>
            </div>
          </div>

          {/* Strip Ringkas Ketentuan Sewa */}
          <div className="mt-16 p-8 rounded-3xl bg-latar border border-garis/80 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-marun uppercase tracking-wider text-xs">Jatuh Tempo Sewa</h4>
              <p className="text-cokelat-tua/75 mt-1 leading-relaxed">
                Pembayaran sewa jatuh tempo setiap <strong>tanggal 1</strong> setiap bulan melalui transfer bank.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-marun uppercase tracking-wider text-xs">Pemberitahuan Pindah</h4>
              <p className="text-cokelat-tua/75 mt-1 leading-relaxed">
                Mohon mengabari pengelola kos sekurang-kurangnya <strong>1 minggu sebelumnya</strong> saat masa sewa selesai.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-marun uppercase tracking-wider text-xs">Durasi Kontrak</h4>
              <p className="text-cokelat-tua/75 mt-1 leading-relaxed">
                Sistem sewa adalah <strong>bulanan</strong> (tidak melayani sewa harian).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. ALUR PEMESANAN (PROGRESSIVE LINEAR JOURNEY)            */}
      {/* ========================================================= */}
      <section
        id="cara-pesan"
        aria-label="Cara Pemesanan Kamar"
        className="bg-gradient-to-br from-latar via-kuning-mas/10 to-latar py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              PROSEDUR SEWA
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              4 Langkah Mudah Menuju Kamar Impian
            </h2>
            <p className="text-base text-cokelat-tua/75 leading-relaxed font-normal">
              Alur pemesanan transparan, cepat, dan tanpa birokrasi rumit:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="text-3xl font-black text-marun font-mono">01.</span>
              <h4 className="font-bold text-base text-marun">Hubungi WhatsApp</h4>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Kirim pesan langsung ke Pak Yusuf untuk mengecek ketersediaan tipe kamar pilihanmu.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-terakota font-mono">02.</span>
              <h4 className="font-bold text-base text-marun">Survei Lokasi</h4>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Kunjungi kos didampingi penjaga ramah untuk melihat unit dan fasilitas secara langsung.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-kuning-mas font-mono">03.</span>
              <h4 className="font-bold text-base text-marun">Pilih & Konfirmasi</h4>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Tentukan tipe kamar (Sendiri / Berdua) dan lakukan pembayaran sewa bulan pertama.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-3xl font-black text-emerald-700 font-mono">04.</span>
              <h4 className="font-bold text-base text-marun">Serah Terima Kunci</h4>
              <p className="text-xs sm:text-sm text-cokelat-tua/75 leading-relaxed">
                Dapatkan kunci kamar dari penjaga kos dan kamar siap kamu huni dengan nyaman!
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <a
              href={pesanWhatsApp(
                'Halo Pak Yusuf, saya ingin memesan kamar di Kos Putri Alhamra. Mohon informasi prosedurnya.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-kuning-mas hover:bg-[#d8b056] text-cokelat-tua font-extrabold text-sm sm:text-base shadow-xl shadow-kuning-mas/30 hover:scale-105 active:scale-95 transition-all border-2 border-kuning-mas/80"
            >
              <MessageCircle className="w-5 h-5 text-cokelat-tua" />
              <span>Hubungi Pengelola via WhatsApp (+62 813-7195-8826)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. TESTIMONI (QUOTE BLOCKS ELEGAN DENGAN TANDA KUTIP BESAR)*/}
      {/* ========================================================= */}
      <section
        aria-label="Ulasan Penghuni"
        className="bg-white py-24 lg:py-32 border-y border-garis/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              ULASAN TERVERIFIKASI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Apa Kata Penghuni Tentang Kos Alhamra?
            </h2>
            <p className="text-base text-cokelat-tua/75 font-normal">
              Dikutip langsung dari ulasan publik Google Maps Kos Putri Alhamra Pekanbaru:
            </p>
          </div>

          {/* Quote Blocks Elegan dengan Tanda Kutip Raksasa Transparan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Ulasan 1 */}
            <div className="relative rounded-3xl p-8 sm:p-9 bg-latar border border-garis/80 flex flex-col justify-between overflow-hidden shadow-sm">
              <span className="absolute top-2 right-4 text-8xl font-serif text-kuning-mas/25 select-none pointer-events-none leading-none">
                “
              </span>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-1 text-kuning-mas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kuning-mas" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-cokelat-tua/90 italic leading-relaxed">
                  "Tempat kost yang nyaman dan bersih."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-garis/70 relative z-10">
                <p className="text-xs font-bold text-marun">Yulia D*****</p>
                <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
              </div>
            </div>

            {/* Ulasan 2 */}
            <div className="relative rounded-3xl p-8 sm:p-9 bg-latar border border-garis/80 flex flex-col justify-between overflow-hidden shadow-sm">
              <span className="absolute top-2 right-4 text-8xl font-serif text-kuning-mas/25 select-none pointer-events-none leading-none">
                “
              </span>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-1 text-kuning-mas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kuning-mas" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-cokelat-tua/90 italic leading-relaxed">
                  "Tempatnya bagus dan bersih."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-garis/70 relative z-10">
                <p className="text-xs font-bold text-marun">Doni H*** G***</p>
                <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
              </div>
            </div>

            {/* Ulasan 3 */}
            <div className="relative rounded-3xl p-8 sm:p-9 bg-latar border border-garis/80 flex flex-col justify-between overflow-hidden shadow-sm">
              <span className="absolute top-2 right-4 text-8xl font-serif text-kuning-mas/25 select-none pointer-events-none leading-none">
                “
              </span>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-1 text-kuning-mas">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kuning-mas" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
                <p className="text-sm sm:text-base text-cokelat-tua/90 italic leading-relaxed">
                  "Kamarnya enak, fasilitas dan harga pas. Pemilik dan penjaganya ramah. Sayangnya parkir motor agak sesak kalau sedang ramai."
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-garis/70 relative z-10">
                <p className="text-xs font-bold text-marun">Kim D****</p>
                <p className="text-[11px] text-cokelat-tua/60">Ulasan Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. FAQ INTERAKTIF (CLEAN UNDERLINE MINIMALIST ACCORDION)  */}
      {/* ========================================================= */}
      <section
        id="faq"
        aria-label="Tanya Jawab"
        className="bg-latar py-24 lg:py-32"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-terakota bg-terakota/10 px-4 py-1.5 rounded-full">
              PUSAT INFORMASI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-marun tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-base text-cokelat-tua/75 font-normal">
              Informasi lengkap seputar operasional, fasilitas, dan ketentuan hunian:
            </p>
          </div>

          {/* Akordeon Minimalis dengan Underline Divider */}
          <div className="divide-y divide-garis/80 border-y border-garis/80">
            {daftarFaq.map((item, idx) => {
              const terbuka = faqTerbuka === idx;
              return (
                <div key={idx} className="py-2 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between py-5 text-left text-base sm:text-lg font-bold text-marun hover:text-terakota transition-colors focus:outline-none"
                    aria-expanded={terbuka}
                  >
                    <span className="pr-6">{item.tanya}</span>
                    {terbuka ? (
                      <ChevronUp className="w-5 h-5 shrink-0 text-terakota" />
                    ) : (
                      <ChevronDown className="w-5 h-5 shrink-0 text-cokelat-tua/50" />
                    )}
                  </button>
                  {terbuka && (
                    <div className="pb-6 pt-1 text-sm text-cokelat-tua/80 leading-relaxed max-w-3xl animate-fadeIn">
                      {item.jawab}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
