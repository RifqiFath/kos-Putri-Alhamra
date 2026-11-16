import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderHasil = path.resolve(__dirname, '../../docs/tangkapan_layar/tahap_02');

async function ambilTangkapanLayar() {
  console.log('Menjalankan peramban Edge untuk mengambil tangkapan layar...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    // 1. Landing Page
    console.log('1. Mengambil screenshot Landing Page...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(folderHasil, '01_landing_page.png'),
      fullPage: false,
    });

    // 2. Login Page & Quick Login
    console.log('2. Mengambil screenshot Halaman Login & Quick Login...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(folderHasil, '02_halaman_login_quick_login.png'),
      fullPage: false,
    });

    // 3. Quick Login sebagai Penghuni (Tenant)
    console.log('3. Melakukan Quick Login Tenant...');
    await page.click('button:has-text("Penghuni (Tenant)")');
    await page.waitForURL('**/penghuni');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '03_dasbor_penghuni_pelacakan_tiket.png'),
      fullPage: false,
    });

    // 4. Form Lapor Kerusakan & Analisis AI
    console.log('4. Membuka Form Lapor Kerusakan & Memuat Kasus AI...');
    await page.goto('http://localhost:4173/penghuni/lapor-kerusakan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Klik Kasus 1: Stopkontak Berasap (Urgensi Tinggi)
    await page.click('button:has-text("Kasus 1: Stopkontak Berasap")');
    await page.waitForTimeout(800); // Tunggu AI selesai inferensi

    await page.screenshot({
      path: path.join(folderHasil, '04_formulir_lapor_dan_klasifikasi_ai.png'),
      fullPage: false,
    });

    // 5. Submit Form
    console.log('5. Mengirimkan Laporan Kerusakan...');
    await page.click('button:has-text("Kirim Laporan Kerusakan")');
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(folderHasil, '05_tiket_berhasil_dibuat.png'),
      fullPage: false,
    });

    // 6. Login Penjaga (Staff)
    console.log('6. Beralih ke Penjaga (Staff) & Membuka Manajemen Tiket...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Penjaga (Staff)")');
    await page.waitForURL('**/penjaga');
    await page.waitForTimeout(600);

    await page.goto('http://localhost:4173/penjaga/perbaikan', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(folderHasil, '06_dasbor_penjaga_manajemen_tiket.png'),
      fullPage: false,
    });

    // 7. Buka Modal Pembaruan Penanganan
    console.log('7. Membuka Modal Pembaruan Penanganan Tiket...');
    const tombolPerbarui = page.locator('button:has-text("Perbarui Penanganan")').first();
    if (await tombolPerbarui.isVisible()) {
      await tombolPerbarui.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(folderHasil, '07_modal_pembaruan_penanganan_teknisi.png'),
        fullPage: false,
      });
    }

    console.log('=== SEMUA TANGKAPAN LAYAR BERHASIL DIAMBIL & DISIMPAN ===');
  } catch (error) {
    console.error('Galat saat mengambil tangkapan layar:', error);
  } finally {
    await browser.close();
  }
}

ambilTangkapanLayar();
