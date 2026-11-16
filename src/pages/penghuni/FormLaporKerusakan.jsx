import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  UploadCloud,
  Sparkles,
  Camera,
  X,
  AlertCircle,
  CheckCircle2,
  Send,
  HelpCircle,
  FileText,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { buatTiketBaru, klasifikasiKerusakanAI } from '../../services/kerusakanService';
import { LencanaKategori, LencanaUrgensi } from '../../components/cards/LencanaStatusKerusakan';

export const FormLaporKerusakan = () => {
  const { pengguna } = useAuth();
  const { tampilkanToast } = useToast();
  const navigate = useNavigate();

  // State Form
  const [lokasiFasilitas, setLokasiFasilitas] = useState('Kamar Mandi Dalam');
  const [judulMasalah, setJudulMasalah] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoSebelumUrl, setFotoSebelumUrl] = useState(null);
  const [namaBerkas, setNamaBerkas] = useState('');

  // State Klasifikasi AI
  const [hasilAI, setHasilAI] = useState(null);
  const [sedangAnalisisAI, setSedangAnalisisAI] = useState(false);
  const [sedangKirim, setSedangKirim] = useState(false);

  const fileInputRef = useRef(null);

  // Pilihan Lokasi Fasilitas
  const daftarLokasi = [
    'Kamar Mandi Dalam',
    'Kamar Tidur Utama',
    'Dapur Bersama Lantai 1',
    'Ruang TV & Tamu Bersama',
    'Area Parkiran Motor',
    'Koridor / Lorong Lantai 2',
    'Fasilitas Lainnya',
  ];

  // Debounced AI classification saat pengguna mengetik deskripsi
  useEffect(() => {
    if (!deskripsi || deskripsi.trim().length < 5) {
      setHasilAI(null);
      return;
    }

    const timer = setTimeout(async () => {
      setSedangAnalisisAI(true);
      try {
        const prediksi = await klasifikasiKerusakanAI(deskripsi, lokasiFasilitas);
        setHasilAI(prediksi);
      } catch (err) {
        console.error('Gagal analisis AI:', err);
      } finally {
        setSedangAnalisisAI(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [deskripsi, lokasiFasilitas]);

  // Penanganan Unggah Foto & Pratinjau
  const tanganiPilihBerkas = (e) => {
    const berkas = e.target.files?.[0];
    if (!berkas) return;

    // Validasi Tipe Berkas (Hanya Gambar)
    if (!berkas.type.startsWith('image/')) {
      tampilkanToast('Format berkas tidak valid. Harap pilih gambar (JPG/PNG/WEBP).', 'galat');
      return;
    }

    // Validasi Ukuran Berkas (Maksimal 5 MB)
    const batasUkuranBytes = 5 * 1024 * 1024;
    if (berkas.size > batasUkuranBytes) {
      tampilkanToast('Ukuran gambar terlalu besar. Batas maksimal adalah 5 MB.', 'galat');
      return;
    }

    setNamaBerkas(berkas.name);

    // Konversi ke Base64 Data URL untuk pratinjau dan penyimpanan lokal
    const pembaca = new FileReader();
    pembaca.onload = (event) => {
      setFotoSebelumUrl(event.target.result);
      tampilkanToast('Foto kondisi awal berhasil diunggah.', 'sukses');
    };
    pembaca.readAsDataURL(berkas);
  };

  const hapusFoto = () => {
    setFotoSebelumUrl(null);
    setNamaBerkas('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Sampel Kasus Cepat (Membantu Pengujian / Evaluasi)
  const terapkanKasusUji = (kategoriContoh) => {
    if (kategoriContoh === 'darurat_listrik') {
      setLokasiFasilitas('Kamar Tidur Utama');
      setJudulMasalah('Stopkontak meja belajar keluar percikan api dan berasap');
      setDeskripsi(
        'Stopkontak di samping meja belajar mendadak keluar percikan api dan ada asap berbau kabel hangus terbakar saat charger dicolok.'
      );
      setFotoSebelumUrl(
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
      );
      setNamaBerkas('stopkontak_berasap.jpg');
    } else if (kategoriContoh === 'plumbing') {
      setLokasiFasilitas('Kamar Mandi Dalam');
      setJudulMasalah('Pipa wastafel pecah dan air meluap ke lantai');
      setDeskripsi(
        'Pipa pembuangan wastafel kamar mandi retak bocor sehingga air mengalir deras ke lantai dan tidak bisa ditutup rapat.'
      );
      setFotoSebelumUrl(
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
      );
      setNamaBerkas('pipa_bocor.jpg');
    } else {
      setLokasiFasilitas('Kamar Tidur Utama');
      setJudulMasalah('Engsel pintu lemari pakaian longgar');
      setDeskripsi(
        'Engsel pintu lemari pakaian bagian bawah agak kendur sehingga pintu miring dan berderit saat dibuka.'
      );
      setFotoSebelumUrl(
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80'
      );
      setNamaBerkas('engsel_lemari.jpg');
    }
    tampilkanToast('Kasus uji otomatis telah dimuat.', 'info');
  };

  // Submit Form
  const tanganiKirimLaporan = async (e) => {
    e.preventDefault();

    if (!judulMasalah.trim()) {
      tampilkanToast('Mohon masukkan ringkasan judul masalah.', 'peringatan');
      return;
    }

    if (!deskripsi.trim() || deskripsi.trim().length < 10) {
      tampilkanToast(
        'Mohon berikan deskripsi kerusakan minimal 10 karakter agar teknisi mudah mengidentifikasi.',
        'peringatan'
      );
      return;
    }

    setSedangKirim(true);
    try {
      const dataLaporan = {
        lokasi_fasilitas: lokasiFasilitas,
        judul_masalah: judulMasalah,
        deskripsi: deskripsi,
        foto_sebelum_url: fotoSebelumUrl,
        nomor_kamar: pengguna?.nomor_kamar || 'Kamar A-05',
        kategori_ai: hasilAI?.kategori_ai,
        tingkat_urgensi: hasilAI?.tingkat_urgensi,
      };

      const tiketBaru = await buatTiketBaru(dataLaporan, pengguna);
      tampilkanToast(
        `Laporan berhasil diajukan dengan ID ${tiketBaru.id}. Penjaga kos telah diberi notifikasi!`,
        'sukses',
        5000
      );

      // Arahkan ke daftar perbaikan sesuai peran
      if (pengguna?.role === 'staff') {
        navigate('/penjaga/perbaikan');
      } else {
        navigate('/penghuni');
      }
    } catch (error) {
      console.error('Galat mengajukan laporan:', error);
      tampilkanToast('Gagal mengajukan laporan: ' + error.message, 'galat');
    } finally {
      setSedangKirim(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy (Modul Pelaporan Kerusakan) --> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Formulir Pelaporan Kerusakan Fasilitas</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Sistem klasifikasi AI otomatis akan memetakan kategori dan tingkat urgensi penanganan teknisi.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-kuning-mas/20 border border-kuning-mas/40 text-xs font-semibold text-cokelat-tua">
          <MapPin className="w-4 h-4 text-terakota" />
          <span>Kamar Pelapor: {pengguna?.nomor_kamar || 'Kamar A-05'}</span>
        </div>
      </div>

      {/* Baris Tombol Kasus Uji Cepat (Untuk Penguji / Dosen) */}
      <div className="p-4 rounded-2xl bg-permukaan border border-garis space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-terakota flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Uji Cepat Klasifikasi AI (Data Sampel):
          </span>
          <span className="text-[11px] text-cokelat-tua/60 font-medium">Klik untuk isi otomatis</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => terapkanKasusUji('darurat_listrik')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            🔥 Kasus 1: Stopkontak Berasap (Urgensi Tinggi)
          </button>
          <button
            type="button"
            onClick={() => terapkanKasusUji('plumbing')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors"
          >
            💧 Kasus 2: Pipa Wastafel Bocor (Plumbing)
          </button>
          <button
            type="button"
            onClick={() => terapkanKasusUji('furnitur')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            🪑 Kasus 3: Engsel Lemari Longgar (Minor/Rendah)
          </button>
        </div>
      </div>

      {/* Form Utama */}
      <form onSubmit={tanganiKirimLaporan} className="space-y-6">
        <div className="kartu-bento p-6 sm:p-8 space-y-6 bg-permukaan">
          {/* 1. Lokasi Fasilitas */}
          <div>
            <label
              htmlFor="lokasiFasilitas"
              className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-2"
            >
              Lokasi / Area Fasilitas
            </label>
            <select
              id="lokasiFasilitas"
              value={lokasiFasilitas}
              onChange={(e) => setLokasiFasilitas(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun focus:bg-permukaan transition-all"
            >
              {daftarLokasi.map((lok) => (
                <option key={lok} value={lok}>
                  {lok}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Judul Masalah */}
          <div>
            <label
              htmlFor="judulMasalah"
              className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-2"
            >
              Judul Kerusakan Ringkas
            </label>
            <input
              id="judulMasalah"
              type="text"
              required
              placeholder="Contoh: Kran wastafel bocor menetes terus"
              value={judulMasalah}
              onChange={(e) => setJudulMasalah(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marun focus:bg-permukaan transition-all"
            />
          </div>

          {/* 3. Deskripsi Masalah & Analisis AI Realtime */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="deskripsi"
                className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua"
              >
                Deskripsi Lengkap Kendala
              </label>
              {sedangAnalisisAI && (
                <span className="text-[11px] font-semibold text-terakota flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> AI sedang menganalisis...
                </span>
              )}
            </div>
            <textarea
              id="deskripsi"
              rows={4}
              required
              placeholder="Ceritakan detail kerusakan yang kamu alami, sejak kapan terjadi, dan dampaknya pada aktivitas harian..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marun focus:bg-permukaan transition-all"
            />
          </div>

          {/* Banner Live Hasil Analisis Klasifikasi AI */}
          {hasilAI && (
            <div className="p-4 sm:p-5 rounded-2xl bg-latar border border-kuning-mas/60 space-y-3 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-marun flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-kuning-mas fill-kuning-mas" />
                  Hasil Klasifikasi Model AI:
                </span>
                <div className="flex items-center gap-2">
                  <LencanaKategori kategori={hasilAI.kategori_ai} />
                  <LencanaUrgensi urgensi={hasilAI.tingkat_urgensi} skor={hasilAI.skor_urgensi} />
                </div>
              </div>
              <p className="text-xs text-cokelat-tua/80 leading-relaxed bg-permukaan p-3 rounded-xl border border-garis">
                <strong className="text-terakota">Alasan Penilaian AI: </strong>
                {hasilAI.alasan_ai}
              </p>
            </div>
          )}

          {/* 4. Unggah Foto Kondisi Awal (Before) dengan Pratinjau */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-2">
              Unggah Foto Kondisi Awal (Before)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={tanganiPilihBerkas}
              className="hidden"
              id="unggah-foto-sebelum"
            />

            {fotoSebelumUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-garis bg-latar p-3 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={fotoSebelumUrl}
                  alt="Pratinjau kondisi awal"
                  className="w-32 h-24 object-cover rounded-xl border border-garis"
                />
                <div className="flex-1 text-xs space-y-1">
                  <p className="font-bold text-cokelat-tua">{namaBerkas || 'foto_kondisi_awal.jpg'}</p>
                  <p className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Foto siap dikirim
                  </p>
                </div>
                <button
                  type="button"
                  onClick={hapusFoto}
                  className="p-2 rounded-xl text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
                  aria-label="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="unggah-foto-sebelum"
                className="border-2 border-dashed border-garis hover:border-marun/50 rounded-2xl p-8 text-center bg-latar/50 hover:bg-latar flex flex-col items-center justify-center cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-kuning-mas/30 text-marun flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6 text-marun" />
                </div>
                <p className="text-sm font-bold text-marun">Klik untuk memilih foto kondisi kerusakan</p>
                <p className="text-xs text-cokelat-tua/60 mt-1">
                  Mendukung format JPG, PNG, atau WEBP (Maksimal 5 MB)
                </p>
              </label>
            )}
          </div>
        </div>

        {/* Tombol Kirim Form */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="tombol-garis text-sm px-6 py-3"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={sedangKirim}
            className="tombol-marun text-sm px-8 py-3 gap-2 shadow-md"
          >
            <Send className="w-4 h-4 text-kuning-mas" />
            <span>{sedangKirim ? 'Mengirim Tiket...' : 'Kirim Laporan Kerusakan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLaporKerusakan;
