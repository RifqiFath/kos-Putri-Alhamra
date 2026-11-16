import dataAwal from '../data/test_data_kerusakan.json';

const STORAGE_KEY = 'tiket_kerusakan_alhamra';

/**
 * Inisialisasi data tiket di penyimpanan lokal dari file test_data_kerusakan.json
 */
const inisialisasiPenyimpanan = () => {
  try {
    const dataTersimpan = localStorage.getItem(STORAGE_KEY);
    if (!dataTersimpan) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataAwal));
      return dataAwal;
    }
    return JSON.parse(dataTersimpan);
  } catch (error) {
    console.error('Gagal menginisialisasi tiket dari storage:', error);
    return dataAwal;
  }
};

/**
 * Layanan Simulasi Klasifikasi AI (NLP Classifier Service)
 * Memprediksi kategori fasilitas dan tingkat urgensi berdasarkan deskripsi teks.
 *
 * @param {string} deskripsi - Deskripsi teks masalah kerusakan
 * @param {string} lokasi - Lokasi fasilitas yang rusak
 * @returns {Promise<{kategori_ai: string, tingkat_urgensi: string, skor_urgensi: number, alasan_ai: string}>}
 */
export const klasifikasiKerusakanAI = async (deskripsi = '', lokasi = '') => {
  // Beri latensi halus simulasi jaringan / inferensi model AI (300ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const teks = (deskripsi + ' ' + lokasi).toLowerCase();

  // 1. Deteksi Kategori
  let kategori = 'furnitur';
  let bobotKategori = {
    plumbing: 0,
    listrik: 0,
    furnitur: 0,
    kebersihan: 0,
  };

  const kataPlumbing = [
    'bocor', 'kran', 'wastafel', 'air', 'mampet', 'saluran', 'pipa',
    'wc', 'kloset', 'got', 'comberan', 'rembes', 'keran', 'shower',
    'pembuangan', 'genangan', 'meluap',
  ];
  const kataListrik = [
    'listrik', 'lampu', 'padam', 'mati', 'stopkontak', 'colokan', 'kabel',
    'korslet', 'konsleting', 'percikan', 'api', 'asap', 'hangus', 'saklar',
    'bohlam', 'mcb', 'sekring', 'terbakar', 'tegangan', 'setrum',
  ];
  const kataFurnitur = [
    'pintu', 'lemari', 'kasur', 'ranjang', 'meja', 'kursi', 'engsel',
    'jendela', 'kunci', 'gagang', 'patah', 'rusak', 'baut', 'sekrup',
    'dinding', 'keramik', 'plafon', 'miring', 'ambruk', 'renggang',
  ];
  const kataKebersihan = [
    'sampah', 'bau', 'kotor', 'bangkai', 'debu', 'lumut', 'belatung',
    'lalat', 'kecoa', 'tikus', 'jorok', 'berlendir', 'jamur',
  ];

  kataPlumbing.forEach((k) => {
    if (teks.includes(k)) bobotKategori.plumbing += 1.5;
  });
  kataListrik.forEach((k) => {
    if (teks.includes(k)) bobotKategori.listrik += 2;
  });
  kataFurnitur.forEach((k) => {
    if (teks.includes(k)) bobotKategori.furnitur += 1.2;
  });
  kataKebersihan.forEach((k) => {
    if (teks.includes(k)) bobotKategori.kebersihan += 1.3;
  });

  const entriTertinggi = Object.entries(bobotKategori).sort(
    (a, b) => b[1] - a[1]
  )[0];

  if (entriTertinggi && entriTertinggi[1] > 0) {
    kategori = entriTertinggi[0];
  }

  // 2. Deteksi Urgensi & Skor
  let urgensi = 'rendah';
  let skor = 0.35;
  let alasan = 'Kerusakan minor pada perabot atau fasilitas non-vital, dapat dijadwalkan secara berkala.';

  const kataBahayaKritis = [
    'api', 'asap', 'hangus', 'korslet', 'konsleting', 'kebakaran',
    'terbakar', 'setrum', 'tersetrum', 'banjir', 'meluap', 'mampet total',
    'pecah', 'ambruk', 'bau gas', 'darurat', 'bahaya',
  ];

  const kataUrgensiSedang = [
    'bocor', 'mati', 'padam', 'gelap', 'menetes', 'rembes', 'bau busuk',
    'bau menyengat', 'buntu', 'licin', 'tidak bisa dipakai', 'macet',
  ];

  const mengandungKritis = kataBahayaKritis.some((k) => teks.includes(k));
  const mengandungSedang = kataUrgensiSedang.some((k) => teks.includes(k));

  if (mengandungKritis) {
    urgensi = 'tinggi';
    skor = Number((0.85 + Math.random() * 0.14).toFixed(2));
    alasan =
      'Indikasi bahaya keselamatan atau kerusakan struktural parah (kebocoran meluap/kelistrikan berisiko). Membutuhkan tindakan secepatnya.';
  } else if (mengandungSedang) {
    urgensi = 'sedang';
    skor = Number((0.55 + Math.random() * 0.2).toFixed(2));
    alasan =
      'Mengganggu kenyamanan aktivitas harian penghuni namun belum berisiko membahayakan keselamatan.';
  } else {
    urgensi = 'rendah';
    skor = Number((0.25 + Math.random() * 0.18).toFixed(2));
    alasan =
      'Kerusakan kategori ringan. Dapat ditangani dalam jadwal pemeliharaan rutin penjaga kos.';
  }

  return {
    kategori_ai: kategori,
    tingkat_urgensi: urgensi,
    skor_urgensi: skor,
    alasan_ai: alasan,
  };
};

