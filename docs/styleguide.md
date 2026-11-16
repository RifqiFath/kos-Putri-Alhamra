# styleguide.md — Panduan Gaya Kos Putri Alhamra

> Panduan UI/UX dan identitas visual berbasis gaya **Soft Bento** yang disesuaikan dengan palet warna asli bangunan **Kos Putri Alhamra**.

---

## 1. Identitas Visual & Palet Warna (Tailwind Config)
Palet warna diambil langsung dari karakteristik fisik bangunan kos:

| Nama Token | Hex Code | Penggunaan Utama |
|---|---|---|
| `marun` / `cokelat-marun` | `#682D2B` | Teks logo, ikon utama, judul bagian, navbar gelap |
| `kuning-mas` / `warm-ochre` | `#E3BD67` | Warna aksen dominan, sorotan penting, tombol aksi sekunder |
| `terakota` / `cokelat-terakota` | `#A85A52` | Bingkai, aksen hangat, tombol pendukung |
| `cokelat-tua` / `dark-chestnut` | `#4A2E2B` | Footer, teks isi gelap, latar belakang kontras |
| `latar` | `#F8FAF9` | Warna latar belakang halaman web |
| `permukaan` | `#FFFFFF` | Latar kartu bento, modal, lembar putih |
| `garis` | `#E2E8E6` | Garis pemisah tipis dan batas kartu |

---

## 2. Tipografi & Suara Bahasa
- **Font Utama:** `Plus Jakarta Sans` (atau *sans-serif* sistem bersih sebagai cadangan).
- **Sapaan Pengguna:** Menggunakan kata **"kamu"** (santai, ramah, sabar, dan menguatkan).
- **Prinsip Teks:** Kalimat ringkas, jelas, langsung pada intinya, tidak menghakimi, serta berorientasi pada kemudahan operasional kos.

---

## 3. Komponen Utama & Pola Bento
- **Petak Bento (Bento Tile):** Menggunakan sudut membulat (`rounded-2xl` / radius 24px), latar belakang putih bersih atau tint pastel lembut, dengan bayangan halus (`shadow-sm`) dan border tipis. Satu petak mewakili satu informasi inti.
- **Tombol (Button):** Tinggi minimal 48px, sudut membulat, mendukung status aktif, hover, dan *loading*. Tombol utama menggunakan warna marun atau kuning mas dengan kontras teks yang memenuhi standar aksesibilitas.
- **Skeleton Loader:** Menampilkan kotak abu-abu berdenyut (*pulse*) saat komponen sedang memuat data API untuk mencegah pergeseran layout.
- **Toast Notification:** Kotak mengambang di sudut kanan atas untuk menginformasikan status sukses (hijau), peringatan (kuning), atau galat (merah) secara ramah pengguna.
- **Floating WhatsApp Button:** Tombol pintasan WhatsApp (`+6281371958826`) yang melayang di pojok kanan bawah halaman landing page agar selalu mudah diakses calon penyewa.