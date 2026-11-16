import dataAwal from '../data/test_data_keuangan.json';

const STORAGE_KEY_TAGIHAN = 'tagihan_sewa_alhamra';
const STORAGE_KEY_TRANSAKSI = 'transaksi_kas_alhamra';

/**
 * Inisialisasi penyimpanan lokal untuk data keuangan
 */
const inisialisasiPenyimpanan = () => {
  try {
    let tagihan = localStorage.getItem(STORAGE_KEY_TAGIHAN);
    let transaksi = localStorage.getItem(STORAGE_KEY_TRANSAKSI);

    if (!tagihan) {
      localStorage.setItem(STORAGE_KEY_TAGIHAN, JSON.stringify(dataAwal.tagihan_sewa));
      tagihan = JSON.stringify(dataAwal.tagihan_sewa);
    }
    if (!transaksi) {
      localStorage.setItem(STORAGE_KEY_TRANSAKSI, JSON.stringify(dataAwal.transaksi_kas));
      transaksi = JSON.stringify(dataAwal.transaksi_kas);
    }

    return {
      tagihan: JSON.parse(tagihan),
      transaksi: JSON.parse(transaksi),
    };
  } catch (error) {
    console.error('Gagal memuat data keuangan dari localStorage:', error);
    return {
      tagihan: dataAwal.tagihan_sewa,
      transaksi: dataAwal.transaksi_kas,
    };
  }
};

/**
 * Menghitung selisih hari dan status pengingat jatuh tempo
 * Tanggal sewa jatuh tempo setiap tanggal 1 bulanan
 */
export const hitungStatusJatuhTempo = (tanggalJatuhTempo, statusBayar) => {
  if (statusBayar === 'lunas') {
    return { status_waktu: 'lunas', teks_pengingat: 'Sudah Lunas', badge_warna: 'hijau', hari_selisih: 0 };
  }

  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  const tglTempo = new Date(tanggalJatuhTempo);
  tglTempo.setHours(0, 0, 0, 0);

  const selisihMs = tglTempo.getTime() - hariIni.getTime();
  const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24));

  if (selisihHari < 0) {
    const hariTerlambat = Math.abs(selisihHari);
    return {
      status_waktu: 'terlambat',
      teks_pengingat: `Terlambat ${hariTerlambat} hari`,
      badge_warna: 'merah',
      hari_selisih: selisihHari,
    };
  } else if (selisihHari === 0) {
    return {
      status_waktu: 'hari_ini',
      teks_pengingat: 'Jatuh tempo HARI INI',
      badge_warna: 'kuning',
      hari_selisih: 0,
    };
  } else {
    return {
      status_waktu: 'akan_datang',
      teks_pengingat: `${selisihHari} hari menuju jatuh tempo`,
      badge_warna: 'biru',
      hari_selisih: selisihHari,
    };
  }
};

/**
 * Mengambil daftar tagihan sewa
 */
export const ambilDaftarTagihan = async (filter = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const { tagihan } = inisialisasiPenyimpanan();
  let hasil = [...tagihan];

  if (filter.tenant_id) {
    hasil = hasil.filter((t) => t.tenant_id === filter.tenant_id);
  }

  if (filter.status) {
    if (filter.status === 'terlambat') {
      hasil = hasil.filter((t) => {
        const info = hitungStatusJatuhTempo(t.jatuh_tempo, t.status);
        return info.status_waktu === 'terlambat' && t.status !== 'lunas';
      });
    } else {
      hasil = hasil.filter((t) => t.status.toLowerCase() === filter.status.toLowerCase());
    }
  }

  // Tambahkan komputasi info pengingat waktu
  return hasil.map((t) => ({
    ...t,
    pengingat: hitungStatusJatuhTempo(t.jatuh_tempo, t.status),
  }));
};

/**
 * Mengambil tagihan spesifik berdasarkan ID
 */
export const ambilTagihanBerdasarkanId = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const { tagihan } = inisialisasiPenyimpanan();
  const t = tagihan.find((item) => item.id === id);
  if (!t) return null;
  return {
    ...t,
    pengingat: hitungStatusJatuhTempo(t.jatuh_tempo, t.status),
  };
};

