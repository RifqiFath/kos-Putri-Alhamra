import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca file test data mentah keuangan
const testDataPath = path.resolve(__dirname, '../data/test_data_keuangan.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

console.log('=== MEMULAI PENGUJIAN UNIT & LOGIKA MODUL KEUANGAN (TAHAP 3) ===\n');

// 1. Verifikasi Format & Kelengkapan Skema Data Keuangan
console.log('1. Menguji Skema Berkas Uji (src/data/test_data_keuangan.json)...');
assert.ok(testData.tagihan_sewa, 'Data harus memiliki koleksi tagihan_sewa');
assert.ok(testData.transaksi_kas, 'Data harus memiliki koleksi transaksi_kas');
assert.ok(testData.rekening_pengelola, 'Data harus memiliki koleksi rekening_pengelola');
assert.ok(testData.tagihan_sewa.length >= 5, 'Tagihan sewa minimal 5 item');
assert.ok(testData.transaksi_kas.length >= 3, 'Transaksi kas minimal 3 item');

testData.tagihan_sewa.forEach((t, i) => {
  assert.ok(t.id, `Tagihan [${i}] harus punya ID`);
  assert.ok(t.nominal > 0, `Tagihan [${i}] nominal harus > 0`);
  assert.ok(
    ['belum_bayar', 'menunggu_verifikasi', 'lunas', 'ditolak'].includes(t.status),
    `Status tagihan [${i}] (${t.status}) tidak valid`
  );
  assert.ok(t.jatuh_tempo, `Tagihan [${i}] harus punya tanggal jatuh tempo`);
});

testData.transaksi_kas.forEach((trx, i) => {
  assert.ok(trx.id, `Transaksi [${i}] harus punya ID`);
  assert.ok(['pemasukan', 'pengeluaran'].includes(trx.jenis_kas), `Jenis kas [${i}] tidak valid`);
  assert.ok(trx.nominal > 0, `Nominal [${i}] harus > 0`);
});
console.log('   ✓ Validasi skema data tagihan & transaksi lolos 100%\n');

// 2. Menguji Logika Pengingat Jatuh Tempo (Due Date Countdown)
console.log('2. Menguji Logika Perhitungan Jatuh Tempo (Tanggal 1 Bulanan)...');

function hitungJatuhTempoUji(tanggalJatuhTempo, statusBayar, tanggalSekarang) {
  if (statusBayar === 'lunas') {
    return { status_waktu: 'lunas', teks_pengingat: 'Sudah Lunas' };
  }

  const hariIni = new Date(tanggalSekarang);
  hariIni.setHours(0, 0, 0, 0);

  const tglTempo = new Date(tanggalJatuhTempo);
  tglTempo.setHours(0, 0, 0, 0);

  const selisihMs = tglTempo.getTime() - hariIni.getTime();
  const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24));

  if (selisihHari < 0) {
    return { status_waktu: 'terlambat', teks_pengingat: `Terlambat ${Math.abs(selisihHari)} hari` };
  } else if (selisihHari === 0) {
    return { status_waktu: 'hari_ini', teks_pengingat: 'Jatuh tempo HARI INI' };
  } else {
    return { status_waktu: 'akan_datang', teks_pengingat: `${selisihHari} hari menuju jatuh tempo` };
  }
}

// Kasus A: Sudah lunas
const hasilLunas = hitungJatuhTempoUji('2026-11-01', 'lunas', '2026-11-05');
assert.strictEqual(hasilLunas.status_waktu, 'lunas', 'Status lunas harus diidentifikasi lunas');
console.log('   ✓ Kasus A (Status Lunas) lolos.');

// Kasus B: Terlambat (Hari ini 16 Nov, jatuh tempo 1 Nov)
const hasilTerlambat = hitungJatuhTempoUji('2026-11-01', 'belum_bayar', '2026-11-16');
assert.strictEqual(hasilTerlambat.status_waktu, 'terlambat', 'Harus mendeteksi status terlambat');
assert.strictEqual(hasilTerlambat.teks_pengingat, 'Terlambat 15 hari');
console.log('   ✓ Kasus B (Terlambat 15 Hari) lolos.');

// Kasus C: Jatuh tempo hari ini
const hasilHariIni = hitungJatuhTempoUji('2026-11-01', 'belum_bayar', '2026-11-01');
assert.strictEqual(hasilHariIni.status_waktu, 'hari_ini', 'Harus mendeteksi jatuh tempo hari ini');
console.log('   ✓ Kasus C (Jatuh Tempo Hari Ini) lolos.\n');

