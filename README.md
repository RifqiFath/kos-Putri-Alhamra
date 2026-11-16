# Kos Putri Alhamra — Website Pengelolaan Operasional & Keuangan

> **Proyek Capstone:** Program ASAH 2026 — Tim **A26-CS136**  
> **Teknologi Frontend:** React 19 + Vite + Tailwind CSS + Context API + Lucide React  
> **Panduan Desain:** Gaya *Soft Bento* dengan palet warna asli bangunan Kos Putri Alhamra

---

## 1. Tentang Proyek
Website terintegrasi untuk pengelolaan operasional, pelaporan kerusakan fasilitas, verifikasi pembayaran sewa, dan pemantauan keuangan **Kos Putri Alhamra**, sebuah penyedia hunian mahasiswi di dekat kampus UNRI, STIFAR, dan UIN Pekanbaru milik Bapak Yusuf.

---

## 2. Fitur yang Tersedia (Tahap 1 — Rilis v0.1.0)
1. **Landing Page Publik Lengkap & Responsif:**
   - **Hero Section:** Tagline, keunggulan hunian, dan tombol Call-To-Action (CTA).
   - **Tipe Kamar & Harga:** Informasi Tipe Sendiri (Rp700.000/bln) dan Tipe Berdua (Rp900.000/bln) berfasilitas kamar mandi dalam, full furnished, lantai granit, dan bebas biaya air.
   - **Fasilitas & Keamanan:** Dapur bersama, ruang TV, free WiFi, CCTV 24 jam, dan parkiran motor gratis.
   - **Galeri Dokumentasi:** Placeholder terstruktur sesuai persetujuan pemilik kos.
   - **Lokasi & Akses:** Peta terhubung Google Maps dan jarak tempuh ke kampus UNRI, STIFAR, UIN.
   - **Peraturan & Ketentuan Sewa:** Jam malam (22.00/22.30 WIB), aturan tamu, larangan, dan jatuh tempo tgl 1.
   - **Cara Pemesanan:** 4 langkah praktis via WhatsApp pengelola.
   - **Testimoni:** Ulasan terverifikasi Google Maps.
   - **FAQ Interaktif:** Tanya jawab berbasis *accordion* buka-tutup.
   - **Floating WhatsApp Button:** Tombol melayang di pojok kanan bawah (`+6281371958826`).
2. **Desain & Token Tailwind Kos Putri Alhamra:**
   - Palet warna resmi: `marun` (`#682D2B`), `kuning-mas` (`#E3BD67`), `terakota` (`#A85A52`), `cokelat-tua` (`#4A2E2B`), `latar` (`#F8FAF9`), `permukaan` (`#FFFFFF`), `garis` (`#E2E8E6`).
   - Tipografi utama: **Plus Jakarta Sans**.
3. **Autentikasi & Route Guard (RBAC):**
   - `AuthContext` berbasis React Context API bawaan.
   - Penyimpanan sesi aman di *storage* lokal.
   - **Quick Login (Demo Akun)** di halaman `/login` untuk pengujian instan 3 peran tanpa mengetik manual.
   - `ProtectedRoute` untuk membatasi akses dasbor per peran.
4. **Komponen Umpan Balik (Feedback):**
   - `SkeletonLoader`: Efek berdenyut (*pulse*) saat memuat data.
   - `ToastNotification` & `ToastContext`: Notifikasi mengambang di sudut kanan atas.

---

## 3. Akun Demo untuk Pengujian Cepat (*Quick Login*)
Tersedia tombol satu klik di halaman `/login` dengan kredensial bawaan:
- **Pemilik (Owner):** `pemilik@alhamra.id` &rarr; Akses rute `/pemilik`
- **Penjaga (Staff):** `penjaga@alhamra.id` &rarr; Akses rute `/penjaga`
- **Penghuni (Tenant):** `penghuni@alhamra.id` &rarr; Akses rute `/penghuni`

---

## 4. Cara Instalasi & Menjalankan di Komputer Lokal

### Prasyarat
- **Node.js:** Versi 18 ke atas (Direkomendasikan v20 / v22)
- **NPM:** Versi 9 ke atas

### Langkah Instalasi
```bash
# 1. Kloning repositori (atau pastikan berada di folder proyek)
cd Kos

# 2. Instal semua dependensi
npm install

# 3. Jalankan server pengembangan lokal (Vite)
npm run dev
```
Buka peramban di alamat: `http://localhost:5173`

### Langkah Pembuatan Rilis (*Production Build*)
```bash
# Build aplikasi ke folder dist/
npm run build

# Menjalankan preview build produksi
npm run preview
```

---

## 5. Struktur Direktori Proyek
```text
src/
├── assets/                  # Berkas grafis dan logo resmi kos
│   ├── images/
│   └── logos/
├── components/              # Komponen modular antarmuka
│   ├── common/              # Tombol WhatsApp melayang & komponen dasar
│   ├── feedback/            # SkeletonLoader.jsx, ToastNotification.jsx
│   └── layout/              # NavbarUtama.jsx, Footer.jsx
├── context/                 # State global React Context
│   ├── AuthContext.jsx      # Manajemen sesi login & Quick Login
│   └── ToastContext.jsx     # Pemanggil notifikasi toast global
├── layouts/                 # Tata letak pembungkus rute
│   ├── MainLayout.jsx       # Layout halaman publik
│   └── DashboardLayout.jsx  # Layout area dasbor ber-sidebar
├── pages/                   # Komponen halaman aplikasi
│   ├── auth/                # LoginPage.jsx (Form & Quick Login)
│   ├── pemilik/             # DasborPemilik, ManajemenKeuangan, Verifikasi, Prediksi
│   ├── penghuni/            # DasborPenghuni, FormLaporKerusakan, RiwayatTagihan
│   ├── penjaga/             # DasborPenjaga, DaftarPerbaikanFasilitas
│   └── publik/              # LandingPage.jsx, HalamanKatalogKamar.jsx
├── router/                  # Konfigurasi rute & proteksi RBAC
│   ├── AppRouter.jsx
│   └── ProtectedRoute.jsx
├── services/                # Konfigurasi komunikasi API (Axios instance)
│   └── api.js
├── utils/                   # Utilitas pembantu
│   └── formatMataUang.js    # Konversi format Rupiah (IDR)
├── App.jsx
├── main.jsx
└── index.css
```

---

## 6. Lisensi & Tim Pengembang
Dikembangkan oleh Tim Capstone **A26-CS136** ASAH 2026 untuk Kos Putri Alhamra.
