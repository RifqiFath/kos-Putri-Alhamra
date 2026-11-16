import assert from 'node:assert';
import {
  klasifikasiIntent,
  ambilPertanyaanCepat,
  prosesPesanChatbot,
} from '../services/chatService.js';

console.log('--- Memulai Pengujian Unit Modul Chatbot Asisten Virtual (Tahap 4) ---');

// 1. Uji Pengambilan Pertanyaan Cepat (FAQ Pills)
const faqList = ambilPertanyaanCepat();
assert(Array.isArray(faqList) && faqList.length >= 4, 'Pertanyaan cepat harus berisi minimal 4 FAQ');
console.log(`[PASSED] Pengambilan pertanyaan cepat: Terverifikasi ${faqList.length} FAQ`);

// 2. Uji 10+ Variasi Pertanyaan Pengguna
const daftarUji = [
  {
    pertanyaan: 'Berapa biaya sewa bulanan untuk kamar tipe sendiri?',
    intentDiharapkan: 'info_harga',
  },
  {
    pertanyaan: 'Kalau mau kos berdua sewa per bulannya berapa ya?',
    intentDiharapkan: 'info_harga',
  },
  {
    pertanyaan: 'Pukul berapa jam malam di kos dan apakah gerbang pagar dikunci?',
    intentDiharapkan: 'aturan_jam_malam',
  },
  {
    pertanyaan: 'Apakah disediakan kasur lemari dan wifi gratis?',
    intentDiharapkan: 'info_fasilitas',
  },
  {
    pertanyaan: 'Apakah keluarga atau teman boleh menginap di kamar kos?',
    intentDiharapkan: 'aturan_tamu',
  },
  {
    pertanyaan: 'Apakah lokasi kos ini dekat dengan kampus UNRI atau STIFAR Panam?',
    intentDiharapkan: 'lokasi_kampus',
  },
  {
    pertanyaan: 'Keran air di kamar mandi bocor, bagaimana cara lapor perbaikannya?',
    intentDiharapkan: 'lapor_kerusakan',
    cekAksi: true,
  },
  {
    pertanyaan: 'Bagaimana cara melihat tagihan dan kuitansi pembayaran sewa saya?',
    intentDiharapkan: 'cek_tagihan',
    cekAksi: true,
  },
  {
    pertanyaan: 'Saya mau datang langsung untuk survei kamar besok siang',
    intentDiharapkan: 'jadwal_survei',
    cekAksi: true,
  },
  {
    pertanyaan: 'Bolehkah saya membawa kucing peliharaan ke kos?',
    intentDiharapkan: 'larangan_kos',
  },
  {
    pertanyaan: 'Boleh minta nomor WhatsApp pengelola Pak Yusuf?',
    intentDiharapkan: 'hubungi_pemilik',
    cekAksi: true,
  },
  {
    pertanyaan: 'Siapakah astronaut pertama yang mendarat di planet mars?',
    intentDiharapkan: 'di_luar_konteks',
    cekAksi: true,
  },
];

let totalLolos = 0;

for (let i = 0; i < daftarUji.length; i++) {
  const kasus = daftarUji[i];
  const hasil = klasifikasiIntent(kasus.pertanyaan);

  assert.strictEqual(
    hasil.intent,
    kasus.intentDiharapkan,
    `Gagal pada pertanyaan: "${kasus.pertanyaan}". Diharapkan: ${kasus.intentDiharapkan}, didapat: ${hasil.intent}`
  );

  assert(typeof hasil.jawaban === 'string' && hasil.jawaban.length > 10, 'Jawaban harus berupa teks valid');

  if (kasus.cekAksi) {
    assert(hasil.tautan_aksi !== null, `Harus memiliki tautan aksi untuk intent ${kasus.intentDiharapkan}`);
  }

  totalLolos++;
  console.log(`[PASSED] Uji #${i + 1} [Intent: ${hasil.intent} | Keyakinan: ${hasil.keyakinan}]: "${kasus.pertanyaan.substring(0, 40)}..."`);
}

// 3. Uji Pemanggilan Asinkron prosesPesanChatbot
async function ujiProsesPesan() {
  const respon = await prosesPesanChatbot('berapa harga sewa kamar sendiri?');
  assert(respon.id && respon.pengirim === 'bot', 'Respon bot harus memiliki ID dan pengirim bot');
  assert(respon.intent === 'info_harga', 'Intent harus info_harga');
  console.log('[PASSED] Uji Asinkron prosesPesanChatbot berhasil dengan latensi realistis');
  console.log(`--- Seluruh ${totalLolos} Skenario Uji Modul Chatbot 100% Lolos! ---`);
}

ujiProsesPesan();
