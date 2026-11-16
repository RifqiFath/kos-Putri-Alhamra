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
  Users,
  User,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ambilRingkasanLabaRugi } from '../../services/keuanganService';
import formatMataUang from '../../utils/formatMataUang';
import SkeletonLoader from '../../components/feedback/SkeletonLoader';

export const DasborPemilik = () => {
  const { pengguna } = useAuth();
  const [ringkasan, setRingkasan] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Data 20 Kamar Kos Putri Alhamra (16 Sendiri, 4 Berdua. 19 Terisi, 1 Tersedia di Kamar 08)
  const daftarKamar = [
    { nomor: '01', tipe: 'Sendiri', status: 'terisi', penghuni: 'Nadia S.' },
    { nomor: '02', tipe: 'Sendiri', status: 'terisi', penghuni: 'Siti Rahma' },
    { nomor: '03', tipe: 'Sendiri', status: 'terisi', penghuni: 'Aulia Putri' },
    { nomor: '04', tipe: 'Sendiri', status: 'terisi', penghuni: 'Dinda Ayu' },
    { nomor: '05', tipe: 'Sendiri', status: 'terisi', penghuni: 'Rina Marlina' },
    { nomor: '06', tipe: 'Sendiri', status: 'terisi', penghuni: 'Fitriani' },
    { nomor: '07', tipe: 'Sendiri', status: 'terisi', penghuni: 'Annisa T.' },
    { nomor: '08', tipe: 'Sendiri', status: 'tersedia', penghuni: null }, // 1 Kamar Kosong
    { nomor: '09', tipe: 'Sendiri', status: 'terisi', penghuni: 'Dewi Lestari' },
    { nomor: '10', tipe: 'Sendiri', status: 'terisi', penghuni: 'Megawati' },
    { nomor: '11', tipe: 'Sendiri', status: 'terisi', penghuni: 'Tiara K.' },
    { nomor: '12', tipe: 'Sendiri', status: 'terisi', penghuni: 'Salsabila' },
    { nomor: '13', tipe: 'Sendiri', status: 'terisi', penghuni: 'Nurul H.' },
    { nomor: '14', tipe: 'Sendiri', status: 'terisi', penghuni: 'Zahra A.' },
    { nomor: '15', tipe: 'Sendiri', status: 'terisi', penghuni: 'Fatimah' },
    { nomor: '16', tipe: 'Sendiri', status: 'terisi', penghuni: 'Putri W.' },
    { nomor: '17', tipe: 'Berdua', status: 'terisi', penghuni: 'Maya & Laras' },
    { nomor: '18', tipe: 'Berdua', status: 'terisi', penghuni: 'Hana & Gita' },
    { nomor: '19', tipe: 'Berdua', status: 'terisi', penghuni: 'Bella & Rizka' },
    { nomor: '20', tipe: 'Berdua', status: 'terisi', penghuni: 'Intan & Sarah' },
  ];

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-marun">Dasbor Pemilik Kos (Owner)</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-marun text-kuning-mas border border-kuning-mas/30">
              Hak Akses Penuh
            </span>
          </div>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang, {pengguna?.nama_lengkap || 'Pak Yusuf'}. Pantau operasional, arus kas sewa, dan okupansi 20 kamar secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-bold text-cokelat-tua shadow-sm">
            <Bed className="w-4 h-4 text-terakota" />
            <span>Okupansi: 19 / 20 Kamar Terisi (95%)</span>
          </div>
        </div>
      </div>

      {/* Banner Peringatan Verifikasi Pembayaran Tertunda */}
      {ringkasan && ringkasan.kamar_menunggu > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-blue-950">
                Ada {ringkasan.kamar_menunggu} Pembayaran Sewa Menunggu Verifikasi
              </h3>
              <p className="text-xs text-blue-900/80 mt-0.5">
                Mahasiswi telah mengunggah struk transfer. Tinjau bukti bayar untuk mencatatnya otomatis ke kas masuk.
              </p>
            </div>
          </div>
          <Link
            to="/pemilik/verifikasi"
            className="tombol-marun py-2 px-4 text-xs font-bold gap-1.5 shrink-0 shadow-sm"
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

      {/* Visualisasi Denah Okupansi 20 Kamar (Soft Bento Grid) */}
      <section aria-labelledby="judul-okupansi-kamar" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-marun" />
              <h2 id="judul-okupansi-kamar" className="text-lg font-bold text-marun">
                Denah Okupansi 20 Kamar Kos Putri Alhamra
              </h2>
            </div>
            <p className="text-xs text-cokelat-tua/70 mt-0.5">
              16 Kamar Tipe Sendiri (Rp700rb) & 4 Kamar Tipe Berdua (Rp900rb)
            </p>
          </div>
          {/* Legenda Warna */}
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-cokelat-tua font-medium">Terisi (19)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-kuning-mas ring-2 ring-kuning-mas/40 animate-pulse"></span>
              <span className="text-cokelat-tua font-bold text-terakota">Tersedia (1)</span>
            </div>
          </div>
        </div>

        {/* Bento Grid 20 Kamar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {daftarKamar.map((kamar) => {
            const apakahTerisi = kamar.status === 'terisi';
            return (
              <div
                key={kamar.nomor}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  apakahTerisi
                    ? 'bg-white border-emerald-200/80 hover:border-emerald-400 shadow-sm'
                    : 'bg-kuning-mas/20 border-kuning-mas border-2 hover:bg-kuning-mas/30 shadow-md ring-2 ring-kuning-mas/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-marun">
                    Kamar {kamar.nomor}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      kamar.tipe === 'Sendiri'
                        ? 'bg-latar text-cokelat-tua border border-garis'
                        : 'bg-terakota/15 text-terakota border border-terakota/30'
                    }`}
                  >
                    {kamar.tipe}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-garis/60 flex items-center justify-between text-xs">
                  {apakahTerisi ? (
                    <div className="flex items-center gap-1 text-[11px] text-cokelat-tua/80 truncate">
                      <User className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{kamar.penghuni}</span>
                    </div>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-marun text-kuning-mas">
                      Siap Huni
                    </span>
                  )}
                  <span
                    className={`w-2 h-2 rounded-full ${
                      apakahTerisi ? 'bg-emerald-500' : 'bg-kuning-mas animate-ping'
                    }`}
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
          <p className="text-xs text-cokelat-tua/70 leading-relaxed">
            Periksa struk transfer bank dari mahasiswi, setujui pelunasan otomatis, atau tolak dengan alasan.
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
          <p className="text-xs text-cokelat-tua/70 leading-relaxed">
            Catat pengeluaran listrik, token, gaji penjaga kos, dan pemeliharaan fasilitas harian.
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
          <p className="text-xs text-cokelat-tua/70 leading-relaxed">
            Pantau probabilitas perpanjangan sewa mahasiswi dan mitigasi dini risiko kamar kosong.
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
