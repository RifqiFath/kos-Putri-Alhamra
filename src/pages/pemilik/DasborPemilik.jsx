import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign,
  Bed,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Wallet,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ambilRingkasanLabaRugi } from '../../services/keuanganService';
import formatMataUang from '../../utils/formatMataUang';
import SkeletonLoader from '../../components/feedback/SkeletonLoader';

export const DasborPemilik = () => {
  const { pengguna } = useAuth();
  const [ringkasan, setRingkasan] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  useEffect(() => {
    ambilRingkasanLabaRugi()
      .then((data) => setRingkasan(data))
      .catch((err) => console.error('Gagal mengambil ringkasan:', err))
      .finally(() => setSedangMemuat(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Fathin Ahmad Zidan & Anggita Natarina --> */}
      {/* Header Dasbor */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Dasbor Pemilik Kos (Owner)</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang, {pengguna?.nama_lengkap || 'Pak Yusuf'}. Pantau operasional, arus kas sewa, dan pengeluaran kos secara terpadu.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua">
          <Bed className="w-4 h-4 text-terakota" />
          <span>Hunian: 19 / 20 Kamar Terisi (95%)</span>
        </div>
      </div>

      {/* Banner Peringatan Verifikasi Pembayaran Tertunda */}
      {ringkasan && ringkasan.kamar_menunggu > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-blue-950">
                Ada {ringkasan.kamar_menunggu} Pembayaran Sewa Menunggu Verifikasi
              </h3>
              <p className="text-xs text-blue-900/80 mt-0.5">
                Mahasiswi telah mengunggah struk transfer. Tinjau bukti bayar untuk mencatatnya ke kas masuk.
              </p>
            </div>
          </div>
          <Link
            to="/pemilik/verifikasi"
            className="tombol-marun py-2 px-4 text-xs font-bold gap-1.5 shrink-0"
          >
            <span>Verifikasi Sekarang</span>
            <CheckCircle className="w-3.5 h-3.5 text-kuning-mas" />
          </Link>
        </div>
      )}

      {/* Metrik Utama Bento Keuangan */}
      {sedangMemuat ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
        </div>
      ) : ringkasan ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pemasukan */}
          <div className="kartu-bento p-5 space-y-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Pemasukan Bulan Ini
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-800">
              {formatMataUang(ringkasan.total_pemasukan)}
            </p>
            <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <span>{ringkasan.kamar_lunas} sewa kamar lunas ({ringkasan.persentase_pelunasan}%)</span>
            </p>
          </div>

          {/* Pengeluaran */}
          <div className="kartu-bento p-5 space-y-2 border-rose-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Pengeluaran Operasional
              </span>
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-rose-800">
              {formatMataUang(ringkasan.total_pengeluaran)}
            </p>
            <p className="text-xs text-cokelat-tua/70">Utilitas, staf & perbaikan</p>
          </div>

          {/* Saldo Bersih */}
          <div className="kartu-bento p-5 space-y-2 border-marun/20 bg-gradient-to-br from-permukaan to-kuning-mas/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-marun">
                Saldo Kas Bersih
              </span>
              <div className="w-7 h-7 rounded-lg bg-marun text-kuning-mas flex items-center justify-center font-bold">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <p
              className={`text-2xl font-extrabold ${
                ringkasan.saldo_bersih >= 0 ? 'text-marun' : 'text-rose-700'
              }`}
            >
              {formatMataUang(ringkasan.saldo_bersih)}
            </p>
            <p className="text-xs text-cokelat-tua/70">Arus kas bersih berjalan</p>
          </div>

          {/* Kamar Menunggak */}
          <div className="kartu-bento p-5 space-y-2 border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Tunggakan Sewa
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-amber-700">
              {ringkasan.kamar_menunggak} Kamar
            </p>
            <p className="text-xs text-cokelat-tua/70">
              {formatMataUang(ringkasan.nominal_menunggak)} tertahan
            </p>
          </div>
        </div>
      ) : null}

      {/* Pintasan Modul Manajemen */}
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
            Periksa struk transfer bank dari mahasiswi, setujui pelunasan, atau tolak dengan alasan.
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
            Catat pengeluaran listrik, token, gaji penjaga kos, dan pemeliharaan fasilitas.
          </p>
          <span className="inline-block text-xs font-semibold text-terakota pt-2">
            Buka Ledger Kas &rarr;
          </span>
        </Link>

        <Link
          to="/pemilik/prediksi-churn"
          className="kartu-bento p-6 space-y-2 hover:border-marun transition-all group"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-marun text-base">Prediksi Retensi AI</h2>
            <TrendingUp className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xs text-cokelat-tua/70">
            Pantau probabilitas perpanjangan sewa mahasiswi dan mitigasi risiko kamar kosong.
          </p>
          <span className="inline-block text-xs font-semibold text-terakota pt-2">
            Lihat Model AI &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DasborPemilik;
