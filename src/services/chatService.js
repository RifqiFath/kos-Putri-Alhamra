import dataChatbot from '../data/test_data_chatbot.json' with { type: 'json' };

/**
 * Mengambil daftar pertanyaan cepat (Quick FAQ Pills)
 * @returns {Array<{id: string, pertanyaan: string, label: string}>}
 */
export const ambilPertanyaanCepat = () => {
  return dataChatbot.pertanyaan_cepat || [];
};

/**
 * Normalisasi teks untuk mempermudah pencocokan kata kunci
 * @param {string} teks
 * @returns {string}
 */
const normalisasiTeks = (teks) => {
  return (teks || '')
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Fungsi klasifikasi intent berdasarkan kata kunci dan semantik sederhana
 * @param {string} pesanPengguna
 * @returns {{ intent: string, jawaban: string, tautan_aksi: object|null, keyakinan: number }}
 */
export const klasifikasiIntent = (pesanPengguna) => {
  const teksBersih = normalisasiTeks(pesanPengguna);
  const kataKata = teksBersih.split(' ').filter(Boolean);

  let intentTerbaik = null;
  let skorTertinggi = 0;

  for (const item of dataChatbot.basis_pengetahuan_intent) {
    let skor = 0;

    for (const kataKunci of item.kata_kunci) {
      const kataKunciBersih = normalisasiTeks(kataKunci);

      // Pencocokan frasa persis mendapat skor lebih tinggi
      if (teksBersih.includes(kataKunciBersih)) {
        skor += kataKunciBersih.includes(' ') ? 3 : 2;
      } else {
        // Cek kecocokan per kata
        for (const k of kataKata) {
          if (k.length > 2 && (kataKunciBersih.startsWith(k) || k.startsWith(kataKunciBersih))) {
            skor += 0.8;
          }
        }
      }
    }

    if (skor > skorTertinggi) {
      skorTertinggi = skor;
      intentTerbaik = item;
    }
  }

  // Jika skor melewati ambang batas kecocokan minimum
  if (intentTerbaik && skorTertinggi >= 1.5) {
    const keyakinan = Math.min(0.98, 0.65 + skorTertinggi * 0.05);
    return {
      intent: intentTerbaik.intent,
      jawaban: intentTerbaik.jawaban,
      tautan_aksi: intentTerbaik.tautan_aksi || null,
      keyakinan: parseFloat(keyakinan.toFixed(2)),
    };
  }

  // Fallback jika tidak ada intent yang cocok
  return {
    intent: 'di_luar_konteks',
    jawaban: dataChatbot.pesan_fallback.teks,
    tautan_aksi: dataChatbot.pesan_fallback.tautan_aksi,
    keyakinan: 0.35,
  };
};

/**
 * Memproses pengiriman pesan pengguna ke chatbot dengan simulasi latensi AI RAG
 * @param {string} pesanTeks
 * @returns {Promise<{
 *   id: string,
 *   pengirim: 'bot',
 *   waktu: string,
 *   intent: string,
 *   teks: string,
 *   tautan_aksi: object|null,
 *   keyakinan: number
 * }>}
 */
export const prosesPesanChatbot = async (pesanTeks) => {
  // Simulasi penundaan jaringan / inferensi RAG (400 - 700 ms)
  const waktuTunggu = Math.floor(Math.random() * 300) + 400;
  await new Promise((resolve) => setTimeout(resolve, waktuTunggu));

  const hasil = klasifikasiIntent(pesanTeks);
  const sekarang = new Date();
  const jamMenit = sekarang.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return {
    id: `bot-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    pengirim: 'bot',
    waktu: jamMenit,
    intent: hasil.intent,
    teks: hasil.jawaban,
    tautan_aksi: hasil.tautan_aksi,
    keyakinan: hasil.keyakinan,
  };
};

export default {
  ambilPertanyaanCepat,
  klasifikasiIntent,
  prosesPesanChatbot,
};
