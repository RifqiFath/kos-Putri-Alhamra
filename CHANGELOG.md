# Catatan Perubahan (CHANGELOG)

Semua perubahan penting pada proyek **Kos Putri Alhamra** didokumentasikan dalam berkas ini. Format penomoran versi mengikuti prinsip [Semantic Versioning](https://semver.org/lang/id/).

---

## [v0.1.0] - 2026-11-16
### Ditambahkan
- **Inisialisasi Proyek & Git:**
  - Setup fondasi React 19 + Vite dengan bundler modern.
  - Pembentukan cabang `tahap-01-inisialisasi-landing-auth`.
  - Pembersihan utang teknis templat bawaan Vite.
- **Konfigurasi Desain & Token Warna Tailwind:**
  - Pendaftaran token palet warna resmi Kos Putri Alhamra (`marun`, `kuning-mas`, `terakota`, `cokelat-tua`, `latar`, `permukaan`, `garis`) di `tailwind.config.js`.
  - Integrasi tipografi font **Plus Jakarta Sans** melalui Google Fonts di `index.html` dan `index.css`.
  - Penerapan pola desain *Soft Bento* dengan sudut membulat elegan (`rounded-2xl`).
- **Autentikasi & Route Guard (RBAC):**
  - Implementasi `AuthContext.jsx` untuk manajemen sesi pengguna dan token JWT.
  - Implementasi `LoginPage.jsx` dengan fitur **Quick Login** untuk akun demo 3 peran (*Owner/Pemilik*, *Staff/Penjaga*, *Tenant/Penghuni*).
  - Implementasi `ProtectedRoute.jsx` untuk menjaga rute dasbor privat sesuai batasan peran pengguna.
- **Komponen Umpan Balik (Feedback):**
  - `SkeletonLoader.jsx` dengan efek animasi berdenyut (*pulse*) untuk transisi muat data.
  - `ToastNotification.jsx` dan `ToastContext.jsx` untuk pesan mengambang status sukses, peringatan, dan galat di sudut kanan atas.
- **Landing Page Publik Komprehensif (`LandingPage.jsx`):**
  - Hero section dengan tagline resmi dan tombol Call-To-Action (CTA).
  - Bagian katalog Tipe Kamar & Harga (Tipe Sendiri Rp700.000/bln dan Tipe Berdua Rp900.000/bln).
  - Bagian Fasilitas Bersama, Keamanan CCTV 24 Jam, dan Parkir Motor.
  - Galeri Dokumentasi Foto & Video (Placeholder dengan penanda persetujuan pemilik).
  - Peta Lokasi presisi Google Maps dan jarak tempuh ke kampus UNRI, STIFAR, dan UIN.
  - Peraturan Kos (Jam malam 22.00/22.30 WIB, tamu, larangan hewan/rokok).
  - Biaya & Ketentuan Sewa (Jatuh tempo tanggal 1 bulanan, bebas biaya air).
  - Alur 4 langkah pemesanan kamar dan narahubung WhatsApp (+6281371958826).
  - Bagian Testimoni dari ulasan Google Maps.
  - Bagian FAQ Interaktif dengan animasi *accordion*.
  - Komponen `TombolWhatsAppMelayang.jsx` di pojok kanan bawah.
- **Kerangka Shell Dasbor Peran (RBAC):**
  - Penyediaan tata letak ber-sidebar `DashboardLayout.jsx`.
  - Kerangka shell dasbor Penghuni (`DasborPenghuni.jsx`, `FormLaporKerusakan.jsx`, `RiwayatTagihan.jsx`).
  - Kerangka shell dasbor Penjaga (`DasborPenjaga.jsx`, `DaftarPerbaikanFasilitas.jsx`).
  - Kerangka shell dasbor Pemilik (`DasborPemilik.jsx`, `ManajemenKeuangan.jsx`, `VerifikasiPembayaran.jsx`, `AnalitikPrediksiChurn.jsx`).
  - Penandaan placeholder `<!-- dikerjakan oleh [Nama] -->` sesuai pembagian modul tim.
- **Dokumentasi Proyek:**
  - Penulisan panduan instalasi dan penggunaan pada `README.md`.
  - Penyediaan folder tangkapan layar di `docs/tangkapan_layar/tahap_01/`.
