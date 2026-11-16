import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderHasil = path.resolve(__dirname, '../../docs/tangkapan_layar/tahap_04');

async function ambilTangkapanLayarTahap04() {
  console.log('Menjalankan peramban Edge untuk mengambil tangkapan layar Tahap 4...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    // 1. Landing Page Anti-Slop dengan Tombol WhatsApp Mengambang
    console.log('1. Mengambil screenshot Landing Page Anti-Slop...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '01_landing_page_anti_slop.png'),
      fullPage: false,
    });

    // 2. Dasbor Penghuni yang dipoles
    console.log('2. Login Penghuni & Mengambil screenshot Dasbor Penghuni yang dipoles...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Penghuni (Tenant)")');
    await page.waitForURL('**/penghuni');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '02_dasbor_penghuni_dipoles.png'),
      fullPage: false,
    });

    // 3. Dasbor Penjaga dengan Log Kontrol Kebersihan
    console.log('3. Login Penjaga & Mengambil screenshot Dasbor Penjaga dengan Log Kontrol...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Penjaga (Staff)")');
    await page.waitForURL('**/penjaga');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '03_dasbor_penjaga_log_kebersihan.png'),
      fullPage: false,
    });

    // 4. Dasbor Pemilik dengan Denah Okupansi 20 Kamar
    console.log('4. Login Pemilik & Mengambil screenshot Dasbor Pemilik (Denah 20 Kamar)...');
    await page.goto('http://localhost:4173/login', { waitUntil: 'networkidle' });
    await page.click('button:has-text("Pemilik (Owner)")');
    await page.waitForURL('**/pemilik');
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(folderHasil, '04_dasbor_pemilik_denah_okupansi_20kamar.png'),
      fullPage: false,
    });

    console.log('=== Seluruh Tangkapan Layar Tahap 4 Berhasil Disimpan di docs/tangkapan_layar/tahap_04/ ===');
  } catch (err) {
    console.error('Terjadi kesalahan saat mengambil tangkapan layar:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

ambilTangkapanLayarTahap04();
