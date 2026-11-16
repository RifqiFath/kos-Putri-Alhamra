import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Bed, AlertTriangle, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import formatMataUang from '../../utils/formatMataUang';

export const DasborPemilik = () => {
  const { pengguna } = useAuth();

  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Fathin Ahmad Zidan & Tim --> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Dasbor Pemilik Kos (Owner)</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang, {pengguna?.nama_lengkap || 'Pak Yusuf'}. Berikut ringkasan operasional dan keuangan Kos Putri Alhamra.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua">
          <Bed className="w-4 h-4 text-terakota" />
          <span>Hunian: 19 / 20 Kamar Terisi (95%)</span>
        </div>
      </div>

      {/* Metrik Utama Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Pemasukan Bulan Ini</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-marun">{formatMataUang(13300000)}</p>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> 19 dari 20 penyewa aktif
          </p>
        </div>

        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Tunggakan Sewa</span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-700">{formatMataUang(700000)}</p>
          <p className="text-xs text-cokelat-tua/70">1 tagihan menunggu verifikasi</p>
        </div>

        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Pengeluaran Servis</span>
            <DollarSign className="w-5 h-5 text-terakota" />
          </div>
          <p className="text-2xl font-bold text-cokelat-tua">{formatMataUang(350000)}</p>
          <p className="text-xs text-cokelat-tua/70">Perbaikan kran & lampu</p>
        </div>

        <div className="kartu-bento p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Retensi Sewa (AI)</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-700">92% Aman</p>
          <p className="text-xs text-cokelat-tua/70">Prediksi churn rendah</p>
        </div>
      </div>

      {/* Pintasan Aksi Modul */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          to="/pemilik/verifikasi"
          className="kartu-bento p-6 space-y-2 hover:border-marun transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-marun text-base">Verifikasi Pembayaran</h2>
            <CheckCircle className="w-5 h-5 text-kuning-mas group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xs text-cokelat-tua/70">
            Periksa struk transfer bank dari penghuni dan terbitkan kuitansi sewa lunas.
          </p>
          <span className="inline-block text-xs font-semibold text-terakota pt-2">
            Buka Verifikasi &rarr;
          </span>
        </Link>

        <Link
          to="/pemilik/keuangan"
          className="kartu-bento p-6 space-y-2 hover:border-marun transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-marun text-base">Manajemen Arus Kas</h2>
            <DollarSign className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xs text-cokelat-tua/70">
            Catat pengeluaran listrik, token, gaji penjaga, dan perawatan fasilitas kos.
          </p>
          <span className="inline-block text-xs font-semibold text-terakota pt-2">
            Kelola Transaksi &rarr;
          </span>
        </Link>

        <Link
          to="/pemilik/prediksi-churn"
          className="kartu-bento p-6 space-y-2 hover:border-marun transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-marun text-base">Analitik Prediksi Retensi AI</h2>
            <TrendingUp className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xs text-cokelat-tua/70">
            Pantau probabilitas perpanjangan sewa mahasiswi dan mitigasi risiko kamar kosong.
          </p>
          <span className="inline-block text-xs font-semibold text-terakota pt-2">
            Lihat Analitik &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DasborPemilik;
