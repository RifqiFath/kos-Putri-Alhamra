import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Calendar,
  Wallet,
  AlertTriangle,
  RotateCcw,
  RefreshCw,
  X,
  Save,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import {
  ambilRingkasanLabaRugi,
  ambilSemuaTransaksi,
  catatPengeluaranOperasional,
  resetDataKeuanganKeAwal,
} from '../../services/keuanganService';
import SkeletonLoader from '../../components/feedback/SkeletonLoader';
import { useToast } from '../../context/ToastContext';
import formatMataUang from '../../utils/formatMataUang';
import formatTanggal from '../../utils/formatTanggal';

export const ManajemenKeuangan = () => {
  const { tampilkanToast } = useToast();

  const [ringkasan, setRingkasan] = useState(null);
  const [daftarTransaksi, setDaftarTransaksi] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Filter Mutasi Kas
  const [tabJenis, setTabJenis] = useState('semua'); // 'semua' | 'pemasukan' | 'pengeluaran'
  const [filterKategori, setFilterKategori] = useState('semua');
  const [kataKunci, setKataKunci] = useState('');

  // Modal Catat Pengeluaran
  const [modalBuka, setModalBuka] = useState(false);
  const [kategoriPengeluaran, setKategoriPengeluaran] = useState('listrik_air');
  const [nominalPengeluaran, setNominalPengeluaran] = useState('');
  const [keteranganPengeluaran, setKeteranganPengeluaran] = useState('');
  const [tanggalPengeluaran, setTanggalPengeluaran] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const muatDataKeuangan = async () => {
    setSedangMemuat(true);
    try {
      const [dataRingkasan, dataTransaksi] = await Promise.all([
        ambilRingkasanLabaRugi(),
        ambilSemuaTransaksi(),
      ]);
      setRingkasan(dataRingkasan);
      setDaftarTransaksi(dataTransaksi);
    } catch (err) {
      console.error('Gagal memuat keuangan:', err);
      tampilkanToast('Gagal memuat data keuangan.', 'galat');
    } finally {
      setSedangMemuat(false);
    }
  };

  useEffect(() => {
    muatDataKeuangan();
  }, []);

  // Simpan Pengeluaran
  const tanganiSimpanPengeluaran = async (e) => {
    e.preventDefault();

    if (!nominalPengeluaran || Number(nominalPengeluaran) <= 0) {
      tampilkanToast('Nominal pengeluaran harus lebih besar dari 0.', 'peringatan');
      return;
    }

    if (!keteranganPengeluaran.trim()) {
      tampilkanToast('Mohon isi keterangan pengeluaran.', 'peringatan');
      return;
    }

    setSedangMenyimpan(true);
    try {
      await catatPengeluaranOperasional({
        kategori: kategoriPengeluaran,
        nominal: nominalPengeluaran,
        keterangan: keteranganPengeluaran,
        tanggal_transaksi: tanggalPengeluaran,
      });

      tampilkanToast(
        `Pengeluaran sebesar ${formatMataUang(nominalPengeluaran)} berhasil dicatat ke buku kas.`,
        'sukses'
      );
      setModalBuka(false);
      setNominalPengeluaran('');
      setKeteranganPengeluaran('');
      muatDataKeuangan();
    } catch (err) {
      console.error('Galat mencatat pengeluaran:', err);
      tampilkanToast('Gagal mencatat pengeluaran: ' + err.message, 'galat');
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Reset Data Keuangan ke Awal
  const tanganiResetData = () => {
    if (window.confirm('Reset data keuangan ke kondisi pengujian awal?')) {
      resetDataKeuanganKeAwal();
      tampilkanToast('Data keuangan dan transaksi kas berhasil direset.', 'info');
      muatDataKeuangan();
    }
  };

  // Filter Transaksi
  const transaksiTerfilter = daftarTransaksi.filter((t) => {
    if (tabJenis !== 'semua' && t.jenis_kas !== tabJenis) {
      return false;
    }
    if (filterKategori !== 'semua' && t.kategori !== filterKategori) {
      return false;
    }
    if (kataKunci.trim()) {
      const k = kataKunci.toLowerCase();
      const cocokKeterangan = t.keterangan.toLowerCase().includes(k);
      const cocokId = t.id.toLowerCase().includes(k);
      const cocokKategori = t.kategori.toLowerCase().includes(k);
      return cocokKeterangan || cocokId || cocokKategori;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Anggita Natarina (Manajemen Arus Kas & Pengeluaran) --> */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Manajemen Keuangan & Arus Kas</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Pencatatan mutasi kas masuk pelunasan sewa dan pos pengeluaran operasional Kos Putri Alhamra.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={tanganiResetData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-garis bg-permukaan hover:bg-latar text-xs font-semibold text-terakota transition-colors"
            title="Reset data pengujian"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sampel</span>
          </button>
          <button
            type="button"
            onClick={() => setModalBuka(true)}
            className="tombol-marun py-2.5 px-4 text-xs gap-1.5 font-bold shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-kuning-mas" />
            <span>Catat Kas Keluar</span>
          </button>
        </div>
      </div>

      {/* Ringkasan Keuangan Bento Cards */}
      {sedangMemuat ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
        </div>
      ) : ringkasan ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Pemasukan */}
          <div className="kartu-bento p-5 space-y-2 border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Total Pemasukan Kas
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-emerald-800">
              {formatMataUang(ringkasan.total_pemasukan)}
            </p>
            <p className="text-[11px] text-cokelat-tua/70">
              Dari {ringkasan.kamar_lunas} kamar lunas ({ringkasan.persentase_pelunasan}%)
            </p>
          </div>

          {/* Total Pengeluaran */}
          <div className="kartu-bento p-5 space-y-2 border-rose-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Total Pengeluaran
              </span>
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ArrowDownRight className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-rose-800">
              {formatMataUang(ringkasan.total_pengeluaran)}
            </p>
            <p className="text-[11px] text-cokelat-tua/70">Gaji staf, utilitas & perbaikan</p>
          </div>

          {/* Saldo Bersih */}
          <div className="kartu-bento p-5 space-y-2 border-marun/20 bg-gradient-to-br from-permukaan to-kuning-mas/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-marun">
                Saldo Bersih (Net Income)
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
            <p className="text-[11px] text-cokelat-tua/70">Arus kas bersih berjalan</p>
          </div>

          {/* Kamar Menunggak */}
          <div className="kartu-bento p-5 space-y-2 border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Kamar Menunggak
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-amber-700">
              {ringkasan.kamar_menunggak} Kamar
            </p>
            <p className="text-[11px] text-cokelat-tua/70">
              Potensi tertahan: {formatMataUang(ringkasan.nominal_menunggak)}
            </p>
          </div>
        </div>
      ) : null}

      {/* Tabel Mutasi Arus Kas */}
      <div className="kartu-bento p-6 space-y-5 bg-permukaan">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-garis">
          <h2 className="text-base font-bold text-marun">Buku Mutasi Kas & Ledger Transaksi</h2>
          <span className="text-xs text-cokelat-tua/60 font-medium">
            Total {transaksiTerfilter.length} transaksi tercatat
          </span>
        </div>

        {/* Tab & Filter Transaksi */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5 flex gap-1.5">
            <button
              type="button"
              onClick={() => setTabJenis('semua')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                tabJenis === 'semua'
                  ? 'bg-marun text-permukaan'
                  : 'bg-latar text-cokelat-tua hover:bg-permukaan border border-garis'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setTabJenis('pemasukan')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                tabJenis === 'pemasukan'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-latar text-emerald-900 hover:bg-emerald-50 border border-emerald-200'
              }`}
            >
              Pemasukan
            </button>
            <button
              type="button"
              onClick={() => setTabJenis('pengeluaran')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                tabJenis === 'pengeluaran'
                  ? 'bg-rose-700 text-white'
                  : 'bg-latar text-rose-900 hover:bg-rose-50 border border-rose-200'
              }`}
            >
              Pengeluaran
            </button>
          </div>

          <div className="sm:col-span-3">
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
            >
              <option value="semua">Semua Kategori</option>
              <option value="sewa_kamar">Sewa Kamar</option>
              <option value="gaji_staff">Gaji Staf</option>
              <option value="listrik_air">Listrik & Air</option>
              <option value="perbaikan">Perbaikan Fasilitas</option>
              <option value="lain_lain">Lain-lain</option>
            </select>
          </div>

          <div className="sm:col-span-4 relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari keterangan atau ID transaksi..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
            />
          </div>
        </div>

        {/* Tabel Data Mutasi */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-garis bg-latar/80 text-cokelat-tua/70 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">ID Transaksi</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Keterangan</th>
                <th className="py-3 px-4 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-garis">
              {transaksiTerfilter.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-cokelat-tua/60">
                    Tidak ada mutasi transaksi kas yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                transaksiTerfilter.map((trx) => {
                  const adalahPemasukan = trx.jenis_kas === 'pemasukan';
                  return (
                    <tr key={trx.id} className="hover:bg-latar/50 transition-colors">
                      <td className="py-3 px-4 font-mono text-cokelat-tua/80 whitespace-nowrap">
                        {trx.tanggal_transaksi}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-marun whitespace-nowrap">
                        {trx.id}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="capitalize px-2 py-0.5 rounded bg-latar border border-garis font-semibold text-[11px]">
                          {trx.kategori.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-cokelat-tua font-medium max-w-xs truncate">
                        {trx.keterangan}
                      </td>
                      <td
                        className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                          adalahPemasukan ? 'text-emerald-700' : 'text-rose-700'
                        }`}
                      >
                        {adalahPemasukan ? '+' : '-'} {formatMataUang(trx.nominal)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Pencatatan Pengeluaran Operasional */}
      {modalBuka && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setModalBuka(false)}
        >
          <div
            className="relative max-w-md w-full bg-permukaan rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl border border-garis"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-garis">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-marun">Catat Pengeluaran Operasional</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalBuka(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={tanganiSimpanPengeluaran} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Kategori Pengeluaran
                </label>
                <select
                  value={kategoriPengeluaran}
                  onChange={(e) => setKategoriPengeluaran(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                >
                  <option value="listrik_air">Listrik & Air (PDAM/Token)</option>
                  <option value="gaji_staff">Gaji Staf / Penjaga Kos</option>
                  <option value="perbaikan">Perbaikan & Pemeliharaan Fasilitas</option>
                  <option value="lain_lain">Biaya Operasional Lain-lain</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Nominal Pengeluaran (Rp)
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  placeholder="Contoh: 150000"
                  value={nominalPengeluaran}
                  onChange={(e) => setNominalPengeluaran(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Keterangan Pengeluaran
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Contoh: Pembelian kran wastafel baru dan seal karet untuk Kamar A-03"
                  value={keteranganPengeluaran}
                  onChange={(e) => setKeteranganPengeluaran(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Tanggal Transaksi
                </label>
                <input
                  type="date"
                  required
                  value={tanggalPengeluaran}
                  onChange={(e) => setTanggalPengeluaran(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-garis">
                <button
                  type="button"
                  onClick={() => setModalBuka(false)}
                  className="tombol-garis py-2 px-4 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={sedangMenyimpan}
                  className="tombol-marun py-2 px-5 text-xs font-bold gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-kuning-mas" />
                  <span>{sedangMenyimpan ? 'Menyimpan...' : 'Simpan Pengeluaran'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManajemenKeuangan;
