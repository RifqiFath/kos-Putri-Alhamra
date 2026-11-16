# Kos Putri Alhamra — Website Pengelolaan Operasional & Keuangan

> **Proyek Capstone:** Program ASAH 2026 — Tim **A26-CS136**  
> **Teknologi Frontend:** React 19 + Vite + Tailwind CSS + Context API + Lucide React  
> **Panduan Desain:** Gaya *Soft Bento* dengan palet warna asli bangunan Kos Putri Alhamra

---

## 1. Tentang Proyek
Website terintegrasi untuk pengelolaan operasional, pelaporan kerusakan fasilitas, verifikasi pembayaran sewa, dan pemantauan keuangan **Kos Putri Alhamra**, sebuah penyedia hunian mahasiswi di dekat kampus UNRI, STIFAR, dan UIN Pekanbaru milik Bapak Yusuf.

---

## 2. Fitur yang Telah Diimplementasikan

### Tahap 1 (Rilis v0.1.0 — Inisialisasi, Desain & Auth)
- **Landing Page Publik Soft Bento:** Hero section, katalog kamar (Rp700.000 & Rp900.000), fasilitas, keamanan CCTV 24 jam, galeri dokumentasi, peta lokasi Google Maps, peraturan kos, alur pemesanan WhatsApp, testimoni, FAQ interaktif, dan Floating WhatsApp Button (+6281371958826).
- **Token Desain & Warna Tailwind:** Palet warna kos (`marun`, `kuning-mas`, `terakota`, `cokelat-tua`, `latar`, `permukaan`, `garis`) dan font Plus Jakarta Sans.
- **Autentikasi & RBAC Guard:** `AuthContext` dengan **Quick Login** 3 peran (`owner`, `staff`, `tenant`) serta `ProtectedRoute`.
- **Komponen Umpan Balik:** `SkeletonLoader` berdenyut (*pulse*) dan `ToastNotification` sudut kanan atas.

### Tahap 2 (Rilis v0.2.0 — Modul Pelaporan Kerusakan & Klasifikasi AI)
- **Formulir Pelaporan Kerusakan (`FormLaporKerusakan.jsx`):**
  - Pemilihan lokasi fasilitas, judul, dan deskripsi bebas kendala kerusakan.
  - Unggah foto kondisi awal (*before*) dengan pratinjau gambar dan validasi ukuran (maks 5 MB).
  - Klasifikasi AI otomatis (*NLP Simulation*) mendeteksi kategori (`plumbing`, `listrik`, `furnitur`, `kebersihan`), urgensi (`rendah`, `sedang`, `tinggi`), skor probabilitas, dan rekomendasi keselamatan.
  - Tombol uji cepat data sampel kasus AI.
- **Daftar & Manajemen Tiket Perbaikan (`DaftarTiketKerusakan.jsx`):**
  - Pelacakan status perbaikan: `MENUNGGU` (amber), `DIPROSES` (biru), dan `SELESAI` (hijau).
  - Modal aksi penjaga kos: perbarui status, unggah foto perbaikan (*after*), catatan teknisi, dan biaya realisasi.
  - Filter multi-kriteria dan pencarian teks.

### Tahap 3 (Rilis v0.3.0 — Pencatatan Keuangan, Pembayaran Sewa & Verifikasi Kuitansi)
- **Modul Pembayaran & Status Tagihan Penghuni (`RiwayatTagihan.jsx`):**
  - Status tagihan bulanan: `BELUM BAYAR`, `MENUNGGU VERIFIKASI`, `LUNAS`, dan `DITOLAK`.
  - Formulir unggah bukti transfer sewa (JPG/PNG, pratinjau instan, batas 5 MB).
  - Informasi rekening resmi pengelola (BCA & Bank Riau Kepri Syariah a.n. Bapak Yusuf) dengan fitur salin nomor rekening satu klik.
  - **Kuitansi Pembayaran Digital:** Pratinjau kuitansi digital resmi saat sewa berstatus lunas dengan fitur cetak/unduh.
  - Pemberitahuan interaktif jika pembayaran ditolak disertai catatan alasan dari pemilik.
