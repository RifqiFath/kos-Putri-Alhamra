import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertOctagon,
  PlusCircle,
  Sparkles,
  ClipboardCheck,
  Check,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ambilSemuaTiket } from '../../services/kerusakanService';
import DaftarTiketKerusakan from '../../components/cards/DaftarTiketKerusakan';

export const DasborPenjaga = () => {
  const { pengguna } = useAuth();
  const [semuaTiket, setSemuaTiket] = useState([]);

  // Data mock log kontrol kebersihan & fasilitas harian
  const [logKebersihan, setLogKebersihan] = useState([
    {
      id: 'log-1',
      area: 'Dapur Bersama & Tempat Cuci Piring',
      status: 'bersih',
      petugas: 'Pak Joko',
      waktu: '08:30 WIB',
      catatan: 'Area kompor dan wastafel bersih, tempat sampah telah dikosongkan.',
    },
    {
      id: 'log-2',
      area: 'Area Jemuran Lantai 2',
      status: 'bersih',
      petugas: 'Pak Joko',
      waktu: '09:15 WIB',
      catatan: 'Lantai jemuran kering, sirkulasi udara lancar.',
    },
    {
      id: 'log-3',
      area: 'Parkiran Motor Beratap (Kapasitas 10)',
      status: 'perlu_perhatian',
      petugas: 'Pak Joko',
      waktu: '11:00 WIB',
      catatan: 'Motor tersusun rapi. Lampu lorong parkir perlu dicek kembali sore nanti.',
    },
    {
      id: 'log-4',
      area: 'Ruang TV & Akses Pagar Utama',
      status: 'bersih',
      petugas: 'Pak Joko',
      waktu: '13:00 WIB',
      catatan: 'Gembok pagar berfungsi baik. Jam malam siap dikunci pukul 22.00 WIB.',
    },
  ]);

  useEffect(() => {
    ambilSemuaTiket().then((data) => setSemuaTiket(data));
  }, []);

  const totalMenunggu = semuaTiket.filter((t) => t.status === 'menunggu').length;
  const totalDiproses = semuaTiket.filter((t) => t.status === 'diproses').length;
  const totalSelesai = semuaTiket.filter((t) => t.status === 'selesai').length;
  const totalUrgensiTinggi = semuaTiket.filter(
    (t) => t.tingkat_urgensi === 'tinggi' && t.status !== 'selesai'
  ).length;

  const toggleStatusLog = (id) => {
    setLogKebersihan((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'bersih' ? 'perlu_perhatian' : 'bersih',
            }
          : item
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy & Tim --> */}
      {/* Header Dasbor */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-marun">Dasbor Penjaga Kos</h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Petugas Operasional
            </span>
          </div>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Selamat bertugas, {pengguna?.nama_lengkap || 'Pak Joko'}. Pastikan fasilitas prima dan aman.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Fasilitas Terpantau 24 Jam</span>
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

      {/* Ringkasan Metrik Dinamis Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="kartu-bento p-5 space-y-2 border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Tiket Menunggu
            </span>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-marun">{totalMenunggu}</p>
          <p className="text-xs text-cokelat-tua/70">Perlu estimasi & pengecekan awal</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Sedang Diproses
            </span>
            <Wrench className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-blue-700">{totalDiproses}</p>
          <p className="text-xs text-cokelat-tua/70">Dalam penanganan perbaikan</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Selesai Dikerjakan
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-700">{totalSelesai}</p>
          <p className="text-xs text-cokelat-tua/70">Terdokumentasi foto after</p>
        </div>

        <div className="kartu-bento p-5 space-y-2 border-rose-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Prioritas Kritis
            </span>
            <AlertOctagon className="w-5 h-5 text-rose-600" />
          </div>
          <p className="text-3xl font-extrabold text-rose-700">{totalUrgensiTinggi}</p>
          <p className="text-xs text-cokelat-tua/70">Urgensi tinggi tindakan segera</p>
        </div>
      </div>

      {/* Log Kontrol Kebersihan & Fasilitas Bersama Harian (Soft Bento) */}
      <section aria-labelledby="judul-log-kontrol" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-marun" />
            <h2 id="judul-log-kontrol" className="text-lg font-bold text-marun">
              Log Kontrol Kebersihan & Fasilitas Bersama Harian
            </h2>
          </div>
          <span className="text-xs text-cokelat-tua/70 flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-terakota" />
            Hari Ini • Pengecekan Rutin Berkala
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logKebersihan.map((log) => {
            const apakahBersih = log.status === 'bersih';
            return (
              <div
                key={log.id}
                className={`kartu-bento p-4 flex flex-col justify-between border-l-4 transition-all ${
                  apakahBersih ? 'border-l-emerald-500' : 'border-l-amber-500'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-cokelat-tua">{log.area}</h3>
                    <button
                      type="button"
                      onClick={() => toggleStatusLog(log.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 border transition-colors ${
                        apakahBersih
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      {apakahBersih ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Bersih & Siap</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Perlu Ditinjau</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-cokelat-tua/80 leading-relaxed">{log.catatan}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-garis flex items-center justify-between text-[11px] text-cokelat-tua/60">
                  <span>Petugas: {log.petugas}</span>
                  <span className="font-semibold text-terakota">{log.waktu}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Komponen Daftar Tiket & Aksi Penjaga */}
      <DaftarTiketKerusakan
        peranPengguna="staff"
        judulBagian="Daftar Antrean Tiket Perbaikan Fasilitas"
      />
    </div>
  );
};

export default DasborPenjaga;
