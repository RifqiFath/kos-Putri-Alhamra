import React from 'react';
import { Wrench, CheckSquare, Camera } from 'lucide-react';

export const DaftarPerbaikanFasilitas = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy --> */}
      <div className="pb-4 border-b border-garis">
        <h1 className="text-2xl font-bold text-marun">Manajemen Perbaikan & Log Before-After</h1>
        <p className="text-sm text-cokelat-tua/75 mt-0.5">
          Perbarui status tiket pengerjaan dan unggah dokumentasi foto sebelum dan sesudah perbaikan.
        </p>
      </div>

      <div className="kartu-bento p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-garis">
          <Wrench className="w-5 h-5 text-terakota" />
          <h2 className="font-bold text-base text-marun">Tiket #TIK-2026-001 — Kran Wastafel Bocor</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-latar border border-garis space-y-2">
            <p className="font-bold text-cokelat-tua">Foto Sebelum (Before):</p>
            <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              <Camera className="w-6 h-6 mr-1" /> [Dokumentasi Foto Awal]
            </div>
            <p className="text-cokelat-tua/70">Keterangan: Kran terus menetes saat ditutup rapat.</p>
          </div>
          <div className="p-4 rounded-xl bg-latar border border-garis space-y-2">
            <p className="font-bold text-cokelat-tua">Foto Sesudah (After):</p>
            <div className="h-32 border-2 border-dashed border-garis rounded-lg flex items-center justify-center text-gray-500">
              <Camera className="w-6 h-6 mr-1" /> Unggah Foto Perbaikan Selesai
            </div>
            <p className="text-cokelat-tua/70">Catatan Teknisi: Ganti karet seal dan kran 1/2 inch baru.</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            disabled
            className="px-5 py-2.5 rounded-xl bg-gray-300 text-gray-600 font-semibold text-xs cursor-not-allowed"
          >
            Simpan Pembaruan Status (Dalam Pengembangan)
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaftarPerbaikanFasilitas;
