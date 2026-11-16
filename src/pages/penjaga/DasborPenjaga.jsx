import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertOctagon,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ambilSemuaTiket } from '../../services/kerusakanService';
import DaftarTiketKerusakan from '../../components/cards/DaftarTiketKerusakan';

export const DasborPenjaga = () => {
  const { pengguna } = useAuth();
  const [semuaTiket, setSemuaTiket] = useState([]);

  useEffect(() => {
    ambilSemuaTiket().then((data) => setSemuaTiket(data));
  }, []);

  const totalMenunggu = semuaTiket.filter((t) => t.status === 'menunggu').length;
  const totalDiproses = semuaTiket.filter((t) => t.status === 'diproses').length;
  const totalSelesai = semuaTiket.filter((t) => t.status === 'selesai').length;
  const totalUrgensiTinggi = semuaTiket.filter(
    (t) => t.tingkat_urgensi === 'tinggi' && t.status !== 'selesai'
  ).length;

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy & Tim --> */}
      {/* Header Dasbor */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Dasbor Penjaga Kos</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat bertugas, {pengguna?.nama_lengkap || 'Pak Joko'}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Fasilitas Terpantau</span>
          </div>
          <Link
            to="/penghuni/lapor-kerusakan"
            className="tombol-marun py-2 px-4 text-xs gap-1.5 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-kuning-mas" />
            <span>Catat Kerusakan Baru</span>
          </Link>
        </div>
      </div>

      {/* Ringkasan Metrik Dinamis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="kartu-bento p-5 space-y-2 border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Tiket Menunggu</span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-marun">{totalMenunggu}</p>
          <p className="text-xs text-cokelat-tua/70">Perlu estimasi & pengecekan awal</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">Sedang Diproses</span>
            <Wrench className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-blue-700">{totalDiproses}</p>
          <p className="text-xs text-cokelat-tua/70">Dalam penanganan teknisi</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Selesai Dikerjakan</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700">{totalSelesai}</p>
          <p className="text-xs text-cokelat-tua/70">Telah terdokumentasi foto after</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-rose-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Prioritas Kritis</span>
            <AlertOctagon className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-rose-700">{totalUrgensiTinggi}</p>
          <p className="text-xs text-cokelat-tua/70">Urgensi tinggi perlu tindakan cepat</p>
        </div>
      </div>

      {/* Komponen Daftar Tiket & Aksi Penjaga */}
      <DaftarTiketKerusakan
        peranPengguna="staff"
        judulBagian="Daftar Antrean Tiket Perbaikan"
      />
    </div>
  );
};

export default DasborPenjaga;