/**
 * Mengambil semua daftar tiket dari penyimpanan lokal
 */
export const ambilSemuaTiket = async (filter = {}) => {
  // Simulasi latensi pemanggilan API (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200));
  let daftar = inisialisasiPenyimpanan();

  if (filter.status) {
    daftar = daftar.filter((t) => t.status.toLowerCase() === filter.status.toLowerCase());
  }

  if (filter.reporter_id) {
    daftar = daftar.filter((t) => t.reporter_id === filter.reporter_id);
  }

  if (filter.kategori) {
    daftar = daftar.filter((t) => t.kategori_ai.toLowerCase() === filter.kategori.toLowerCase());
  }

  if (filter.urgensi) {
    daftar = daftar.filter((t) => t.tingkat_urgensi.toLowerCase() === filter.urgensi.toLowerCase());
  }

  // Urutkan dari yang terbaru
  return daftar.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

/**
 * Mengambil tiket tunggal berdasarkan ID
 */
export const ambilTiketBerdasarkanId = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const daftar = inisialisasiPenyimpanan();
  return daftar.find((t) => t.id === id) || null;
};

/**
 * Membuat tiket kerusakan baru
 */
export const buatTiketBaru = async (dataInput, penggunaAktif) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const daftar = inisialisasiPenyimpanan();

  // Jalankan klasifikasi AI jika belum ada
  const hasilAI = await klasifikasiKerusakanAI(
    dataInput.deskripsi,
    dataInput.lokasi_fasilitas
  );

  const idTiket = `TIK-${new Date().getFullYear()}-${String(
    daftar.length + 1
  ).padStart(3, '0')}`;

  const tiketBaru = {
    id: idTiket,
    reporter_id: penggunaAktif?.id || 'usr-anon',
    nama_pelapor: penggunaAktif?.nama_lengkap || 'Penghuni Kos',
    nomor_kamar: penggunaAktif?.nomor_kamar || dataInput.nomor_kamar || 'Kamar A-05',
    lokasi_fasilitas: dataInput.lokasi_fasilitas || 'Kamar Mandi Dalam',
    judul_masalah: dataInput.judul_masalah || 'Laporan Kerusakan Fasilitas',
    deskripsi: dataInput.deskripsi,
    foto_sebelum_url: dataInput.foto_sebelum_url || null,
    foto_sesudah_url: null,
    kategori_ai: dataInput.kategori_ai || hasilAI.kategori_ai,
    tingkat_urgensi: dataInput.tingkat_urgensi || hasilAI.tingkat_urgensi,
    skor_urgensi: hasilAI.skor_urgensi,
    alasan_ai: hasilAI.alasan_ai,
    status: 'menunggu',
    catatan_teknisi: null,
    estimasi_biaya: dataInput.estimasi_biaya || null,
    biaya_realisasi: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const daftarBaru = [tiketBaru, ...daftar];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daftarBaru));
  return tiketBaru;
};

/**
 * Memperbarui status penanganan tiket oleh Penjaga (Staff) / Pemilik (Owner)
 */
export const perbaruiStatusTiket = async (id, statusBaru, pembaruanTambahan = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const daftar = inisialisasiPenyimpanan();
  const indeks = daftar.findIndex((t) => t.id === id);

  if (indeks === -1) {
    throw new Error(`Tiket dengan ID ${id} tidak ditemukan.`);
  }

  const tiketLama = daftar[indeks];
  const tiketTerbarui = {
    ...tiketLama,
    status: statusBaru,
    catatan_teknisi:
      pembaruanTambahan.catatan_teknisi !== undefined
        ? pembaruanTambahan.catatan_teknisi
        : tiketLama.catatan_teknisi,
    foto_sesudah_url:
      pembaruanTambahan.foto_sesudah_url !== undefined
        ? pembaruanTambahan.foto_sesudah_url
        : tiketLama.foto_sesudah_url,
    biaya_realisasi:
      pembaruanTambahan.biaya_realisasi !== undefined
        ? Number(pembaruanTambahan.biaya_realisasi)
        : tiketLama.biaya_realisasi,
    updated_at: new Date().toISOString(),
  };

  daftar[indeks] = tiketTerbarui;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));
  return tiketTerbarui;
};

/**
 * Reset data tiket ke data dummy awal (untuk keperluan pengujian ulang)
 */
export const resetDataTiketKeAwal = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataAwal));
  return dataAwal;
};

export default {
  ambilSemuaTiket,
  ambilTiketBerdasarkanId,
  buatTiketBaru,
  perbaruiStatusTiket,
  klasifikasiKerusakanAI,
  resetDataTiketKeAwal,
};
