import React from 'react';
import { Wrench, UploadCloud } from 'lucide-react';

export const FormLaporKerusakan = () => {
  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy --> */}
      <div className="pb-4 border-b border-garis">
        <h1 className="text-2xl font-bold text-marun">Formulir Pelaporan Kerusakan Fasilitas</h1>
        <p className="text-sm text-cokelat-tua/75 mt-0.5">
          Laporkan kendala fasilitas di kamar atau area bersama untuk segera ditangani oleh penjaga kos.
        </p>
      </div>

      <div className="kartu-bento p-6 sm:p-8 space-y-6 max-w-2xl">
        <div className="p-4 rounded-xl bg-latar border border-garis flex items-center gap-3">
          <Wrench className="w-5 h-5 text-terakota shrink-0" />
          <p className="text-xs text-cokelat-tua/80">
            <strong>Catatan:</strong> Kerusakan darurat (pipa pecah, korsleting listrik) silakan langsung hubungi penjaga kos atau WhatsApp pengelola.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
              Lokasi & Nomor Kamar
            </label>
            <input
              type="text"
              readOnly
              defaultValue="Kamar A-05"
              className="w-full px-4 py-2.5 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
              Kategori Fasilitas
            </label>
            <select
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua"
            >
              <option>Pilih Kategori (Plumbing / Listrik / Furnitur / Kebersihan)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
              Deskripsi Kerusakan
            </label>
            <textarea
              rows={4}
              disabled
              placeholder="Ceritakan detail kerusakan yang kamu alami..."
              className="w-full px-4 py-2.5 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
              Foto Bukti Kerusakan (Kondisi Awal / Before)
            </label>
            <div className="border-2 border-dashed border-garis rounded-xl p-6 text-center bg-latar/40">
              <UploadCloud className="w-8 h-8 text-terakota mx-auto mb-2" />
              <p className="text-xs font-medium text-cokelat-tua">Format berkas: JPG, PNG maksimal 5 MB</p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled
              className="w-full py-3 rounded-xl bg-gray-300 text-gray-600 font-semibold text-sm cursor-not-allowed"
            >
              Kirim Laporan (Dalam Pengembangan Tahap Modul Perbaikan)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLaporKerusakan;
