# Kos Putri Alhamra — Website Pengelolaan Operasional & Keuangan

> **Proyek Capstone:** Program ASAH 2026 — Tim **A26-CS136**  
> **Teknologi Frontend:** React 19 + Vite + Tailwind CSS + Context API + Lucide React  
> **Panduan Desain:** Gaya *Soft Bento* dengan palet warna asli bangunan Kos Putri Alhamra

---

## 1. Tentang Proyek
Website terintegrasi untuk pengelolaan operasional, pelaporan kerusakan fasilitas, verifikasi pembayaran sewa, dan pemantauan keuangan **Kos Putri Alhamra**, sebuah penyedia hunian mahasiswi di dekat kampus UNRI, STIFAR, dan UIN Pekanbaru milik Bapak Yusuf.

---

## 2. Fitur yang Telah Diimplementasikan

### Tahap 1 (Rilis v0.1.0)
- **Landing Page Publik Soft Bento:** Hero section, katalog kamar (Rp700.000 & Rp900.000), fasilitas, keamanan CCTV 24 jam, galeri dokumentasi, peta lokasi Google Maps, peraturan kos, alur pemesanan WhatsApp, testimoni, FAQ interaktif, dan Floating WhatsApp Button (+6281371958826).
- **Token Desain & Warna Tailwind:** Palet warna kos (`marun`, `kuning-mas`, `terakota`, `cokelat-tua`, `latar`, `permukaan`, `garis`) dan font Plus Jakarta Sans.
- **Autentikasi & RBAC Guard:** `AuthContext` dengan **Quick Login** 3 peran (`owner`, `staff`, `tenant`) serta `ProtectedRoute`.
- **Komponen Umpan Balik:** `SkeletonLoader` berdenyut (*pulse*) dan `ToastNotification` sudut kanan atas.

### Tahap 2 (Rilis v0.2.0 — Modul Pelaporan Kerusakan & Integrasi Klasifikasi AI)
- **Formulir Pelaporan Kerusakan (`FormLaporKerusakan.jsx`):**
  - Pemilihan lokasi fasilitas (Kamar Mandi Dalam, Kamar Tidur, Dapur Bersama, dll.).
  - Input judul dan deskripsi masalah secara bebas.
  - **Unggah Foto Kondisi Awal (Before)** dengan pratinjau (*preview*) gambar langsung dan validasi ukuran (maksimal 5 MB, format gambar JPG/PNG/WEBP).
  - **Klasifikasi AI Otomatis (NLP Simulation):** Menganalisis teks laporan secara *real-time* untuk memprediksi kategori (`plumbing`, `listrik`, `furnitur`, `kebersihan`), tingkat urgensi (`rendah`, `sedang`, `tinggi`), skor urgensi (0.00 - 1.00), dan alasan pertimbangan keselamatan.
  - **Tombol Kasus Uji Cepat:** Tiga tombol sampel kasus ("🔥 Stopkontak Berasap", "💧 Pipa Wastafel Bocor", "🪑 Engsel Lemari Longgar") untuk memudahkan evaluasi instan oleh penguji/dosen.
- **Pemantauan & Manajemen Tiket Perbaikan (`DaftarTiketKerusakan.jsx`):**
  - Pelacakan status perbaikan: `MENUNGGU` (amber), `DIPROSES` (biru), dan `SELESAI` (hijau).
  - **Akses Penjaga (Staff):** Memperbarui status pengerjaan tiket, mengunggah foto hasil perbaikan (*after*), menambahkan catatan teknisi, dan mencatat biaya realisasi perbaikan.
  - **Akses Penghuni (Tenant):** Memantau perkembangan perbaikan secara transparan (*real-time status tracker*).
  - Filter pencarian kata kunci, tab status, filter kategori AI, filter urgensi, serta tombol *Reset Data Sampel*.
- **Data Uji Eksternal:** `src/data/test_data_kerusakan.json` berisi 5 variasi tiket realistis untuk menguji seluruh skenario alur kerja.

---

## 3. Akun Demo untuk Pengujian Cepat (*Quick Login*)
Tersedia tombol satu klik di halaman `/login` dengan kredensial bawaan:
- **Pemilik (Owner):** `pemilik@alhamra.id` &rarr; Akses rute `/pemilik`
- **Penjaga (Staff):** `penjaga@alhamra.id` &rarr; Akses rute `/penjaga` dan `/penjaga/perbaikan`
- **Penghuni (Tenant):** `penghuni@alhamra.id` &rarr; Akses rute `/penghuni` dan `/penghuni/lapor-kerusakan`

---

## 4. Cara Instalasi & Menjalankan di Komputer Lokal

### Prasyarat
- **Node.js:** Versi 18 ke atas (Direkomendasikan v20 / v22)
- **NPM:** Versi 9 ke atas

### Langkah Menjalankan Server Lokal
```bash
# 1. Instal semua dependensi
npm install

# 2. Jalankan server pengembangan lokal (Vite)
npm run dev
```
Buka peramban pada alamat: `http://localhost:5173`

