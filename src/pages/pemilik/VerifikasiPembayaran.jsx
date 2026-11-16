import React from 'react';
import { CheckCircle2, XCircle, FileText, ExternalLink } from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';

export const VerifikasiPembayaran = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Anggita Natarina --> */}
      <div className="pb-4 border-b border-garis">
        <h1 className="text-2xl font-bold text-marun">Verifikasi Bukti Transfer Sewa</h1>
        <p className="text-sm text-cokelat-tua/75 mt-0.5">
          Tinjau kiriman struk transfer dari penghuni sebelum mengonfirmasi kuitansi pelunasan.
        </p>
      </div>

      <div className="kartu-bento p-6 space-y-4">
        <div className="p-4 rounded-xl bg-latar border border-garis flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-kuning-mas/30 text-marun flex items-center justify-center font-bold shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-cokelat-tua">Siti Rahma — Kamar A-05 (Tipe Sendiri)</h2>
              <p className="text-xs text-cokelat-tua/70">Nominal: {formatMataUang(700000)} • Bank BCA</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-terakota font-medium mt-1 cursor-pointer hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Lihat Lampiran Bukti Transfer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 text-permukaan text-xs font-semibold opacity-60 cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" /> Setujui
            </button>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-rose-600 text-permukaan text-xs font-semibold opacity-60 cursor-not-allowed"
            >
              <XCircle className="w-4 h-4" /> Tolak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifikasiPembayaran;
