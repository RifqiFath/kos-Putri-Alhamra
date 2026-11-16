import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Wrench, CreditCard, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import formatMataUang from '../../utils/formatMataUang';

export const DasborPenghuni = () => {
  const { pengguna } = useAuth();

  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Fathin Ahmad Zidan & Tim --> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Halo, {pengguna?.nama_lengkap || 'Penghuni'}!</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang di portal penghuni Kos Putri Alhamra.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua">
          <Home className="w-4 h-4 text-terakota" />
          <span>Kamar: {pengguna?.nomor_kamar || 'Kamar A-05'}</span>
        </div>
      </div>

      {/* Kartu Status Utama (Soft Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Tagihan Bulan Ini</span>
            <CreditCard className="w-5 h-5 text-marun" />
          </div>
          <div>
            <p className="text-2xl font-bold text-marun">{formatMataUang(700000)}</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">Jatuh tempo setiap tanggal 1</p>
          </div>
          <Link
            to="/penghuni/tagihan"
            className="inline-flex text-xs font-semibold text-terakota hover:text-marun underline"
          >
            Lihat & Konfirmasi Pembayaran &rarr;
          </Link>
        </div>

        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Status Tiket Kerusakan</span>
            <Wrench className="w-5 h-5 text-terakota" />
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-700">0 Laporan Aktif</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">Fasilitas kamar dalam kondisi prima</p>
          </div>
          <Link
            to="/penghuni/lapor-kerusakan"
            className="inline-flex text-xs font-semibold text-terakota hover:text-marun underline"
          >
            Laporkan Kendala Fasilitas &rarr;
          </Link>
        </div>

        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Aturan Jam Malam</span>
            <Clock className="w-5 h-5 text-kuning-mas" />
          </div>
          <div>
            <p className="text-base font-bold text-cokelat-tua">22.00 WIB (Biasa) / 22.30 (Sabtu)</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">Pagar dikunci tepat waktu demi keamanan bersama</p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4" /> CCTV & Penjaga Aktif 24 Jam
          </span>
        </div>
      </div>

      {/* Area Shell Placeholder */}
      <div className="kartu-bento p-6 text-center space-y-3 bg-latar/50">
        <AlertCircle className="w-8 h-8 text-terakota mx-auto" />
        <h3 className="font-bold text-base text-marun">Fitur Interaktif Dalam Pengembangan Tahap Selanjutnya</h3>
        <p className="text-xs text-cokelat-tua/75 max-w-lg mx-auto">
          Riwayat sewa, pencatatan transaksi kuitansi digital, dan bot WhatsApp AI akan diintegrasikan pada modul masing-masing pengembang.
        </p>
      </div>
    </div>
  );
};

export default DasborPenghuni;
