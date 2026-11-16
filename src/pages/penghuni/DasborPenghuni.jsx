import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  Wrench,
  CreditCard,
  ShieldCheck,
  Clock,
  PlusCircle,
  FileCheck,
  Sparkles,
  Wifi,
  Droplet,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import formatMataUang from '../../utils/formatMataUang';
import DaftarTiketKerusakan from '../../components/cards/DaftarTiketKerusakan';
import { ambilDaftarTagihan } from '../../services/keuanganService';
import {
  LencanaStatusTagihan,
  LencanaPengingatJatuhTempo,
} from '../../components/cards/LencanaStatusTagihan';

export const DasborPenghuni = () => {
  const { pengguna } = useAuth();
  const [tagihanAktif, setTagihanAktif] = useState(null);

  useEffect(() => {
    const tenantId = pengguna?.id || 'usr-tenant-003';
    ambilDaftarTagihan({ tenant_id: tenantId }).then((data) => {
      if (data && data.length > 0) {
        setTagihanAktif(data[0]);
      }
    });
  }, [pengguna]);

  const nomorKamar = pengguna?.nomor_kamar || 'Kamar A-05';
  const tipeKamar = pengguna?.tipe_kamar || 'Tipe Sendiri (Single)';

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Fathin Ahmad Zidan & Anggita Natarina --> */}
      {/* Header Sambutan & Profil Kamar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-marun">
              Halo, {pengguna?.nama_lengkap || 'Penghuni'}!
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Penghuni Aktif
            </span>
          </div>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang di portal hunian Kos Putri Alhamra Pekanbaru.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua shadow-sm">
            <Home className="w-4 h-4 text-terakota" />
            <span>{nomorKamar} • {tipeKamar}</span>
          </div>
          <Link
            to="/penghuni/lapor-kerusakan"
            className="tombol-marun py-2 px-4 text-xs gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-kuning-mas" />
            <span>Lapor Kerusakan</span>
          </Link>
        </div>
      </div>

      {/* Baris Status Kamar & Fasilitas Aktif (Bento Spotlight) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-white via-latar to-kuning-mas/10 border border-garis shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terakota" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-terakota">
                Informasi Unit Hunian Kamu
              </h2>
            </div>
            <p className="text-lg font-extrabold text-marun">
              {nomorKamar} &mdash; {tipeKamar}
            </p>
            <p className="text-xs text-cokelat-tua/75">
              Lantai 1 • Kamar Mandi Dalam • Full Furnished (Kasur, Lemari, Meja Belajar)
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-garis text-xs text-cokelat-tua shadow-sm">
              <Droplet className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium">Air: Termasuk</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-garis text-xs text-cokelat-tua shadow-sm">
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium">Free WiFi Cepat</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-garis text-xs text-cokelat-tua shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-medium">Listrik: Token Mandiri</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Status Ringkasan (Soft Bento 3 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kartu Tagihan Dinamis */}
        <div className="kartu-bento p-5 space-y-3 border-marun/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">
              Status Tagihan Sewa
            </span>
            <CreditCard className="w-5 h-5 text-marun" />
          </div>
          <div>
            <p className="text-2xl font-bold text-marun">
              {formatMataUang(tagihanAktif?.nominal || 700000)}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <LencanaStatusTagihan status={tagihanAktif?.status || 'belum_bayar'} />
              {tagihanAktif?.pengingat && (
                <LencanaPengingatJatuhTempo pengingat={tagihanAktif.pengingat} />
              )}
            </div>
          </div>
          <div className="pt-2 border-t border-garis flex items-center justify-between">
            <Link
              to="/penghuni/tagihan"
              className="inline-flex items-center gap-1 text-xs font-bold text-terakota hover:text-marun transition-colors"
            >
              {tagihanAktif?.status === 'lunas' ? (
                <>
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Lihat Kuitansi Digital &rarr;</span>
                </>
              ) : (
                <span>Konfirmasi Pembayaran Sewa &rarr;</span>
              )}
            </Link>
          </div>
        </div>

        {/* Layanan Fasilitas & Tiket */}
        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">
              Layanan Fasilitas
            </span>
            <Wrench className="w-5 h-5 text-terakota" />
          </div>
          <div>
            <p className="text-sm font-bold text-cokelat-tua">Butuh bantuan perbaikan?</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">
              Lapor online dengan klasifikasi prioritas AI otomatis dan pantau pengerjaan penjaga.
            </p>
          </div>
          <div className="pt-2 border-t border-garis">
            <Link
              to="/penghuni/lapor-kerusakan"
              className="inline-flex text-xs font-semibold text-terakota hover:text-marun underline"
            >
              Buat Tiket Laporan Baru &rarr;
            </Link>
          </div>
        </div>

        {/* Jam Malam & Keamanan */}
        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">
              Aturan Jam Malam
            </span>
            <Clock className="w-5 h-5 text-kuning-mas" />
          </div>
          <div>
            <p className="text-base font-bold text-cokelat-tua">22.00 WIB (Biasa) / 22.30 (Sabtu)</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">
              Pagar dikunci tepat waktu. Kunci kamar dipegang masing-masing.
            </p>
          </div>
          <div className="pt-2 border-t border-garis">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" /> CCTV & Penjaga Aktif 24 Jam
            </span>
          </div>
        </div>
      </div>

      {/* Modul Pelacakan Progres Laporan Tiket (Real-time Status Tracker) */}
      <section aria-labelledby="judul-status-tiket" className="pt-2">
        <DaftarTiketKerusakan
          peranPengguna="tenant"
          judulBagian="Pemantauan Progres Perbaikan Fasilitas"
        />
      </section>
    </div>
  );
};

export default DasborPenghuni;
