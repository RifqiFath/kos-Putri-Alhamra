# agent.md — Aturan Kerja Agent (Kos Putri Alhamra)

> Dokumen ini ditujukan untuk **agent koding**. Baca `spec.md` (apa yang dibangun) dan `styleguide.md` (tampilan dan suara) sebelum mengerjakan apa pun.

---

## 1. Peran & Alur Kerja
- **Pemilik proyek (Fathin):** Project manager. Memberi prompt per tahap, memeriksa laporan, dan memutuskan arah.
- **Agent (kamu):** Rekan koding. Mengerjakan satu tahap per prompt dan melaporkan hasilnya.
- **Alur per tahap:** Terima prompt → rencanakan singkat → kerjakan di cabang Git `tahap-XX-<nama-tahap>` → uji → perbarui dokumentasi → push ke remote (**JANGAN** merge ke `main` sebelum disetujui) → **tulis laporan tahap** (format di bagian 9) → berhenti dan tunggu prompt berikutnya.
- Jika ada hal ambigu yang berdampak besar, **tanya dulu**. Untuk hal kecil, ambil keputusan masuk akal dan **catat asumsinya** di laporan.

---

## 2. Penamaan & Bahasa — SEMUA BAHASA INDONESIA (WAJIB)
Semua yang kita buat sendiri wajib memakai bahasa Indonesia:
- Pesan commit: `jenis: ringkasan` (contoh: `fitur: tambah halaman login dan auth context`).
- Nama cabang: huruf kecil dengan tanda hubung (contoh: `tahap-01-inisialisasi-auth`).
- Nama berkas & folder: `camelCase` atau `snake_case` konsisten untuk komponen React (`LandingPage.jsx`, `auth_context.js`).
- Kelas, komponen React: `UpperCamelCase` (`Navbar.jsx`, `ProtectedRoute.jsx`).
- Variabel, fungsi, parameter, state: `lowerCamelCase` (`setIsLoggedIn`, `ambilDataKamar`).
- Komentar, dokumen kode (`///`), teks antarmuka, pesan galat, log, README, CHANGELOG, dan laporan: **Bahasa Indonesia**.

---

## 3. Aturan Teknis Frontend (React + Vite)
1. **Struktur Klasik Berbasis Tipe:** Gunakan folder `components`, `context`, `layouts`, `pages`, `router`, `services`, dan `utils` di dalam `src/`.
2. **Context API:** Gunakan Context API bawaan React untuk state global seperti `AuthContext`.
3. **Pustaka Ikon:** Wajib menggunakan **`lucide-react`** secara konsisten. Dilarang memakai emoji sebagai ikon antarmuka.
4. **Mock Auth & Quick Login:** Sediakan tombol *Quick Login* di halaman login untuk memudahkan pengujian instan 3 peran (`owner`, `tenant`, `staff`).
5. **Penanganan Error & Loading:** Setiap pengambilan data asinkron dari API wajib menggunakan komponen `SkeletonLoader` saat memuat dan `ToastNotification` saat sukses/gagal.
6. **Desain Responsif & Token Tailwind:** Gunakan palet warna resmi Kos Putri Alhamra yang terdaftar di `tailwind.config.js`. Tidak boleh ada warna atau ukuran *hard-coded* di luar token.

---

## 4. Definisi Selesai & Format Laporan Tahap
Sebuah tahap selesai hanya jika:
- [ ] Fitur sesuai spesifikasi dan berjalan normal di peramban.
- [ ] Analisis statis bersih tanpa galat.
- [ ] Penamaan konsisten berbahasa Indonesia.
- [ ] `README.md` dan `CHANGELOG.md` diperbarui.

**Format laporan (tulis di terminal di akhir tahap):**
```text
LAPORAN TAHAP: <nama tahap>
1. Yang dikerjakan: ...
2. File penting yang dibuat/diubah: ...
3. Cara menjalankan & mencoba: ...
4. Hasil uji & analisis: ...
5. Keputusan/asumsi yang saya ambil: ...
6. Masalah yang belum selesai / risiko: ...
7. Yang saya sarankan untuk tahap berikutnya: ...
8. Hal yang butuh keputusan pemilik proyek: ...