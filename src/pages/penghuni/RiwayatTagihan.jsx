import React from 'react';
import { CreditCard, UploadCloud, CheckCircle2 } from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';

export const RiwayatTagihan = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Anggita Natarina --> */}
      <div className="pb-4 border-b border-garis">
        <h1 className="text-2xl font-bold text-marun">Tagihan & Riwayat Pembayaran Sewa</h1>
        <p className="text-sm text-cokelat-tua/75 mt-0.5">
          Unggah bukti transfer dan pantau status verifikasi kuitansi sewa bulanan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="kartu-bento p-6 lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-terakota">
            Tagihan Bulan Berjalan (Periode Aktif)
          </h2>
          <div className="p-4 rounded-xl bg-latar border border-garis flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <p className="font-bold text-lg text-marun">Sewa Kamar A-05 (Tipe Sendiri)</p>
              <p className="text-xs text-cokelat-tua/70">Jatuh Tempo: 1 Bulan Berjalan</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-marun">{formatMataUang(700000)}</span>
              <span className="block text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full w-fit ml-auto mt-1">
                Menunggu Pembayaran
              </span>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-2">
              Unggah Bukti Transfer Bank / QRIS
            </h3>
            <div className="border-2 border-dashed border-garis rounded-xl p-8 text-center bg-latar/40">
              <UploadCloud className="w-8 h-8 text-terakota mx-auto mb-2" />
              <p className="text-xs font-medium text-cokelat-tua">Unggah tangkapan layar struk transfer (JPG, PNG)</p>
            </div>
          </div>
        </div>

        <div className="kartu-bento p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-terakota">
            Informasi Rekening Kos
          </h2>
          <div className="p-4 rounded-xl bg-latar border border-garis space-y-2 text-xs">
            <p className="font-semibold text-cokelat-tua">Bank Pengelola: Bank Riau Kepri Syariah / BCA</p>
            <p className="font-mono text-sm font-bold text-marun">123-456-7890</p>
            <p className="text-cokelat-tua/70">Atas Nama: Bapak Yusuf</p>
          </div>
          <p className="text-xs text-cokelat-tua/70 leading-relaxed">
            Setelah transfer, unggah bukti pembayaran agar pemilik dapat memverifikasi kuitansi pelunasan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiwayatTagihan;