- **Modul Verifikasi Pembayaran Pemilik (`VerifikasiPembayaran.jsx`):**
  - Tabel peninjauan bukti transfer dengan pratinjau foto struk (*zoom modal*).
  - Tombol aksi cepat **Setujui Pembayaran** (otomatis mengubah status jadi `LUNAS` dan merekonsiliasi kas masuk).
  - Tombol aksi **Tolak Pembayaran** (disertai modal input alasan penolakan).
- **Manajemen Arus Kas & Pengeluaran Operasional (`ManajemenKeuangan.jsx`):**
  - Kartu metrik bento: Total Pemasukan, Total Pengeluaran, Saldo Bersih (*Net Income*), dan Kamar Menunggak.
  - Formulir pencatatan pengeluaran operasional (listrik & air PDAM, gaji staf, perbaikan fasilitas, lain-lain).
  - Buku mutasi kas (ledger transaksi) dengan filter jenis kas, filter kategori, dan pencarian.
- **Sistem Pengingat Jatuh Tempo Otomatis (*Due Date Countdown*):**
  - Menghitung hari menuju jatuh tempo tanggal 1 bulanan ("Terlambat X Hari", "Jatuh Tempo Hari Ini", "X Hari Menuju Tempo").
  - Lencana pengingat aktif di dasbor penghuni dan banner peringatan verifikasi tertunda di dasbor pemilik.
- **Data Uji Eksternal:** `src/data/test_data_keuangan.json` berisi data tagihan sewa bulanan dan mutasi arus kas operasional.

### Tahap 4 (Rilis v0.4.0 — Polesan Tiga Dasbor Peran & Desain Editorial Anti-Slop Landing Page)
- **Redesign Editorial Anti-Slop Landing Page (`LandingPage.jsx`):**
  - **Mengatasi *Card Fatigue*:** Membuang lebih dari 60% garis border tipis abu-abu yang mengurung elemen, menggantinya dengan pemisahan warna permukaan (*Zebra Striping* dan *Surface Layering*).
  - **Elevasi Hero Section:** Menyederhanakan tombol aksi menjadi 1 Primary CTA yang bersinar tegas (`Pesan via WhatsApp` warna Kuning Emas) dan 1 Secondary CTA elegan (`Lihat Pilihan Kamar & Tarif`), dilengkapi kartu tarif eksklusif bergaya *Floating Tactile Card* berbayangan dalam (`shadow-2xl`).
  - **Integrasi Logo Alhamra Murni (+50% Lebih Lebar):** Logo resmi Alhamra berukuran gagah tampil mandiri di navbar atas tanpa kotak pembungkus dan tanpa teks duplikat. Tab browser menggunakan favicon resmi `icon.svg`.
  - **Transformasi Fasilitas Menjadi Infografis Editorial (01–08):** Mengganti grid 4x2 kotak abu-abu generik dengan tipografi angka raksasa semi-transparan `01` s/d `08` bergaya majalah arsitektur.
  - **Galeri Foto Asimetris (*Asymmetrical Editorial Grid*):** 1 foto utama tampak depan fasad besar di kiri dengan caption majalah monokrom, berdampingan dengan grid pendukung interior kamar, sanitasi, dapur, dan parkir.
  - **Quote Blocks Testimoni Elegan:** Ulasan Google Maps disajikan dalam kartu kutipan lapang berlatar tanda kutip raksasa transparan (`“`).
  - **FAQ Akordeon Minimalis:** Garis pembatas horizontal tipis yang bersih (*clean underline divider*).
  - **Tombol WhatsApp Melayang:** Tombol kontak WhatsApp pengelola berada di posisi ideal sudut kanan bawah (`bottom-6 right-6`).
- **Polesan Konsistensi Desain Tiga Dasbor Peran (*Soft Bento Refinement*):**
  - **Dasbor Penghuni (`DasborPenghuni.jsx`):** Kartu sorotan unit hunian (nomor kamar A-05, tipe kamar, lantai, fasilitas aktif air & wifi gratis), ringkasan status tagihan sewa bulanan, lencana hitung mundur jatuh tempo tanggal 1, aturan jam malam (22.00 / 22.30 WIB), serta pelacakan tiket perbaikan.
  - **Dasbor Penjaga (`DasborPenjaga.jsx`):** 4 kartu metrik antrean tiket perbaikan (menunggu, diproses, selesai, kritis), modul **Log Kontrol Kebersihan & Fasilitas Bersama Harian** (dapur bersama, area jemuran, parkiran motor beratap, ruang TV & gembok pagar) dengan tombol toggle status periksa, serta daftar antrean tiket pengerjaan.
  - **Dasbor Pemilik (`DasborPemilik.jsx`):** Metrik ringkas keuangan arus kas, banner peringatan verifikasi struk transfer tertunda, modul visualisasi **Denah Okupansi 20 Kamar Kos Putri Alhamra** (16 kamar sendiri, 4 kamar berdua; 19 terisi hijau emerald, 1 tersedia kuning-mas siap huni), dan pintasan modul manajemen.