### Langkah Menjalankan Pengujian Unit & Logika AI
```bash
# Menjalankan validasi skema data uji & inferensi klasifikasi AI
npm test
```

### Langkah Pembuatan Rilis (*Production Build*)
```bash
# Build aplikasi ke folder dist/
npm run build

# Menjalankan preview build produksi
npm run preview
```

---

## 5. Panduan Menguji Modul Pelaporan Kerusakan (Tahap 2)

1. **Menguji dari Sudut Pandang Penghuni (Tenant):**
   - Buka `/login` dan klik tombol **Penghuni (Tenant)**.
   - Pada dasbor penghuni, klik tombol **Lapor Kerusakan**.
   - Pada halaman formulir, kamu bisa mengetik deskripsi secara bebas (misal: *"Kran wastafel bocor dan air meluap ke lantai"*) atau klik salah satu tombol **Uji Cepat Klasifikasi AI** di bagian atas.
   - Amati kotak lencana AI yang otomatis memetakan kategori (misal: *Plumbing / Pipa Air*) dan tingkat urgensinya (*Urgensi Tinggi*).
   - Unggah foto atau gunakan foto sampel, lalu klik **Kirim Laporan Kerusakan**.
   - Kamu akan diarahkan kembali ke Dasbor dengan tiket baru berstatus `MENUNGGU`.

2. **Menguji dari Sudut Pandang Penjaga Kos (Staff):**
   - Buka `/login` dan klik tombol **Penjaga (Staff)**.
   - Buka menu **Perbaikan Fasilitas** (`/penjaga/perbaikan`).
   - Cari tiket yang baru diajukan, lalu klik tombol **Perbarui Penanganan**.
   - Di modal yang muncul:
     - Ubah status menjadi `DIPROSES` atau `SELESAI`.
     - Unggah foto hasil perbaikan (*after*).
     - Tulis catatan teknisi (misal: *"Pipa telah diganti dengan fitting baru anti-bocor"*).
     - Masukkan estimasi biaya realisasi.
     - Klik **Simpan Pembaruan**.
   - Tiket akan langsung berpindah tab menjadi `SELESAI` dengan foto *before-after* berdampingan.

---

## 6. Bukti Tangkapan Layar Pengujian Antarmuka
Berkas tangkapan layar antarmuka tersimpan di direktori `docs/tangkapan_layar/tahap_02/`:
- `01_landing_page.png` — Antarmuka utama Landing Page publik Soft Bento
- `02_halaman_login_quick_login.png` — Halaman Login dengan tombol akses demo instan 3 peran
- `03_dasbor_penghuni_pelacakan_tiket.png` — Dasbor penghuni dengan pelacak tiket aktif
- `04_formulir_lapor_dan_klasifikasi_ai.png` — Formulir laporan dengan deteksi klasifikasi AI *real-time*
- `05_tiket_berhasil_dibuat.png` — Tiket baru berhasil masuk ke antrean dengan lencana urgensi
- `06_dasbor_penjaga_manajemen_tiket.png` — Antarmuka penjaga kos mengelola antrean tiket
- `07_modal_pembaruan_penanganan_teknisi.png` — Modal input hasil perbaikan dan foto *after* oleh teknisi

---

## 7. Struktur Direktori Proyek
```text
src/
├── assets/                  # Berkas grafis dan logo resmi kos
│   └── logos/
├── components/              # Komponen modular antarmuka
│   ├── cards/               # KartuTiketKerusakan.jsx, DaftarTiketKerusakan.jsx, Lencana
│   ├── common/              # Tombol WhatsApp melayang & komponen pendukung
│   ├── feedback/            # SkeletonLoader.jsx, ToastNotification.jsx
│   └── layout/              # NavbarUtama.jsx, Footer.jsx
├── context/                 # State global React Context
│   ├── AuthContext.jsx      # Manajemen sesi login & Quick Login
│   └── ToastContext.jsx     # Pemanggil notifikasi toast global
├── data/                    # Berkas data uji eksternal
│   └── test_data_kerusakan.json # 5 sampel tiket perbaikan realistis
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
├── services/                # Layanan komunikasi data & AI
│   ├── api.js               # Konfigurasi klien Axios
│   └── kerusakanService.js  # Layanan tiket lokal & simulasi klasifikasi AI NLP
├── tests/                   # Skrip pengujian otomatis
│   ├── uji_modul_kerusakan.js   # Unit & logic test suite
│   └── ambil_tangkapan_layar.js # Generator tangkapan layar otomatis
├── utils/                   # Utilitas pembantu
│   ├── formatMataUang.js    # Konversi format Rupiah (IDR)
│   └── formatTanggal.js     # Pembacaan tanggal ramah Indonesia
├── App.jsx
├── main.jsx
└── index.css
```

---

## 8. Lisensi & Tim Pengembang
Dikembangkan oleh Tim Capstone **A26-CS136** ASAH 2026 untuk Kos Putri Alhamra.
