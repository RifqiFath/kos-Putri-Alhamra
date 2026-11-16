# Catatan Perubahan (CHANGELOG)

Semua perubahan penting pada proyek **Kos Putri Alhamra** didokumentasikan dalam berkas ini. Format penomoran versi mengikuti prinsip [Semantic Versioning](https://semver.org/lang/id/).

---

## [v0.4.0] - 2026-11-16
### Ditambahkan
- **Widget Chatbot Asisten Virtual AI RAG (`WidgetChatbot.jsx`):**
  - Komponen pemicu tombol mengambang (*floating action button*) di sudut kanan bawah yang berdampingan serasi dengan tombol WhatsApp pengelola.
  - Jendela percakapan interaktif (*chat window*) bergaya *Soft Bento* responsif dengan header avatar asisten Alhamra, status online aktif, tombol atur ulang percakapan, dan tombol tutup.
  - Gelembung pesan yang membedakan pesan pengguna (*user*) dan asisten Alhamra (*bot*).
  - Animasi mengetik berdenyut (*typing indicator*) dengan simulasi waktu tunggu inferensi AI RAG (400–700 ms).
  - Komponen chip pertanyaan cepat (*Quick FAQ Pills*) untuk jawaban populer satu sentuhan (Harga Sewa, Jam Malam, Fasilitas, Aturan Tamu, Jadwal Survei, Lapor Kerusakan).
  - Tautan aksi pengarahan (*Action Redirect Links*) di dalam balon respon bot (menuju halaman lapor kerusakan, kuitansi tagihan sewa, Google Maps lokasi kos, atau WhatsApp pengelola).
- **Modul Layanan Chatbot & Intent Router Mock (`services/chatService.js`):**
  - Implementasi fungsi `ambilPertanyaanCepat`, `klasifikasiIntent`, dan `prosesPesanChatbot`.
  - Mesin klasifikasi intent semantik berbasis pencocokan kata kunci dan bobot relevansi bersumber dari `data landing page kos putri alhamra.md`.
  - Dukungan intent: `info_harga`, `aturan_jam_malam`, `info_fasilitas`, `aturan_tamu`, `lokasi_kampus`, `lapor_kerusakan`, `cek_tagihan`, `jadwal_survei`, `larangan_kos`, `hubungi_pemilik`, dan `di_luar_konteks` (fallback ramah WhatsApp Pak Yusuf).
- **Polesan Konsistensi Desain Tiga Dasbor Peran (*Soft Bento Refinement*):**
  - **Dasbor Penghuni (`DasborPenghuni.jsx`):** Kartu bento informasi unit hunian (nomor kamar, tipe kamar, lantai, fasilitas kamar mandi dalam, status air & wifi gratis), ringkasan status tagihan sewa bulanan, lencana hitung mundur jatuh tempo tanggal 1, aturan jam malam (22.00 / 22.30 WIB), serta pelacakan tiket perbaikan.
  - **Dasbor Penjaga (`DasborPenjaga.jsx`):** 4 kartu metrik antrean tiket perbaikan (menunggu, diproses, selesai, kritis), modul **Log Kontrol Kebersihan & Fasilitas Bersama Harian** (dapur bersama, area jemuran, parkiran motor beratap, ruang TV & gembok pagar) dengan tombol toggle status periksa, serta daftar antrean tiket pengerjaan.
  - **Dasbor Pemilik (`DasborPemilik.jsx`):** Metrik ringkas keuangan arus kas, banner peringatan verifikasi struk transfer tertunda, modul visualisasi **Denah Okupansi 20 Kamar Kos Putri Alhamra** (16 kamar sendiri, 4 kamar berdua; 19 terisi hijau emerald, 1 tersedia kuning-mas siap huni), dan pintasan modul manajemen.
- **Data Uji Eksternal & Suite Pengujian Otomatis:**
  - Berkas `src/data/test_data_chatbot.json` berisi basis pengetahuan FAQ komprehensif dan intent semantik.
  - Skrip pengujian unit dan logika chatbot `src/tests/uji_modul_chat.js` yang terintegrasi ke perintah `npm test` (12/12 pengujian intent & async lolos 100%).
  - Skrip otomatisasi tangkapan layar peramban `src/tests/ambil_tangkapan_layar_tahap04.js`.
  - Berkas tangkapan layar PNG resmi yang tersimpan di `docs/tangkapan_layar/tahap_04/`.

---

## [v0.3.0] - 2026-11-16
### Ditambahkan
- **Modul Pembayaran & Status Tagihan Penghuni (`RiwayatTagihan.jsx`):**
  - Tampilan status tagihan bulanan transparan (`BELUM BAYAR`, `MENUNGGU VERIFIKASI`, `LUNAS`, `DITOLAK`).
  - Formulir unggah foto struk transfer bank / screenshot QRIS dengan pratinjau instan (*preview*) dan validasi berkas (maksimal 5 MB, format gambar JPG/PNG/WEBP).
  - Informasi rekening bank resmi pengelola (BCA & Bank Riau Kepri Syariah a.n. Bapak Yusuf) dengan fitur salin nomor rekening instan.
  - **Kuitansi Digital Pelunasan Sewa:** Pratinjau modal kuitansi digital resmi ketika status sewa telah lunas disertai fitur cetak/print.
  - Kotak peringatan interaktif jika bukti transfer ditolak pemilik kos lengkap dengan alasan penolakan.
  - Riwayat lengkap tagihan sewa bulanan.
- **Modul Verifikasi Pembayaran Pemilik (`VerifikasiPembayaran.jsx`):**
  - Tabel peninjauan bukti transfer dengan pratinjau foto struk (*zoom modal*).
  - Aksi **Setujui Pembayaran** yang secara otomatis mengubah status tagihan menjadi `LUNAS` dan merekonsiliasi kas masuk ke buku mutasi kas.
  - Aksi **Tolak Pembayaran** disertai modal dialog input alasan penolakan ramah pengguna.
  - Tab penyaring status (*Menunggu Verifikasi, Semua Tagihan, Lunas, Ditolak*) dan pencarian data penghuni.
- **Manajemen Keuangan & Arus Kas (`ManajemenKeuangan.jsx`):**
  - Empat kartu metrik bento: Total Pemasukan Kas, Total Pengeluaran, Saldo Bersih (*Net Income*), dan Jumlah Kamar Menunggak.
  - Formulir modal pencatatan pengeluaran operasional harian (listrik & air PDAM, gaji staf, perbaikan fasilitas, lain-lain).
  - Buku mutasi kas (ledger transaksi) dengan filter jenis kas (*Semua, Pemasukan, Pengeluaran*), filter kategori, dan pencarian teks.
- **Sistem Pengingat Jatuh Tempo Otomatis (*Due Date Countdown*):**
  - Komputasi dinamis status waktu tagihan sewa (jatuh tempo tanggal 1 bulanan) dengan lencana indikator status: "Terlambat X Hari", "Jatuh Tempo Hari Ini", dan "X Hari Menuju Tempo".
  - Banner peringatan dinamis di dasbor pemilik jika terdapat pembayaran yang menunggu verifikasi.
- **Layanan Penyimpanan & Mock Keuangan (`services/keuanganService.js`):**
  - Fungsi `ambilDaftarTagihan`, `ambilTagihanBerdasarkanId`, `unggahBuktiPembayaran`, `verifikasiPembayaran`, `catatPengeluaranOperasional`, `ambilSemuaTransaksi`, `ambilRingkasanLabaRugi`, dan `resetDataKeuanganKeAwal`.
- **Data Uji Eksternal & Suite Pengujian Otomatis:**
  - Berkas `src/data/test_data_keuangan.json` berisi data tagihan sewa bulanan dan mutasi arus kas operasional.
  - Skrip pengujian unit dan logika keuangan `src/tests/uji_modul_keuangan.js` yang terintegrasi ke perintah `npm test` (4/4 pengujian kalkulasi & rekonsiliasi kas lolos 100%).
  - Skrip otomatisasi tangkapan layar peramban `src/tests/ambil_tangkapan_layar_tahap03.js`.
  - Berkas tangkapan layar PNG resmi yang tersimpan di `docs/tangkapan_layar/tahap_03/`.

---

## [v0.2.0] - 2026-11-16
### Ditambahkan
- **Modul Pelaporan Kerusakan Fasilitas (`FormLaporKerusakan.jsx`):**
  - Pemilihan lokasi fasilitas, judul, dan deskripsi bebas kendala kerusakan.
  - Unggah foto kondisi awal (*before*) dengan fitur pratinjau gambar (*preview*) instan dan validasi berkas (maksimal 5 MB, format gambar JPG/PNG/WEBP).
  - Integrasi simulasi klasifikasi AI *real-time* berbasis NLP yang otomatis mendeteksi kategori fasilitas (`plumbing`, `listrik`, `furnitur`, `kebersihan`), menentukan tingkat urgensi (`rendah`, `sedang`, `tinggi`), menghitung skor urgensi, dan memberikan penjelasan alasan pertimbangan keselamatan.
  - Tombol pintasan **Uji Cepat Klasifikasi AI** (Kasus Stopkontak Berasap, Pipa Wastafel Bocor, Engsel Lemari Kendor).
- **Layanan Penyimpanan & Simulasi AI (`services/kerusakanService.js`):**
  - Implementasi fungsi `ambilSemuaTiket`, `ambilTiketBerdasarkanId`, `buatTiketBaru`, `perbaruiStatusTiket`, dan `resetDataTiketKeAwal`.
- **Modul Pemantauan & Riwayat Tiket Perbaikan (`DaftarTiketKerusakan.jsx`):**
  - Kartu bento informasi tiket lengkap dengan lencana status (`MENUNGGU`, `DIPROSES`, `SELESAI`), lencana kategori AI, lencana urgensi, galeri foto before-after, serta catatan teknisi.
  - Modal interaktif bagi Penjaga Kos (`staff`) untuk memperbarui status pengerjaan, mengunggah foto hasil pekerjaan (*after*), mencatat tindakan teknisi, dan mengisi biaya realisasi perbaikan.
- **Data Uji Eksternal & Suite Pengujian Otomatis:**
  - Berkas `src/data/test_data_kerusakan.json` berisi 5 variasi sampel tiket kerusakan realistis.
  - Skrip pengujian unit dan logika inferensi AI `src/tests/uji_modul_kerusakan.js`.

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
- **Dokumentasi Proyek:**
  - Penulisan panduan instalasi dan penggunaan pada `README.md`.