/**
 * Unggah bukti transfer pembayaran sewa oleh penghuni (Tenant)
 */
export const unggahBuktiPembayaran = async (tagihanId, { bukti_transfer_url, catatan_penghuni = '' }) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const { tagihan } = inisialisasiPenyimpanan();
  const indeks = tagihan.findIndex((t) => t.id === tagihanId);

  if (indeks === -1) {
    throw new Error(`Tagihan dengan ID ${tagihanId} tidak ditemukan.`);
  }

  const tagihanTerbarui = {
    ...tagihan[indeks],
    status: 'menunggu_verifikasi',
    bukti_transfer_url: bukti_transfer_url,
    catatan_penghuni: catatan_penghuni || tagihan[indeks].catatan_penghuni,
    tanggal_unggah: new Date().toISOString(),
    alasan_penolakan: null,
  };

  tagihan[indeks] = tagihanTerbarui;
  localStorage.setItem(STORAGE_KEY_TAGIHAN, JSON.stringify(tagihan));

  return {
    ...tagihanTerbarui,
    pengingat: hitungStatusJatuhTempo(tagihanTerbarui.jatuh_tempo, tagihanTerbarui.status),
  };
};

/**
 * Verifikasi pembayaran oleh pemilik (Owner): Setujui atau Tolak
 */
