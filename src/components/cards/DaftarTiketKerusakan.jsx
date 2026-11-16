import React, { useState, useEffect, useRef } from 'react';
import {
  Wrench,
  Search,
  Filter,
  RefreshCw,
  Camera,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Save,
  RotateCcw,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import KartuTiketKerusakan from './KartuTiketKerusakan';
import SkeletonLoader from '../feedback/SkeletonLoader';
import {
  ambilSemuaTiket,
  perbaruiStatusTiket,
  resetDataTiketKeAwal,
} from '../../services/kerusakanService';
import { useToast } from '../../context/ToastContext';

export const DaftarTiketKerusakan = ({
  peranPengguna = 'tenant',
  idPelapor = null,
  tampilkanHanyaMilikPelapor = false,
  judulBagian = 'Daftar Tiket Perbaikan Fasilitas',
}) => {
  const { tampilkanToast } = useToast();

  const [daftarTiket, setDaftarTiket] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Filter State
  const [tabStatus, setTabStatus] = useState('semua'); // 'semua' | 'menunggu' | 'diproses' | 'selesai'
  const [filterKategori, setFilterKategori] = useState('semua');
  const [filterUrgensi, setFilterUrgensi] = useState('semua');
  const [kataKunci, setKataKunci] = useState('');

  // Modal State Pembaruan Tiket (Staff / Owner)
  const [tiketDipilih, setTiketDipilih] = useState(null);
  const [statusBaru, setStatusBaru] = useState('diproses');
  const [catatanTeknisi, setCatatanTeknisi] = useState('');
  const [fotoSesudahUrl, setFotoSesudahUrl] = useState(null);
  const [biayaRealisasi, setBiayaRealisasi] = useState('');
  const [sedangMenyimpan, setSedangMenyimpan] = useState(false);

  const fileAfterRef = useRef(null);

  // Ambil data tiket
  const muatData = async () => {
    setSedangMemuat(true);
    try {
      const data = await ambilSemuaTiket();
      setDaftarTiket(data);
    } catch (err) {
      console.error('Gagal mengambil tiket:', err);
      tampilkanToast('Gagal memuat daftar tiket kerusakan.', 'galat');
    } finally {
      setSedangMemuat(false);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  // Buka Modal Pembaruan Penanganan
  const bukaModalPembaruan = (tiket) => {
    setTiketDipilih(tiket);
    setStatusBaru(tiket.status || 'diproses');
    setCatatanTeknisi(tiket.catatan_teknisi || '');
    setFotoSesudahUrl(tiket.foto_sesudah_url || null);
    setBiayaRealisasi(tiket.biaya_realisasi ? String(tiket.biaya_realisasi) : '');
  };

  const tutupModal = () => {
    setTiketDipilih(null);
    setFotoSesudahUrl(null);
    setCatatanTeknisi('');
    setBiayaRealisasi('');
  };

  // Unggah foto hasil perbaikan (After)
  const tanganiUnggahFotoAfter = (e) => {
    const berkas = e.target.files?.[0];
    if (!berkas) return;

    if (!berkas.type.startsWith('image/')) {
      tampilkanToast('Harap pilih berkas gambar yang valid (JPG/PNG).', 'galat');
      return;
    }

    if (berkas.size > 5 * 1024 * 1024) {
      tampilkanToast('Ukuran foto melebihi batas 5 MB.', 'galat');
      return;
    }

    const pembaca = new FileReader();
    pembaca.onload = (event) => {
      setFotoSesudahUrl(event.target.result);
      tampilkanToast('Foto hasil perbaikan berhasil dimuat.', 'sukses');
    };
    pembaca.readAsDataURL(berkas);
  };

  // Simpan Pembaruan Status
  const simpanPembaruan = async (e) => {
    e.preventDefault();
    if (!tiketDipilih) return;

    setSedangMenyimpan(true);
    try {
      const hasil = await perbaruiStatusTiket(tiketDipilih.id, statusBaru, {
        catatan_teknisi: catatanTeknisi,
        foto_sesudah_url: fotoSesudahUrl,
        biaya_realisasi: biayaRealisasi ? Number(biayaRealisasi) : null,
      });

      tampilkanToast(
        `Tiket ${hasil.id} berhasil diperbarui menjadi '${statusBaru.toUpperCase()}'.`,
        'sukses'
      );
      tutupModal();
      muatData();
    } catch (err) {
      console.error('Gagal memperbarui tiket:', err);
      tampilkanToast('Gagal memperbarui status tiket: ' + err.message, 'galat');
    } finally {
      setSedangMenyimpan(false);
    }
  };

  // Reset data ke awal
  const tanganiResetData = () => {
    if (window.confirm('Reset data tiket ke kondisi pengujian awal (5 tiket standar)?')) {
      resetDataTiketKeAwal();
      tampilkanToast('Data tiket berhasil direset ke data sampel awal.', 'info');
      muatData();
    }
  };

  // Filter Tiket
  const tiketTerfilter = daftarTiket.filter((t) => {
    // Filter milik pelapor jika diperlukan (misal di halaman profil tenant)
    if (tampilkanHanyaMilikPelapor && idPelapor && t.reporter_id !== idPelapor) {
      return false;
    }

    // Filter Tab Status
    if (tabStatus !== 'semua' && t.status.toLowerCase() !== tabStatus.toLowerCase()) {
      return false;
    }

    // Filter Kategori
    if (
      filterKategori !== 'semua' &&
      t.kategori_ai.toLowerCase() !== filterKategori.toLowerCase()
    ) {
      return false;
    }

    // Filter Urgensi
    if (
      filterUrgensi !== 'semua' &&
      t.tingkat_urgensi.toLowerCase() !== filterUrgensi.toLowerCase()
    ) {
      return false;
    }

    // Filter Kata Kunci
    if (kataKunci.trim()) {
      const k = kataKunci.toLowerCase();
      const cocokJudul = t.judul_masalah.toLowerCase().includes(k);
      const cocokDeskripsi = t.deskripsi.toLowerCase().includes(k);
      const cocokLokasi = t.lokasi_fasilitas.toLowerCase().includes(k);
      const cocokId = t.id.toLowerCase().includes(k);
      const cocokNama = t.nama_pelapor.toLowerCase().includes(k);
      return cocokJudul || cocokDeskripsi || cocokLokasi || cocokId || cocokNama;
    }

    return true;
  });

  // Hitung ringkasan
  const jumlahMenunggu = daftarTiket.filter((t) => t.status === 'menunggu').length;
  const jumlahDiproses = daftarTiket.filter((t) => t.status === 'diproses').length;
  const jumlahSelesai = daftarTiket.filter((t) => t.status === 'selesai').length;

  return (
    <div className="space-y-6">
      {/* Header & Tombol Aksi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-marun">{judulBagian}</h2>
          <p className="text-xs sm:text-sm text-cokelat-tua/75 mt-0.5">
            Pelacakan progres perbaikan transparan dengan dokumentasi before-after.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={muatData}
            title="Muat Ulang Data"
            className="p-2.5 rounded-xl border border-garis bg-permukaan hover:bg-latar text-cokelat-tua transition-colors"
            aria-label="Segarkan data tiket"
          >
            <RefreshCw className={`w-4 h-4 ${sedangMemuat ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={tanganiResetData}
            title="Reset ke Sampel Awal"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-garis bg-permukaan hover:bg-latar text-xs font-semibold text-terakota transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Sampel</span>
          </button>
        </div>
      </div>

      {/* Tab Filter Status Berwarna */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-garis">
        <button
          type="button"
          onClick={() => setTabStatus('semua')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabStatus === 'semua'
              ? 'bg-marun text-permukaan shadow-sm'
              : 'bg-permukaan border border-garis text-cokelat-tua/70 hover:bg-latar'
          }`}
        >
          Semua Tiket ({daftarTiket.length})
        </button>
        <button
          type="button"
          onClick={() => setTabStatus('menunggu')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabStatus === 'menunggu'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-permukaan border border-amber-200 text-amber-900 hover:bg-amber-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Menunggu ({jumlahMenunggu})</span>
        </button>
        <button
          type="button"
          onClick={() => setTabStatus('diproses')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabStatus === 'diproses'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-permukaan border border-blue-200 text-blue-900 hover:bg-blue-50'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Diproses ({jumlahDiproses})</span>
        </button>
        <button
          type="button"
          onClick={() => setTabStatus('selesai')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tabStatus === 'selesai'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-permukaan border border-emerald-200 text-emerald-900 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Selesai ({jumlahSelesai})</span>
        </button>
      </div>

      {/* Filter Tambahan: Kategori, Urgensi, & Pencarian */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari ID tiket, judul, lokasi, atau pelapor..."
            value={kataKunci}
            onChange={(e) => setKataKunci(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-garis bg-permukaan text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-garis bg-permukaan text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
          >
            <option value="semua">Semua Kategori AI</option>
            <option value="plumbing">Plumbing / Air</option>
            <option value="listrik">Kelistrikan</option>
            <option value="furnitur">Furnitur</option>
            <option value="kebersihan">Kebersihan</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={filterUrgensi}
            onChange={(e) => setFilterUrgensi(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-garis bg-permukaan text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
          >
            <option value="semua">Semua Tingkat Urgensi</option>
            <option value="tinggi">Urgensi Tinggi</option>
            <option value="sedang">Urgensi Sedang</option>
            <option value="rendah">Urgensi Rendah</option>
          </select>
        </div>
      </div>

      {/* Daftar Tiket atau Skeleton Loader */}
      {sedangMemuat ? (
        <div className="space-y-4">
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
        </div>
      ) : tiketTerfilter.length === 0 ? (
        <div className="kartu-bento p-12 text-center space-y-3 bg-latar/40 border-dashed border-garis">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="font-bold text-sm text-cokelat-tua">Tidak ada tiket yang cocok</h3>
          <p className="text-xs text-cokelat-tua/60 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau sesuaikan opsi filter status/kategori di atas.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tiketTerfilter.map((tiket) => (
            <KartuTiketKerusakan
              key={tiket.id}
              tiket={tiket}
              peranPengguna={peranPengguna}
              onAksiPerbarui={bukaModalPembaruan}
            />
          ))}
        </div>
      )}

      {/* Modal Pembaruan Penanganan (Khusus Staff & Owner) */}
      {tiketDipilih && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={tutupModal}
        >
          <div
            className="relative max-w-xl w-full bg-permukaan rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl border border-garis overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-garis">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-marun" />
                <div>
                  <h3 className="font-bold text-base text-marun">
                    Perbarui Status Penanganan Tiket
                  </h3>
                  <span className="font-mono text-xs text-terakota font-semibold">
                    {tiketDipilih.id} — {tiketDipilih.judul_masalah}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={tutupModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-latar"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Modal */}
            <form onSubmit={simpanPembaruan} className="space-y-4 text-xs">
              {/* Pilihan Status Baru */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Status Penanganan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusBaru('menunggu')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      statusBaru === 'menunggu'
                        ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-300'
                        : 'bg-latar border-garis text-cokelat-tua hover:bg-permukaan'
                    }`}
                  >
                    MENUNGGU
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusBaru('diproses')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      statusBaru === 'diproses'
                        ? 'bg-blue-100 text-blue-900 border-blue-400 ring-2 ring-blue-300'
                        : 'bg-latar border-garis text-cokelat-tua hover:bg-permukaan'
                    }`}
                  >
                    DIPROSES
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusBaru('selesai')}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      statusBaru === 'selesai'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-latar border-garis text-cokelat-tua hover:bg-permukaan'
                    }`}
                  >
                    SELESAI
                  </button>
                </div>
              </div>

              {/* Unggah Foto Hasil Perbaikan (After) */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Foto Hasil Perbaikan (After)
                </label>
                <input
                  type="file"
                  ref={fileAfterRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={tanganiUnggahFotoAfter}
                  className="hidden"
                  id="unggah-foto-after"
                />

                {fotoSesudahUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-garis bg-latar p-2.5 flex items-center gap-3">
                    <img
                      src={fotoSesudahUrl}
                      alt="Hasil perbaikan"
                      className="w-20 h-16 object-cover rounded-lg border border-garis"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Foto hasil siap disimpan
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFotoSesudahUrl(null)}
                      className="p-1 rounded-lg text-rose-700 hover:bg-rose-50"
                      aria-label="Hapus foto hasil"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="unggah-foto-after"
                    className="border-2 border-dashed border-garis hover:border-marun/50 rounded-xl p-4 text-center bg-latar flex flex-col items-center justify-center cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-6 h-6 text-terakota mb-1" />
                    <span className="font-semibold text-cokelat-tua">
                      Klik untuk unggah foto hasil perbaikan selesai (After)
                    </span>
                    <span className="text-[10px] text-cokelat-tua/60">JPG/PNG maksimal 5 MB</span>
                  </label>
                )}
              </div>

              {/* Catatan Teknisi */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Catatan Teknisi / Tindakan Perbaikan
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan tindakan yang diambil (misal: penggantian kran wastafel 1/2 inch baru, pengetesan kebocoran pipa)..."
                  value={catatanTeknisi}
                  onChange={(e) => setCatatanTeknisi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              {/* Biaya Realisasi */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                  Biaya Realisasi Servis / Material (Opsional)
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 85000"
                  value={biayaRealisasi}
                  onChange={(e) => setBiayaRealisasi(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                />
              </div>

              {/* Tombol Simpan */}
              <div className="pt-2 flex justify-end gap-2.5 border-t border-garis">
                <button
                  type="button"
                  onClick={tutupModal}
                  className="tombol-garis py-2.5 px-4 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={sedangMenyimpan}
                  className="tombol-marun py-2.5 px-5 text-xs gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-kuning-mas" />
                  <span>{sedangMenyimpan ? 'Menyimpan...' : 'Simpan Pembaruan'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarTiketKerusakan;
