import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  Clock,
  Search,
  Filter,
  Maximize2,
  X,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
} from 'lucide-react';
import {
  ambilDaftarTagihan,
  verifikasiPembayaran,
} from '../../services/keuanganService';
import {
  LencanaStatusTagihan,
  LencanaPengingatJatuhTempo,
} from '../../components/cards/LencanaStatusTagihan';
import SkeletonLoader from '../../components/feedback/SkeletonLoader';
import { useToast } from '../../context/ToastContext';
import formatMataUang from '../../utils/formatMataUang';
import formatTanggal from '../../utils/formatTanggal';

export const VerifikasiPembayaran = () => {
  const { tampilkanToast } = useToast();

  const [daftarTagihan, setDaftarTagihan] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [tabFilter, setTabFilter] = useState('menunggu_verifikasi'); // 'menunggu_verifikasi' | 'semua' | 'lunas' | 'ditolak'
  const [kataKunci, setKataKunci] = useState('');

  // Modal Pratinjau Bukti Transfer
  const [modalFoto, setModalFoto] = useState(null);

  // Modal Penolakan
  const [tagihanDitolak, setTagihanDitolak] = useState(null);
  const [alasanPenolakan, setAlasanPenolakan] = useState('');
  const [sedangProses, setSedangProses] = useState(false);

  // Muat Data
  const muatData = async () => {
    setSedangMemuat(true);
    try {
      const data = await ambilDaftarTagihan();
      setDaftarTagihan(data);
    } catch (err) {
      console.error('Gagal mengambil data verifikasi:', err);
      tampilkanToast('Gagal memuat data verifikasi pembayaran.', 'galat');
    } finally {
      setSedangMemuat(false);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  // Setujui Pembayaran
  const tanganiSetujui = async (tagihan) => {
    if (
      !window.confirm(
        `Konfirmasi setujui pembayaran sewa ${tagihan.nomor_kamar} (${tagihan.nama_penghuni}) sebesar ${formatMataUang(
          tagihan.nominal
        )}?`
      )
    ) {
      return;
    }

    setSedangProses(true);
    try {
      const hasil = await verifikasiPembayaran(tagihan.id, 'SETUJUI');
      tampilkanToast(
        `Pembayaran ${tagihan.nama_penghuni} berhasil disetujui! Saldo kas masuk bertambah ${formatMataUang(
          tagihan.nominal
        )}.`,
        'sukses',
        5000
      );
      muatData();
    } catch (err) {
      console.error('Galat menyetujui pembayaran:', err);
      tampilkanToast('Gagal memverifikasi: ' + err.message, 'galat');
    } finally {
      setSedangProses(false);
    }
  };

  // Buka Modal Penolakan
  const bukaModalTolak = (tagihan) => {
    setTagihanDitolak(tagihan);
    setAlasanPenolakan(
      'Nominal transfer tidak sesuai dengan tagihan sewa. Mohon periksa kembali struk transfer kamu.'
    );
  };

  // Konfirmasi Tolak Pembayaran
  const konfirmasiTolak = async (e) => {
    e.preventDefault();
    if (!tagihanDitolak) return;

    if (!alasanPenolakan.trim()) {
      tampilkanToast('Mohon berikan alasan penolakan agar penghuni memahami kendalanya.', 'peringatan');
      return;
    }

    setSedangProses(true);
    try {
      await verifikasiPembayaran(tagihanDitolak.id, 'TOLAK', alasanPenolakan);
      tampilkanToast(
        `Pembayaran ${tagihanDitolak.nama_penghuni} telah ditolak dengan catatan alasan.`,
        'info'
      );
      setTagihanDitolak(null);
      setAlasanPenolakan('');
      muatData();
    } catch (err) {
      console.error('Galat menolak pembayaran:', err);
      tampilkanToast('Gagal menolak pembayaran: ' + err.message, 'galat');
    } finally {
      setSedangProses(false);
    }
  };

  // Filter Data
  const tagihanTerfilter = daftarTagihan.filter((t) => {
    if (tabFilter !== 'semua' && t.status.toLowerCase() !== tabFilter.toLowerCase()) {
      return false;
    }

    if (kataKunci.trim()) {
      const k = kataKunci.toLowerCase();
      const cocokNama = t.nama_penghuni.toLowerCase().includes(k);
      const cocokKamar = t.nomor_kamar.toLowerCase().includes(k);
      const cocokId = t.id.toLowerCase().includes(k);
      return cocokNama || cocokKamar || cocokId;
    }

    return true;
  });

  const jumlahMenunggu = daftarTagihan.filter((t) => t.status === 'menunggu_verifikasi').length;
  const jumlahLunas = daftarTagihan.filter((t) => t.status === 'lunas').length;
  const jumlahDitolak = daftarTagihan.filter((t) => t.status === 'ditolak').length;

  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Anggita Natarina (Verifikasi Pembayaran Sewa) --> */}
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Verifikasi Pembayaran Sewa Kamar</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Tinjau bukti transfer yang diunggah mahasiswi, setujui pelunasan kuitansi, atau tolak dengan alasan.
          </p>
        </div>
        <button
          type="button"
          onClick={muatData}
          className="p-2.5 rounded-xl border border-garis bg-permukaan hover:bg-latar text-cokelat-tua self-start sm:self-auto"
          title="Segarkan Data"
          aria-label="Segarkan data verifikasi"
        >
          <RefreshCw className={`w-4 h-4 ${sedangMemuat ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Tab Filter */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-garis">
        <button
          type="button"
          onClick={() => setTabFilter('menunggu_verifikasi')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'menunggu_verifikasi'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-permukaan border border-blue-200 text-blue-900 hover:bg-blue-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Menunggu Verifikasi ({jumlahMenunggu})</span>
        </button>
        <button
          type="button"
          onClick={() => setTabFilter('semua')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'semua'
              ? 'bg-marun text-permukaan shadow-sm'
              : 'bg-permukaan border border-garis text-cokelat-tua/70 hover:bg-latar'
          }`}
        >
          Semua Tagihan ({daftarTagihan.length})
        </button>
        <button
          type="button"
          onClick={() => setTabFilter('lunas')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'lunas'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-permukaan border border-emerald-200 text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Lunas ({jumlahLunas})</span>
        </button>
        <button
          type="button"
          onClick={() => setTabFilter('ditolak')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabFilter === 'ditolak'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-permukaan border border-rose-200 text-rose-900 hover:bg-rose-50'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Ditolak ({jumlahDitolak})</span>
        </button>
      </div>

      {/* Input Pencarian */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari nama penghuni, nomor kamar, atau ID tagihan..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-garis bg-permukaan text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
        />
      </div>

      {/* Tabel / Daftar Verifikasi Pembayaran */}
      {sedangMemuat ? (
        <div className="space-y-4">
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
        </div>
      ) : tagihanTerfilter.length === 0 ? (
        <div className="kartu-bento p-12 text-center space-y-2 bg-latar/40 border-dashed border-garis">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-sm text-cokelat-tua">Tidak ada data tagihan pada filter ini</h3>
          <p className="text-xs text-cokelat-tua/60">
            Seluruh bukti transfer yang masuk pada kategori ini telah selesai ditangani.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tagihanTerfilter.map((tagihan) => (
            <div
              key={tagihan.id}
              className="kartu-bento p-5 sm:p-6 space-y-4 bg-permukaan border-garis hover:border-marun/30 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-garis">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-marun bg-latar px-2.5 py-1 rounded-md border border-garis">
                    {tagihan.id}
                  </span>
                  <span className="text-xs font-semibold text-cokelat-tua">
                    Kamar {tagihan.nomor_kamar} ({tagihan.tipe_kamar})
                  </span>
                  <LencanaPengingatJatuhTempo pengingat={tagihan.pengingat} />
                </div>
                <LencanaStatusTagihan status={tagihan.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Info Penghuni & Nominal */}
                <div className="md:col-span-5 space-y-1">
                  <h3 className="text-base font-bold text-marun">
                    {tagihan.nama_penghuni}
                  </h3>
                  <p className="text-xs text-cokelat-tua/75">
                    Periode: <strong>{tagihan.periode_bulan}</strong> • Jatuh Tempo: {tagihan.jatuh_tempo}
                  </p>
                  <p className="text-sm font-extrabold text-marun pt-1">
                    Nominal: {formatMataUang(tagihan.nominal)}
                  </p>
                  {tagihan.catatan_penghuni && (
                    <p className="text-[11px] text-cokelat-tua/70 italic bg-latar p-2 rounded-lg border border-garis">
                      "{tagihan.catatan_penghuni}"
                    </p>
                  )}
                </div>

                {/* Bukti Transfer Pratinjau */}
                <div className="md:col-span-4 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-terakota block">
                    Struk Bukti Transfer:
                  </span>
                  {tagihan.bukti_transfer_url ? (
                    <div
                      onClick={() => setModalFoto(tagihan.bukti_transfer_url)}
                      className="relative w-36 h-24 rounded-xl overflow-hidden border border-garis bg-gray-100 group cursor-pointer"
                    >
                      <img
                        src={tagihan.bukti_transfer_url}
                        alt="Bukti Transfer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold gap-1 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                      </div>
                    </div>
                  ) : (
                    <div className="w-36 h-20 rounded-xl bg-latar border border-dashed border-garis flex items-center justify-center text-[10px] text-cokelat-tua/50 text-center p-2">
                      Belum ada bukti diunggah
                    </div>
                  )}
                  {tagihan.tanggal_unggah && (
                    <span className="text-[10px] text-cokelat-tua/60 block">
                      Diunggah: {formatTanggal(tagihan.tanggal_unggah)}
                    </span>
                  )}
                </div>

                {/* Tombol Aksi Verifikasi */}
                <div className="md:col-span-3 flex flex-col gap-2 justify-center">
                  {tagihan.status === 'menunggu_verifikasi' ? (
                    <>
                      <button
                        type="button"
                        disabled={sedangProses}
                        onClick={() => tanganiSetujui(tagihan)}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Setujui Pembayaran</span>
                      </button>
                      <button
                        type="button"
                        disabled={sedangProses}
                        onClick={() => bukaModalTolak(tagihan)}
                        className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Tolak Pembayaran</span>
                      </button>
                    </>
                  ) : tagihan.status === 'lunas' ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                      <span className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Terverifikasi Lunas
                      </span>
                      <span className="text-[10px] text-emerald-900/70 block mt-0.5">
                        {formatTanggal(tagihan.verified_at)}
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
                      <span className="font-bold text-rose-800 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> Ditolak
                      </span>
                      <p className="text-[11px] leading-tight text-rose-900/80">
                        {tagihan.alasan_penolakan || 'Bukti tidak valid.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Zoom Foto Struk */}
      {modalFoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalFoto(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-permukaan rounded-2xl p-3 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalFoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={modalFoto}
              alt="Bukti Transfer Penuh"
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Modal Alasan Penolakan */}
      {tagihanDitolak && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setTagihanDitolak(null)}
        >
          <div
            className="relative max-w-md w-full bg-permukaan rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl border border-garis"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-garis">
              <div className="flex items-center gap-2 text-rose-700">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-base text-marun">Tolak Pembayaran Sewa</h3>
              </div>
              <button
                type="button"
                onClick={() => setTagihanDitolak(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={konfirmasiTolak} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-latar border border-garis">
                <p className="font-bold text-cokelat-tua">
                  {tagihanDitolak.nama_penghuni} — Kamar {tagihanDitolak.nomor_kamar}
                </p>
                <p className="text-cokelat-tua/70">Nominal Tagihan: {formatMataUang(tagihanDitolak.nominal)}</p>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Alasan Penolakan (Akan Dibaca Penghuni)
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Contoh: Nominal transfer kurang Rp200.000 atau nama rekening tidak sesuai..."
                  value={alasanPenolakan}
                  onChange={(e) => setAlasanPenolakan(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-garis">
                <button
                  type="button"
                  onClick={() => setTagihanDitolak(null)}
                  className="tombol-garis py-2 px-4 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={sedangProses}
                  className="py-2 px-5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  {sedangProses ? 'Memproses...' : 'Kirim Penolakan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifikasiPembayaran;
