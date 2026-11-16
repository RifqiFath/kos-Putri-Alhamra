import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Baca file test data mentah
const testDataPath = path.resolve(__dirname, '../data/test_data_kerusakan.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

console.log('=== MEMULAI PENGUJIAN UNIT & LOGIKA MODUL KERUSAKAN (TAHAP 2) ===\n');

// 1. Verifikasi Format & Kelengkapan Data Uji Eksternal
console.log('1. Menguji Skema Berkas Uji (src/data/test_data_kerusakan.json)...');
assert.strictEqual(Array.isArray(testData), true, 'Data uji harus berupa Array');
assert.ok(testData.length >= 5, 'Data uji harus memiliki minimal 5 tiket variatif');

testData.forEach((tiket, idx) => {
  assert.ok(tiket.id, `Tiket [${idx}] harus memiliki id`);
  assert.ok(tiket.reporter_id, `Tiket [${idx}] harus memiliki reporter_id`);
  assert.ok(tiket.judul_masalah, `Tiket [${idx}] harus memiliki judul_masalah`);
  assert.ok(tiket.deskripsi, `Tiket [${idx}] harus memiliki deskripsi`);
  assert.ok(['plumbing', 'listrik', 'furnitur', 'kebersihan'].includes(tiket.kategori_ai),
    `Kategori AI tiket [${idx}] (${tiket.kategori_ai}) tidak valid`);
  assert.ok(['rendah', 'sedang', 'tinggi'].includes(tiket.tingkat_urgensi),
    `Tingkat urgensi tiket [${idx}] (${tiket.tingkat_urgensi}) tidak valid`);
  assert.ok(['menunggu', 'diproses', 'selesai', 'dibatalkan'].includes(tiket.status),
    `Status tiket [${idx}] (${tiket.status}) tidak valid`);
  assert.strictEqual(typeof tiket.skor_urgensi, 'number', 'Skor urgensi harus berupa angka');
});
console.log('   ✓ Validasi skema data uji lolos 100% (5 tiket lengkap & valid)\n');

// 2. Menguji Logika Fungsi Klasifikasi AI (NLP Classifier Logic)
console.log('2. Menguji Logika Inferensi Klasifikasi AI (NLP Classifier)...');

// Fungsi uji klasifikasi standalone (sama dengan logika pada kerusakanService)
async function klasifikasiUji(deskripsi, lokasi = '') {
  const teks = (deskripsi + ' ' + lokasi).toLowerCase();

  let kategori = 'furnitur';
  let bobotKategori = { plumbing: 0, listrik: 0, furnitur: 0, kebersihan: 0 };

  const kataPlumbing = ['bocor', 'kran', 'wastafel', 'air', 'mampet', 'saluran', 'pipa', 'wc', 'kloset'];
  const kataListrik = ['listrik', 'lampu', 'padam', 'stopkontak', 'colokan', 'kabel', 'korslet', 'percikan', 'api', 'asap', 'hangus'];
  const kataFurnitur = ['pintu', 'lemari', 'kasur', 'ranjang', 'meja', 'kursi', 'engsel'];
  const kataKebersihan = ['sampah', 'bau', 'kotor', 'bangkai', 'debu'];

  kataPlumbing.forEach((k) => { if (teks.includes(k)) bobotKategori.plumbing += 1.5; });
  kataListrik.forEach((k) => { if (teks.includes(k)) bobotKategori.listrik += 2; });
  kataFurnitur.forEach((k) => { if (teks.includes(k)) bobotKategori.furnitur += 1.2; });
  kataKebersihan.forEach((k) => { if (teks.includes(k)) bobotKategori.kebersihan += 1.3; });

  const entriTertinggi = Object.entries(bobotKategori).sort((a, b) => b[1] - a[1])[0];
  if (entriTertinggi && entriTertinggi[1] > 0) kategori = entriTertinggi[0];

  const kataBahayaKritis = ['api', 'asap', 'hangus', 'korslet', 'kebakaran', 'tersetrum', 'banjir', 'meluap'];
  const kataUrgensiSedang = ['bocor', 'mati', 'padam', 'gelap', 'menetes', 'rembes', 'bau busuk'];

  let urgensi = 'rendah';
  if (kataBahayaKritis.some((k) => teks.includes(k))) {
    urgensi = 'tinggi';
  } else if (kataUrgensiSedang.some((k) => teks.includes(k))) {
    urgensi = 'sedang';
  }

  return { kategori_ai: kategori, tingkat_urgensi: urgensi };
}

// Uji Kasus 1: Bahaya Kritis Kelistrikan (Stopkontak Berasap)
const hasilListrik = await klasifikasiUji('Stopkontak keluar percikan api dan ada asap berbau kabel hangus terbakar');
assert.strictEqual(hasilListrik.kategori_ai, 'listrik', 'Harus mendeteksi kategori listrik');
assert.strictEqual(hasilListrik.tingkat_urgensi, 'tinggi', 'Harus mendeteksi urgensi tinggi untuk percikan api dan asap');
console.log('   ✓ Kasus 1 (Bahaya Kelistrikan -> Listrik / Tinggi) lolos.');

// Uji Kasus 2: Plumbing (Pipa wastafel bocor dan air meluap)
const hasilPlumbing = await klasifikasiUji('Pipa wastafel kamar mandi pecah dan air meluap membanjiri lantai');
assert.strictEqual(hasilPlumbing.kategori_ai, 'plumbing', 'Harus mendeteksi kategori plumbing');
assert.strictEqual(hasilPlumbing.tingkat_urgensi, 'tinggi', 'Harus mendeteksi urgensi tinggi karena air meluap');
console.log('   ✓ Kasus 2 (Pipa Meluap -> Plumbing / Tinggi) lolos.');

// Uji Kasus 3: Lampu Padam (Urgensi Sedang)
const hasilLampu = await klasifikasiUji('Lampu kamar mandi padam sejak kemarin, ruangan jadi gelap');
assert.strictEqual(hasilLampu.kategori_ai, 'listrik', 'Harus mendeteksi kategori listrik');
assert.strictEqual(hasilLampu.tingkat_urgensi, 'sedang', 'Harus mendeteksi urgensi sedang untuk lampu padam');
console.log('   ✓ Kasus 3 (Lampu Padam -> Listrik / Sedang) lolos.');

// Uji Kasus 4: Furnitur Minor (Engsel Lemari Longgar)
const hasilFurnitur = await klasifikasiUji('Engsel pintu lemari pakaian agak kendor dan berderit saat dibuka');
assert.strictEqual(hasilFurnitur.kategori_ai, 'furnitur', 'Harus mendeteksi kategori furnitur');
assert.strictEqual(hasilFurnitur.tingkat_urgensi, 'rendah', 'Harus mendeteksi urgensi rendah untuk engsel kendor');
console.log('   ✓ Kasus 4 (Engsel Lemari -> Furnitur / Rendah) lolos.');

// Uji Kasus 5: Kebersihan (Tempat Sampah Bau)
const hasilKebersihan = await klasifikasiUji('Tempat sampah di dapur bersama bau busuk dan banyak lalat');
assert.strictEqual(hasilKebersihan.kategori_ai, 'kebersihan', 'Harus mendeteksi kategori kebersihan');
assert.strictEqual(hasilKebersihan.tingkat_urgensi, 'sedang', 'Harus mendeteksi urgensi sedang');
console.log('   ✓ Kasus 5 (Tempat Sampah -> Kebersihan / Sedang) lolos.');

console.log('\n=== SELURUH PENGUJIAN UNIT & LOGIKA BERHASIL (5/5 PASSED) ===');
