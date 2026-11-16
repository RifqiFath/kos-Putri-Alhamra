import React from 'react';
import { DollarSign, PlusCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import formatMataUang from '../../utils/formatMataUang';

export const ManajemenKeuangan = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Anggita Natarina --> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Manajemen Keuangan & Arus Kas</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Pencatatan mutasi kas masuk sewa kamar dan kas keluar operasional Kos Putri Alhamra.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-300 text-gray-600 text-xs font-semibold cursor-not-allowed"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Catat Kas Keluar</span>
        </button>
      </div>

      <div className="kartu-bento p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-terakota">
          Ringkasan Mutasi Kas Terakhir
        </h2>
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-latar border border-garis flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-cokelat-tua">Sewa Kamar B-02 (Tipe Berdua)</p>
                <p className="text-xs text-cokelat-tua/70">Pembayaran Sewa Bulanan • Bank Transfer</p>
              </div>
            </div>
            <span className="font-bold text-emerald-700">+{formatMataUang(900000)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-latar border border-garis flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ArrowDownRight className="w-4 h-4" />
              </div>
              <div>
                <p className="font-semibold text-cokelat-tua">Servis Pipa & Penggantian Kran</p>
                <p className="text-xs text-cokelat-tua/70">Biaya Perbaikan Fasilitas</p>
              </div>
            </div>
            <span className="font-bold text-rose-700">-{formatMataUang(150000)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenKeuangan;
