import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  User,
  Camera,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  FileText,
  DollarSign,
  Maximize2,
  X,
} from 'lucide-react';
import { LencanaStatus, LencanaUrgensi, LencanaKategori } from './LencanaStatusKerusakan';
import formatTanggal from '../../utils/formatTanggal';
import formatMataUang from '../../utils/formatMataUang';

export const KartuTiketKerusakan = ({
  tiket,
  peranPengguna = 'tenant',
  onAksiPerbarui,
}) => {
  const [modalFoto, setModalFoto] = useState(null); // URL foto yang diperbesar

  if (!tiket) return null;

  return (
    <>
      <div className="kartu-bento p-5 sm:p-6 space-y-4 relative overflow-hidden bg-permukaan border-garis hover:border-marun/40 transition-all">
        {/* Header Baris 1: ID, Lencana Kategori, Urgensi & Status */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-garis">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold text-marun bg-latar px-2.5 py-1 rounded-md border border-garis">
              {tiket.id}
            </span>
            <LencanaKategori kategori={tiket.kategori_ai} />
            <LencanaUrgensi urgensi={tiket.tingkat_urgensi} skor={tiket.skor_urgensi} />
          </div>
          <LencanaStatus status={tiket.status} />
        </div>

        {/* Konten Masalah */}
        <div className="space-y-1.5">
          <h3 className="text-base sm:text-lg font-bold text-marun leading-snug">
            {tiket.judul_masalah}
          </h3>
          <p className="text-xs sm:text-sm text-cokelat-tua/80 leading-relaxed line-clamp-3">
            {tiket.deskripsi}
          </p>
        </div>

        {/* Hasil Analisis AI Box */}
        {tiket.alasan_ai && (
          <div className="p-3 rounded-xl bg-latar/80 border border-garis flex items-start gap-2.5 text-xs text-cokelat-tua/80">
            <Sparkles className="w-4 h-4 text-terakota shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-marun">Rekomendasi AI: </span>
              <span>{tiket.alasan_ai}</span>
            </div>
          </div>
        )}

        {/* Galeri Sebelum & Sesudah (Before-After) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Foto Sebelum */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-terakota flex items-center gap-1">
              <Camera className="w-3 h-3" /> Foto Kondisi Awal
            </span>
            {tiket.foto_sebelum_url ? (
              <div
                onClick={() => setModalFoto(tiket.foto_sebelum_url)}
                className="relative aspect-video rounded-xl overflow-hidden border border-garis group cursor-pointer bg-gray-100"
              >
                <img
                  src={tiket.foto_sebelum_url}
                  alt={`Kondisi awal ${tiket.judul_masalah}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-latar border border-dashed border-garis flex items-center justify-center text-[11px] text-cokelat-tua/50">
                Tidak ada foto
              </div>
            )}
          </div>

          {/* Foto Sesudah */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Hasil Perbaikan (After)
            </span>
            {tiket.foto_sesudah_url ? (
              <div
                onClick={() => setModalFoto(tiket.foto_sesudah_url)}
                className="relative aspect-video rounded-xl overflow-hidden border border-emerald-200 group cursor-pointer bg-emerald-50"
              >
                <img
                  src={tiket.foto_sesudah_url}
                  alt={`Hasil perbaikan ${tiket.judul_masalah}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold gap-1">
                  <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-xl bg-latar border border-dashed border-garis flex flex-col items-center justify-center text-[11px] text-cokelat-tua/50 p-2 text-center">
                <span>{tiket.status === 'selesai' ? 'Tanpa foto sesudah' : 'Menunggu pengerjaan'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Catatan Teknisi (Jika sudah ada) */}
        {tiket.catatan_teknisi && (
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-1">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-700" /> Catatan Pengerjaan Teknisi:
            </span>
            <p className="text-xs text-blue-950/80 leading-relaxed">
              {tiket.catatan_teknisi}
            </p>
            {tiket.biaya_realisasi > 0 && (
              <p className="text-xs font-semibold text-blue-900 pt-1 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" />
                Biaya Realisasi: {formatMataUang(tiket.biaya_realisasi)}
              </p>
            )}
          </div>
        )}

        {/* Baris Bawah: Meta info pelapor, lokasi, & tanggal */}
        <div className="pt-3 border-t border-garis flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cokelat-tua/70">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 font-medium text-cokelat-tua">
              <User className="w-3.5 h-3.5 text-terakota" /> {tiket.nama_pelapor} ({tiket.nomor_kamar})
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-terakota" /> {tiket.lokasi_fasilitas}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-terakota" /> {formatTanggal(tiket.created_at)}
            </span>
          </div>

          {/* Tombol Aksi untuk Penjaga (Staff) / Pemilik (Owner) */}
          {(peranPengguna === 'staff' || peranPengguna === 'owner') && onAksiPerbarui && (
            <button
              type="button"
              onClick={() => onAksiPerbarui(tiket)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-marun hover:bg-marun/90 text-permukaan font-semibold text-xs shadow-sm transition-all shrink-0"
            >
              <span>Perbarui Penanganan</span>
              <ChevronRight className="w-3.5 h-3.5 text-kuning-mas" />
            </button>
          )}
        </div>
      </div>

      {/* Modal Zoom Foto */}
      {modalFoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalFoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-permukaan rounded-2xl p-2 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalFoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={modalFoto}
              alt="Dokumentasi Fasilitas"
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default KartuTiketKerusakan;