export const verifikasiPembayaran = async (tagihanId, aksi, alasanPenolakan = '') => {
  await new Promise((resolve) => setTimeout(resolve, 350));
  const { tagihan, transaksi } = inisialisasiPenyimpanan();
  const indeks = tagihan.findIndex((t) => t.id === tagihanId);

  if (indeks === -1) {
    throw new Error(`Tagihan dengan ID ${tagihanId} tidak ditemukan.`);
  }

  const tLama = tagihan[indeks];
  const tglSekarang = new Date().toISOString();

  if (aksi.toUpperCase() === 'SETUJUI') {
    // 1. Ubah status tagihan jadi Lunas
    const tagihanLunas = {
      ...tLama,
      status: 'lunas',
      verified_at: tglSekarang,
      alasan_penolakan: null,
    };
    tagihan[indeks] = tagihanLunas;
    localStorage.setItem(STORAGE_KEY_TAGIHAN, JSON.stringify(tagihan));

    // 2. Rekonsiliasi otomatis: Catat ke transaksi kas pemasukan
    const idTransaksi = `TRX-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
    const transaksiBaru = {
      id: idTransaksi,
      payment_id: tagihanLunas.id,
      kategori: 'sewa_kamar',
      jenis_kas: 'pemasukan',
      nominal: tagihanLunas.nominal,
      keterangan: `Pelunasan sewa ${tagihanLunas.nomor_kamar} (${tagihanLunas.nama_penghuni}) - ${tagihanLunas.periode_bulan}`,
      tanggal_transaksi: tglSekarang.split('T')[0],
    };

    const daftarTransaksiBaru = [transaksiBaru, ...transaksi];
    localStorage.setItem(STORAGE_KEY_TRANSAKSI, JSON.stringify(daftarTransaksiBaru));

    return {
      sukses: true,
      tagihan: tagihanLunas,
      transaksi: transaksiBaru,
      pesan: 'Pembayaran sewa berhasil diverifikasi dan tercatat ke kas masuk.',
    };
  } else {
    // Aksi TOLAK
    const tagihanDitolak = {
      ...tLama,
      status: 'ditolak',
      verified_at: tglSekarang,
      alasan_penolakan: alasanPenolakan || 'Bukti transfer tidak valid atau nominal tidak sesuai.',
    };
    tagihan[indeks] = tagihanDitolak;
    localStorage.setItem(STORAGE_KEY_TAGIHAN, JSON.stringify(tagihan));

    return {
      sukses: true,
      tagihan: tagihanDitolak,
      transaksi: null,
      pesan: 'Pembayaran sewa telah ditolak dengan catatan alasan.',
    };
  }
};

/**
 * Mencatat pengeluaran operasional harian oleh Penjaga (Staff) / Pemilik (Owner)
 */
export const catatPengeluaranOperasional = async ({
  kategori = 'lain_lain',
  nominal,
  keterangan,
  tanggal_transaksi,
}) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const { transaksi } = inisialisasiPenyimpanan();

  const idTransaksi = `TRX-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
  const transaksiBaru = {
    id: idTransaksi,
    payment_id: null,
    kategori: kategori,
    jenis_kas: 'pengeluaran',
    nominal: Number(nominal),
    keterangan: keterangan,
    tanggal_transaksi: tanggal_transaksi || new Date().toISOString().split('T')[0],
  };

  const daftarTransaksiBaru = [transaksiBaru, ...transaksi];
  localStorage.setItem(STORAGE_KEY_TRANSAKSI, JSON.stringify(daftarTransaksiBaru));

  return transaksiBaru;
};

/**
 * Mengambil riwayat mutasi kas (pemasukan & pengeluaran)
 */
export const ambilSemuaTransaksi = async (filter = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const { transaksi } = inisialisasiPenyimpanan();
  let hasil = [...transaksi];

  if (filter.jenis_kas) {
    hasil = hasil.filter((t) => t.jenis_kas === filter.jenis_kas);
  }

  if (filter.kategori) {
    hasil = hasil.filter((t) => t.kategori === filter.kategori);
  }

  // Urutkan tanggal terbaru
  return hasil.sort(
    (a, b) => new Date(b.tanggal_transaksi).getTime() - new Date(a.tanggal_transaksi).getTime()
  );
};

/**
 * Menghitung ringkasan laba rugi & status hunian
 */
export const ambilRingkasanLabaRugi = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const { tagihan, transaksi } = inisialisasiPenyimpanan();

  const totalPemasukan = transaksi
    .filter((t) => t.jenis_kas === 'pemasukan')
    .reduce((acc, curr) => acc + Number(curr.nominal), 0);

  const totalPengeluaran = transaksi
    .filter((t) => t.jenis_kas === 'pengeluaran')
    .reduce((acc, curr) => acc + Number(curr.nominal), 0);

  const saldoBersih = totalPemasukan - totalPengeluaran;

  const totalTagihanKamar = tagihan.length;
  const kamarLunas = tagihan.filter((t) => t.status === 'lunas').length;
  const kamarMenunggu = tagihan.filter((t) => t.status === 'menunggu_verifikasi').length;
  const kamarMenunggak = tagihan.filter(
    (t) => t.status === 'belum_bayar' || t.status === 'ditolak'
  ).length;

  const nominalMenunggak = tagihan
    .filter((t) => t.status !== 'lunas')
    .reduce((acc, curr) => acc + Number(curr.nominal), 0);

  const persentasePelunasan =
    totalTagihanKamar > 0 ? Math.round((kamarLunas / totalTagihanKamar) * 100) : 0;

  return {
    total_pemasukan: totalPemasukan,
    total_pengeluaran: totalPengeluaran,
    saldo_bersih: saldoBersih,
    total_tagihan_kamar: totalTagihanKamar,
    kamar_lunas: kamarLunas,
    kamar_menunggu: kamarMenunggu,
    kamar_menunggak: kamarMenunggak,
    nominal_menunggak: nominalMenunggak,
    persentase_pelunasan: persentasePelunasan,
  };
};

/**
 * Mengambil daftar rekening resmi pengelola
 */
export const ambilRekeningPengelola = () => {
  return dataAwal.rekening_pengelola;
};

/**
 * Reset data keuangan ke kondisi awal
 */
export const resetDataKeuanganKeAwal = () => {
  localStorage.setItem(STORAGE_KEY_TAGIHAN, JSON.stringify(dataAwal.tagihan_sewa));
  localStorage.setItem(STORAGE_KEY_TRANSAKSI, JSON.stringify(dataAwal.transaksi_kas));
  return dataAwal;
};

export default {
  hitungStatusJatuhTempo,
  ambilDaftarTagihan,
  ambilTagihanBerdasarkanId,
  unggahBuktiPembayaran,
  verifikasiPembayaran,
  catatPengeluaranOperasional,
  ambilSemuaTransaksi,
  ambilRingkasanLabaRugi,
  ambilRekeningPengelola,
  resetDataKeuanganKeAwal,
};
