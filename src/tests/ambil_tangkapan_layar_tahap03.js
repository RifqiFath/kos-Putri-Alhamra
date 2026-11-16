import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderHasil = path.resolve(__dirname, '../../docs/tangkapan_layar/tahap_03');

async function ambilTangkapanLayarTahap03() {
  console.log('Menjalankan peramban Edge untuk mengambil tangkapan layar Tahap 3...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    // 1. Login Penghuni & Dasbor Penghuni (Status Tagihan)
    console.log('1. Mengambil screenshot Dasbor Penghuni (Status Tagihan & Pengingat Tempo)...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Penghuni (Tenant)")');
    await page.waitForURL('**/penghuni');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '01_dasbor_penghuni_status_tagihan.png'),
      fullPage: false,
    });

    // 2. Halaman Riwayat Tagihan Penghuni
    console.log('2. Mengambil screenshot Halaman Riwayat Tagihan & Form Unggah Bukti...');
    await page.goto('http://localhost:4173/penghuni/tagihan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '02_halaman_riwayat_tagihan_penghuni.png'),
      fullPage: false,
    });

    // 3. Login Pemilik (Owner) & Dasbor Pemilik
    console.log('3. Beralih ke Pemilik (Owner) & Mengambil screenshot Dasbor Keuangan Bento...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Pemilik (Owner)")');
    await page.waitForURL('**/pemilik');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '03_dasbor_pemilik_ringkasan_keuangan.png'),
      fullPage: false,
    });

    // 4. Halaman Verifikasi Pembayaran Pemilik
    console.log('4. Mengambil screenshot Halaman Verifikasi Pembayaran...');
    await page.goto('http://localhost:4173/pemilik/verifikasi', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '04_halaman_verifikasi_pembayaran_pemilik.png'),
      fullPage: false,
    });

    // 5. Modal Tolak Pembayaran
    console.log('5. Mengambil screenshot Modal Penolakan Pembayaran...');
    const tombolTolak = page.locator('button:has-text("Tolak Pembayaran")').first();
    if (await tombolTolak.isVisible()) {
      await tombolTolak.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(folderHasil, '05_modal_penolakan_pembayaran.png'),
        fullPage: false,
      });
      // Tutup modal
      await page.click('button:has-text("Batal")');
      await page.waitForTimeout(300);
    }

    // 6. Halaman Manajemen Keuangan (Buku Kas & Ledger)
    console.log('6. Mengambil screenshot Buku Kas & Mutasi Transaksi...');
    await page.goto('http://localhost:4173/pemilik/keuangan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '06_halaman_manajemen_keuangan_ledger_kas.png'),
      fullPage: false,
    });

    // 7. Modal Catat Pengeluaran Operasional
    console.log('7. Mengambil screenshot Modal Catat Pengeluaran Operasional...');
    const tombolCatat = page.locator('button:has-text("Catat Kas Keluar")').first();
    if (await tombolCatat.isVisible()) {
      await tombolCatat.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(folderHasil, '07_modal_catat_pengeluaran_operasional.png'),
        fullPage: false,
      });
      await page.click('button:has-text("Batal")');
      await page.waitForTimeout(300);
    }

    // 8. Kuitansi Digital Pelunasan Sewa
    console.log('8. Mengambil screenshot Kuitansi Digital Pelunasan Sewa...');
    await page.goto('http://localhost:4173/penghuni/tagihan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const tombolKuitansi = page.locator('button:has-text("Kuitansi")').first();
    if (await tombolKuitansi.isVisible()) {
      await tombolKuitansi.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(folderHasil, '08_kuitansi_digital_pelunasan_sewa.png'),
        fullPage: false,
      });
    }

    console.log('=== SEMUA TANGKAPAN LAYAR TAHAP 3 BERHASIL DISIMPAN ===');
  } catch (error) {
    console.error('Galat saat mengambil tangkapan layar Tahap 3:', error);
  } finally {
    await browser.close();
  }
}

ambilTangkapanLayarTahap03();