---

## 3. Akun Demo untuk Pengujian Cepat (*Quick Login*)
Tersedia tombol satu klik di halaman `/login` dengan kredensial bawaan:
- **Pemilik (Owner):** `pemilik@alhamra.id` &rarr; Akses rute `/pemilik`, `/pemilik/keuangan`, dan `/pemilik/verifikasi`
- **Penjaga (Staff):** `penjaga@alhamra.id` &rarr; Akses rute `/penjaga` dan `/penjaga/perbaikan`
- **Penghuni (Tenant):** `penghuni@alhamra.id` &rarr; Akses rute `/penghuni`, `/penghuni/tagihan`, dan `/penghuni/lapor-kerusakan`

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

### Langkah Menjalankan Pengujian Unit & Logika
```bash
# Menjalankan validasi skema data uji, AI klasifikasi, dan kalkulasi keuangan
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

## 5. Panduan Menguji Modul Keuangan & Pembayaran (Tahap 3)

### Skenario 1: Penghuni Mengunggah Bukti Bayar Sewa
1. Masuk via Quick Login **Penghuni (Tenant)** di `/login`.
2. Pada dasbor penghuni, amati kartu **Tagihan Sewa Kamar** yang memuat lencana status dan penghitung jatuh tempo.
3. Klik tautan **Konfirmasi Pembayaran Sewa** menuju `/penghuni/tagihan`.
4. Salin nomor rekening resmi pengelola (BCA atau Bank Riau Kepri Syariah) menggunakan tombol salin.
5. Pada formulir konfirmasi pembayaran, pilih foto struk transfer (atau gunakan foto sampel), ketik catatan pengirim (misal: *"Transfer via BCA an. Siti Rahma"*), lalu klik **Kirim Bukti Pembayaran**.
6. Status seketika berubah menjadi `MENUNGGU VERIFIKASI`.

### Skenario 2: Pemilik Memverifikasi Pembayaran Sewa (Setujui / Tolak)
1. Keluar akun, masuk via Quick Login **Pemilik (Owner)** di `/login`.
2. Pada dasbor pemilik (`/pemilik`), amati banner notifikasi biru: *"Ada X Pembayaran Sewa Menunggu Verifikasi"*.
3. Klik tombol **Verifikasi Sekarang** menuju `/pemilik/verifikasi`.
4. Klik thumbnail foto struk untuk memperbesar bukti transfer (*zoom preview*).
5. Klik **Setujui Pembayaran** -> Status tagihan berubah menjadi `LUNAS`, dan sistem secara otomatis menambahkan catatan mutasi kas pemasukan sebesar Rp700.000 ke buku kas.
6. Coba juga fitur **Tolak Pembayaran** pada tagihan lain: masukkan alasan (misal: *"Nominal kurang Rp200.000"*), maka tagihan berstatus `DITOLAK` dan penghuni akan melihat alasan penolakan tersebut di dasbornya.

### Skenario 3: Pemilik Mengelola Buku Kas & Mencatat Pengeluaran
1. Di akun Pemilik, buka menu **Manajemen Keuangan** (`/pemilik/keuangan`).
2. Amati 4 kartu bento ringkasan keuangan: Total Pemasukan, Total Pengeluaran, Saldo Kas Bersih (*Net Income*), dan Kamar Menunggak.
3. Klik tombol **Catat Kas Keluar** di pojok kanan atas.
4. Pilih kategori (misal: *Listrik & Air (PDAM/Token)*), masukkan nominal (misal: `250000`), ketik keterangan, lalu klik **Simpan Pengeluaran**.
5. Mutasi pengeluaran langsung tampil di tabel ledger kas dengan nominal bertanda merah `- Rp250.000` dan saldo bersih otomatis terupdate.

---

## 6. Panduan Mengamati Fitur Landing Page & Dasbor Peran (Tahap 4)

### Skenario 1: Menjelajahi Tampilan Editorial Anti-Slop Landing Page
1. Buka halaman utama (*landing page*) di `/`.
2. Amati logo resmi Alhamra yang tampil bersih tanpa box dan tanpa teks duplikat pada bilah navigasi atas.
3. Di pojok kanan bawah, amati tombol melayang WhatsApp pengelola yang siap dihubungi satu sentuhan.
4. Perhatikan bagian Hero: Judul megah, lencana slogan pill, 1 tombol utama *Pesan via WhatsApp* warna kuning emas, dan kartu tarif mengambang eksklusif di kanan.
5. Gulir ke bawah mengamati bagian Tipe Kamar, infografis bernomor 01–08 pada Fasilitas, galeri arsitektur asimetris, kutipan testimoni berlatar tanda kutip besar, dan akordeon FAQ bergaris bersih.

### Skenario 2: Mengamati Tiga Dasbor Peran yang Dipoles
1. **Dasbor Penghuni (`/penghuni`):** Amati kartu bento unit hunian lengkap dengan detail nomor kamar, tipe kamar, status air & wifi, kartu tagihan sewa bulanan, dan pelacak tiket perbaikan.
2. **Dasbor Penjaga (`/penjaga`):** Amati kartu antrean tiket perbaikan serta tabel **Log Kontrol Kebersihan & Fasilitas Bersama Harian** (dapur, jemuran, parkiran, gerbang malam). Klik tombol status untuk mengubah status periksa menjadi *"Bersih & Siap"* atau *"Perlu Ditinjau"*.
3. **Dasbor Pemilik (`/pemilik`):** Amati metrik keuangan kas masuk/keluar, banner verifikasi tertunda, serta modul **Denah Okupansi 20 Kamar** yang menampilkan 19 kamar terisi (hijau) dan 1 kamar kosong siap huni (Kamar 08, kuning-mas berkedip).

---

## 7. Bukti Tangkapan Layar Pengujian Antarmuka

### Berkas Tangkapan Layar Tahap 4 (`docs/tangkapan_layar/tahap_04/`):
- `01_landing_page_anti_slop.png` — Landing page editorial dengan elevasi hero dan tombol WhatsApp mengambang
- `02_dasbor_penghuni_dipoles.png` — Dasbor penghuni dengan kartu bento unit hunian, fasilitas aktif, dan status tagihan sewa
- `03_dasbor_penjaga_log_kebersihan.png` — Dasbor penjaga dengan antrean tiket dan modul log kontrol kebersihan/fasilitas harian
- `04_dasbor_pemilik_denah_okupansi_20kamar.png` — Dasbor pemilik dengan metrik kas dan grid denah okupansi 20 kamar (19 terisi, 1 tersedia)

### Berkas Tangkapan Layar Tahap 3 (`docs/tangkapan_layar/tahap_03/`):
- `01_dasbor_penghuni_status_tagihan.png` — Dasbor penghuni dengan kartu tagihan aktif dan lencana pengingat jatuh tempo
- `02_halaman_riwayat_tagihan_penghuni.png` — Halaman tagihan penghuni, rekening resmi bank, dan form unggah bukti transfer
- `03_dasbor_pemilik_ringkasan_keuangan.png` — Dasbor pemilik dengan kartu metrik bento keuangan dan banner verifikasi tertunda
- `04_halaman_verifikasi_pembayaran_pemilik.png` — Tabel verifikasi pembayaran pemilik dengan pratinjau struk transfer
- `05_modal_penolakan_pembayaran.png` — Modal input alasan penolakan bukti transfer yang tidak valid
- `06_halaman_manajemen_keuangan_ledger_kas.png` — Halaman manajemen arus kas dan tabel mutasi buku kas
- `07_modal_catat_pengeluaran_operasional.png` — Modal pencatatan pengeluaran operasional kos

---

## 7. Lisensi & Tim Pengembang
Dikembangkan oleh Tim Capstone **A26-CS136** ASAH 2026 untuk Kos Putri Alhamra.
