import React from 'react';
import { TrendingUp, Sparkles, AlertCircle, BarChart3 } from 'lucide-react';

export const AnalitikPrediksiChurn = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Afdhal Fidi Ansori & Muhammad Rifqi Fathurrahman --> */}
      <div className="pb-4 border-b border-garis">
        <h1 className="text-2xl font-bold text-marun">Prediksi Retensi Penghuni (AI Churn Risk)</h1>
        <p className="text-sm text-cokelat-tua/75 mt-0.5">
          Model pembelajaran mesin untuk memprediksi probabilitas penghuni memperpanjang sewa berdasarkan komplain dan ketepatan bayar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="kartu-bento p-6 space-y-4">
          <div className="flex items-center gap-2 text-terakota">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-bold text-sm uppercase tracking-wider text-cokelat-tua">
              Status Model AI & Prediksi Retensi
            </h2>
          </div>
          <div className="p-4 rounded-xl bg-latar border border-garis space-y-2 text-xs">
            <p className="font-semibold text-cokelat-tua">Layanan AI FastAPI Sidecar:</p>
            <p className="text-emerald-700 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Model Siap Terhubung (Tahap 5 & 9)
            </p>
            <p className="text-cokelat-tua/70 leading-relaxed">
              Analisis faktor risiko mencakup kecepatan penanganan komplain kerusakan fasilitas dan riwayat keterlambatan pembayaran sewa bulanan.
            </p>
          </div>
        </div>

        <div className="kartu-bento p-6 space-y-4 flex flex-col justify-center items-center text-center bg-latar/40">
          <BarChart3 className="w-12 h-12 text-terakota" />
          <h3 className="font-bold text-sm text-cokelat-tua">Visualisasi Grafik Retensi Sewa</h3>
          <p className="text-xs text-cokelat-tua/70 max-w-xs">
            Komponen visualisasi grafik tren okupansi akan ditambahkan oleh tim Data Science & AI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalitikPrediksiChurn;
