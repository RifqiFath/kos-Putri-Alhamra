import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle2, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DasborPenjaga = () => {
  const { pengguna } = useAuth();

  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy & Tim --> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Dasbor Penjaga Kos</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat bertugas, {pengguna?.nama_lengkap || 'Penjaga Kos'}.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Status Fasilitas: Terkendali</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Tiket Menunggu</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-marun">1</p>
          <p className="text-xs text-cokelat-tua/70">Perlu peninjauan awal & estimasi</p>
        </div>

        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Sedang Diproses</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-700">0</p>
          <p className="text-xs text-cokelat-tua/70">Pekerjaan teknisi lapangan</p>
        </div>

        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Selesai Bulan Ini</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-700">4</p>
          <p className="text-xs text-cokelat-tua/70">Telah diverifikasi pemilik kos</p>
        </div>
      </div>

      <div className="kartu-bento p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-marun">Daftar Laporan Terkini</h2>
          <Link
            to="/penjaga/perbaikan"
            className="text-xs font-semibold text-terakota hover:text-marun underline"
          >
            Buka Modul Perbaikan Lengkap &rarr;
          </Link>
        </div>
        <div className="p-4 rounded-xl bg-latar border border-garis flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-terakota" />
            <div>
              <p className="font-semibold text-cokelat-tua">Kran Wastafel Kamar Mandi A-03 Bocor</p>
              <p className="text-xs text-cokelat-tua/70">Pelapor: Penghuni Kamar A-03 • Kategori: Plumbing</p>
            </div>
          </div>
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-full">
            Menunggu Pengerjaan
          </span>
        </div>
      </div>
    </div>
  );
};

export default DasborPenjaga;
