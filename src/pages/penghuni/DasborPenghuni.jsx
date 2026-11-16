import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Wrench, CreditCard, ShieldCheck, Clock, PlusCircle } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Fathin Ahmad Zidan & Anggita Natarina --> */}
      {/* Header Sambutan */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Halo, {pengguna?.nama_lengkap || 'Penghuni'}!</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat datang di portal penghuni Kos Putri Alhamra.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua">
            <Home className="w-4 h-4 text-terakota" />
            <span>Kamar: {pengguna?.nomor_kamar || 'Kamar A-05'}</span>
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

      {/* Kartu Status Ringkasan (Soft Bento) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kartu Tagihan Dinamis */}
        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Tagihan Sewa Kamar</span>
            <CreditCard className="w-5 h-5 text-marun" />
          </div>
          <div>
            <p className="text-2xl font-bold text-marun">
              {formatMataUang(tagihanAktif?.nominal || 700000)}
            </p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <LencanaStatusTagihan status={tagihanAktif?.status || 'belum_bayar'} />
              {tagihanAktif?.pengingat && (
                <LencanaPengingatJatuhTempo pengingat={tagihanAktif.pengingat} />
              )}
            </div>
          </div>
          <Link
            to="/penghuni/tagihan"
            className="inline-flex text-xs font-semibold text-terakota hover:text-marun underline"
          >
            {tagihanAktif?.status === 'lunas'
              ? 'Lihat Kuitansi Digital →'
              : 'Konfirmasi Pembayaran Sewa →'}
          </Link>
        </div>

        {/* Layanan Fasilitas */}
        <div className="kartu-bento p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-terakota">Layanan Fasilitas</span>
            <Wrench className="w-5 h-5 text-terakota" />
          </div>
          <div>
            <p className="text-sm font-bold text-cokelat-tua">Butuh bantuan perbaikan?</p>
            <p className="text-xs text-cokelat-tua/70 mt-1">Lapor online dengan klasifikasi prioritas AI otomatis.</p>
          </div>
          <Link
            to="/penghuni/lapor-kerusakan"
            className="inline-flex text-xs font-semibold text-terakota hover:text-marun underline"
          >
            Buat Tiket Laporan Baru &rarr;
          </Link>
        </div>

        {/* Jam Malam */}
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