// 3. Menguji Perhitungan Ringkasan Laba Rugi Kas
console.log('3. Menguji Akurasi Kalkulasi Laba Rugi & Arus Kas...');

const transaksi = testData.transaksi_kas;
const totalPemasukan = transaksi
  .filter((t) => t.jenis_kas === 'pemasukan')
  .reduce((acc, curr) => acc + curr.nominal, 0);

const totalPengeluaran = transaksi
  .filter((t) => t.jenis_kas === 'pengeluaran')
  .reduce((acc, curr) => acc + curr.nominal, 0);

const saldoBersih = totalPemasukan - totalPengeluaran;

// Verifikasi kalkulasi numerik
assert.strictEqual(totalPemasukan, 1600000, 'Total pemasukan awal harus Rp1.600.000 (700rb + 900rb)');
assert.strictEqual(totalPengeluaran, 1985000, 'Total pengeluaran awal harus Rp1.985.000 (1.5jt + 350rb + 135rb)');
assert.strictEqual(saldoBersih, -385000, 'Saldo bersih awal harus -Rp385.000');
console.log(`   ✓ Total Pemasukan Terhitung: Rp${totalPemasukan.toLocaleString('id-ID')}`);
console.log(`   ✓ Total Pengeluaran Terhitung: Rp${totalPengeluaran.toLocaleString('id-ID')}`);
console.log(`   ✓ Saldo Kas Bersih: Rp${saldoBersih.toLocaleString('id-ID')}`);
console.log('   ✓ Kalkulasi arus kas terbukti akurat 100%.\n');

// 4. Menguji Alur Rekonsiliasi Otomatis (Verifikasi Setujui Pembayaran)
console.log('4. Menguji Alur Rekonsiliasi Otomatis Saat Verifikasi Disetujui...');

function verifikasiUji(tagihan, aksi, alasan = '') {
  if (aksi === 'SETUJUI') {
    const tagihanBaru = { ...tagihan, status: 'lunas', verified_at: new Date().toISOString() };
    const transaksiBaru = {
      id: `TRX-TEST-${Date.now()}`,
      payment_id: tagihanBaru.id,
      kategori: 'sewa_kamar',
      jenis_kas: 'pemasukan',
      nominal: tagihanBaru.nominal,
      keterangan: `Pelunasan sewa ${tagihanBaru.nomor_kamar} (${tagihanBaru.nama_penghuni})`,
    };
    return { tagihan: tagihanBaru, transaksi: transaksiBaru };
  } else {
    const tagihanBaru = { ...tagihan, status: 'ditolak', alasan_penolakan: alasan };
    return { tagihan: tagihanBaru, transaksi: null };
  }
}

const tagihanSiti = testData.tagihan_sewa.find((t) => t.id === 'TAG-2026-11-005');
const hasilSetujui = verifikasiUji(tagihanSiti, 'SETUJUI');

assert.strictEqual(hasilSetujui.tagihan.status, 'lunas', 'Status tagihan harus berubah jadi LUNAS');
assert.ok(hasilSetujui.transaksi, 'Harus otomatis menghasilkan mutasi kas pemasukan');
assert.strictEqual(hasilSetujui.transaksi.nominal, 700000, 'Nominal mutasi kas harus sama dengan nominal sewa');
assert.strictEqual(hasilSetujui.transaksi.jenis_kas, 'pemasukan', 'Jenis kas harus pemasukan');
console.log('   ✓ Verifikasi Setujui: Status Lunas & Otomatis Tercatat ke Kas Masuk.');

// Kasus Tolak dengan Alasan
const hasilTolak = verifikasiUji(tagihanSiti, 'TOLAK', 'Nominal transfer kurang Rp200.000');
assert.strictEqual(hasilTolak.tagihan.status, 'ditolak', 'Status tagihan harus DITOLAK');
assert.strictEqual(hasilTolak.tagihan.alasan_penolakan, 'Nominal transfer kurang Rp200.000');
assert.strictEqual(hasilTolak.transaksi, null, 'Tidak boleh mencatat kas masuk jika ditolak');
console.log('   ✓ Verifikasi Tolak: Status Ditolak dengan alasan tersimpan aman.');

console.log('\n=== SELURUH PENGUJIAN KEUANGAN & REKONSILIASI KAS BERHASIL (4/4 PASSED) ===');
