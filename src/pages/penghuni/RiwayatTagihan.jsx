import React, { useState, useEffect, useRef } from 'react';
import {
  CreditCard,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
  FileText,
  Building,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  Eye,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  ambilDaftarTagihan,
  unggahBuktiPembayaran,
  ambilRekeningPengelola,
} from '../../services/keuanganService';
import {
  LencanaStatusTagihan,
  LencanaPengingatJatuhTempo,
} from '../../components/cards/LencanaStatusTagihan';
import SkeletonLoader from '../../components/feedback/SkeletonLoader';
import formatMataUang from '../../utils/formatMataUang';
import formatTanggal from '../../utils/formatTanggal';

export const RiwayatTagihan = () => {
  const { pengguna } = useAuth();
  const { tampilkanToast } = useToast();

  const [daftarTagihan, setDaftarTagihan] = useState([]);
  const [tagihanAktif, setTagihanAktif] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Form Unggah Bukti
  const [buktiTransferUrl, setBuktiTransferUrl] = useState(null);
  const [namaBerkas, setNamaBerkas] = useState('');
  const [catatanPenghuni, setCatatanPenghuni] = useState('');
  const [sedangMengunggah, setSedangMengunggah] = useState(false);
  const fileInputRef = useRef(null);

  // Modal Kuitansi Digital
  const [kuitansiDipilih, setKuitansiDipilih] = useState(null);

  // Salin Nomor Rekening State
  const [rekeningTersalin, setRekeningTersalin] = useState(null);

  const daftarRekening = ambilRekeningPengelola();

  // Muat data tagihan
  const muatTagihan = async () => {
    setSedangMemuat(true);
    try {
      const tenantId = pengguna?.id || 'usr-tenant-003';
      const data = await ambilDaftarTagihan({ tenant_id: tenantId });
      setDaftarTagihan(data);

      if (data.length > 0) {
        setTagihanAktif(data[0]); // Tagihan periode berjalan
      }
    } catch (error) {
      console.error('Gagal mengambil tagihan:', error);
      tampilkanToast('Gagal memuat daftar tagihan.', 'galat');
    } finally {
      setSedangMemuat(false);
    }
  };

  useEffect(() => {
    muatTagihan();
  }, [pengguna]);

  // Penanganan Pilih Berkas Bukti Transfer
  const tanganiPilihBerkas = (e) => {
    const berkas = e.target.files?.[0];
    if (!berkas) return;

    if (!berkas.type.startsWith('image/')) {
      tampilkanToast('Format berkas tidak valid. Harap pilih gambar (JPG/PNG).', 'galat');
      return;
    }

    if (berkas.size > 5 * 1024 * 1024) {
      tampilkanToast('Ukuran gambar melebihi batas 5 MB.', 'galat');
      return;
    }

    setNamaBerkas(berkas.name);
    const pembaca = new FileReader();
    pembaca.onload = (event) => {
      setBuktiTransferUrl(event.target.result);
      tampilkanToast('Bukti transfer siap diunggah.', 'sukses');
    };
    pembaca.readAsDataURL(berkas);
  };

  const hapusFotoBukti = () => {
    setBuktiTransferUrl(null);
    setNamaBerkas('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Kirim Bukti Transfer
  const tanganiKirimBukti = async (e) => {
    e.preventDefault();
    if (!tagihanAktif) return;

    if (!buktiTransferUrl) {
      tampilkanToast('Mohon pilih foto struk bukti transfer terlebih dahulu.', 'peringatan');
      return;
    }

    setSedangMengunggah(true);
    try {
      const hasil = await unggahBuktiPembayaran(tagihanAktif.id, {
        bukti_transfer_url: buktiTransferUrl,
        catatan_penghuni: catatanPenghuni,
      });

      tampilkanToast(
        'Bukti transfer berhasil dikirimkan! Status saat ini: Menunggu Verifikasi Pemilik.',
        'sukses'
      );
      setTagihanAktif(hasil);
      hapusFotoBukti();
      muatTagihan();
    } catch (error) {
      console.error('Galat kirim bukti:', error);
      tampilkanToast('Gagal mengirim bukti transfer: ' + error.message, 'galat');
    } finally {
      setSedangMengunggah(false);
    }
  };

  // Salin Rekening ke Clipboard
  const salinRekening = (noRek, bank) => {
    navigator.clipboard.writeText(noRek.replace(/-/g, ''));
    setRekeningTersalin(bank);
    tampilkanToast(`Nomor rekening ${bank} berhasil disalin!`, 'info');
    setTimeout(() => setRekeningTersalin(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* <!-- dikerjakan oleh Anggita Natarina (Modul Keuangan & Pembayaran Sewa) --> */}
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-garis">
        <div>
          <h1 className="text-2xl font-bold text-marun">Tagihan & Riwayat Pembayaran Sewa</h1>
          <p className="text-sm text-cokelat-tua/75 mt-0.5">
            Unggah bukti transfer dan pantau status verifikasi kuitansi sewa bulanan secara transparan.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-latar border border-garis text-xs text-cokelat-tua font-semibold">
          <Calendar className="w-4 h-4 text-terakota" />
          <span>Jatuh Tempo: Setiap Tanggal 1</span>
        </div>
      </div>

      {sedangMemuat ? (
        <div className="space-y-4">
          <SkeletonLoader varian="kartu" />
          <SkeletonLoader varian="kartu" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kolom Kiri: Tagihan Periode Aktif & Form Unggah */}
          <div className="lg:col-span-8 space-y-6">
            {tagihanAktif ? (
              <div className="kartu-bento p-6 sm:p-7 space-y-6 bg-permukaan border-garis">
                {/* Header Tagihan Aktif */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-garis">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-terakota">
                      Tagihan Bulan Berjalan
                    </span>
                    <h2 className="text-xl font-bold text-marun mt-0.5">
                      Periode {tagihanAktif.periode_bulan}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <LencanaPengingatJatuhTempo pengingat={tagihanAktif.pengingat} />
                    <LencanaStatusTagihan status={tagihanAktif.status} />
                  </div>
                </div>

                {/* Info Nominal & Kamar */}
                <div className="p-4 rounded-xl bg-latar border border-garis flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <p className="font-bold text-sm text-cokelat-tua">
                      Kamar {tagihanAktif.nomor_kamar} ({tagihanAktif.tipe_kamar})
                    </p>
                    <p className="text-xs text-cokelat-tua/70 mt-0.5">
                      Penyewa: {tagihanAktif.nama_penghuni} • Termasuk Biaya Air Bersih
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-cokelat-tua/60 block">Total Tagihan:</span>
                    <span className="text-2xl font-extrabold text-marun">
                      {formatMataUang(tagihanAktif.nominal)}
                    </span>
                  </div>
                </div>

                {/* Kasus 1: Ditolak oleh Pemilik */}
                {tagihanAktif.status === 'ditolak' && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-950 space-y-2 animate-fadeIn">
                    <div className="flex items-center gap-2 text-rose-800 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Pembayaran Terakhir Ditolak oleh Pemilik Kos</span>
                    </div>
                    <p className="leading-relaxed bg-white/80 p-3 rounded-lg border border-rose-200">
                      <strong>Alasan: </strong>
                      {tagihanAktif.alasan_penolakan || 'Bukti transfer tidak terbaca jelas.'}
                    </p>
                    <p className="text-[11px] text-rose-700">
                      Silakan unggah ulang bukti transfer yang valid pada formulir di bawah.
                    </p>
                  </div>
                )}

                {/* Kasus 2: Menunggu Verifikasi */}
                {tagihanAktif.status === 'menunggu_verifikasi' && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-3">
                    <div className="flex items-center gap-2 text-blue-800 font-bold">
                      <Clock className="w-4 h-4 text-blue-600 animate-pulse" />
                      <span>Bukti Pembayaran Sedang Menunggu Verifikasi Pemilik</span>
                    </div>
                    <p className="text-blue-900/80 leading-relaxed">
                      Kamu telah mengunggah bukti transfer pada {formatTanggal(tagihanAktif.tanggal_unggah)}.
                      Bapak Yusuf akan meninjau dan menerbitkan kuitansi pelunasan segera.
                    </p>
                    {tagihanAktif.bukti_transfer_url && (
                      <div className="flex items-center gap-3 pt-1">
                        <img
                          src={tagihanAktif.bukti_transfer_url}
                          alt="Bukti transfer terunggah"
                          className="w-16 h-12 object-cover rounded-lg border border-blue-200"
                        />
                        <span className="text-[11px] text-blue-800 italic">
                          "{tagihanAktif.catatan_penghuni || 'Bukti transfer terkirim'}"
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Kasus 3: Sudah Lunas */}
                {tagihanAktif.status === 'lunas' && (
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Sewa Periode Ini Telah Lunas Terverifikasi</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setKuitansiDipilih(tagihanAktif)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Buka Kuitansi Digital</span>
                      </button>
                    </div>
                    <p className="text-emerald-900/80">
                      Diverifikasi pada {formatTanggal(tagihanAktif.verified_at)}. Terima kasih telah membayar tepat waktu!
                    </p>
                  </div>
                )}

                {/* Form Unggah Bukti (Aktif jika belum bayar atau ditolak) */}
                {(tagihanAktif.status === 'belum_bayar' || tagihanAktif.status === 'ditolak') && (
                  <form onSubmit={tanganiKirimBukti} className="space-y-4 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cokelat-tua">
                      Formulir Konfirmasi Pembayaran Sewa
                    </h3>

                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={tanganiPilihBerkas}
                        className="hidden"
                        id="unggah-bukti-transfer"
                      />

                      {buktiTransferUrl ? (
                        <div className="rounded-xl border border-garis bg-latar p-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={buktiTransferUrl}
                              alt="Pratinjau struk transfer"
                              className="w-16 h-14 object-cover rounded-lg border border-garis"
                            />
                            <div className="text-xs">
                              <p className="font-bold text-cokelat-tua">{namaBerkas || 'struk_transfer.jpg'}</p>
                              <p className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Siap dikirimkan
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={hapusFotoBukti}
                            className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
                            aria-label="Hapus foto"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="unggah-bukti-transfer"
                          className="border-2 border-dashed border-garis hover:border-marun/50 rounded-2xl p-6 text-center bg-latar/50 hover:bg-latar flex flex-col items-center justify-center cursor-pointer transition-all group"
                        >
                          <UploadCloud className="w-8 h-8 text-terakota mb-2 group-hover:scale-105 transition-transform" />
                          <p className="text-xs font-bold text-marun">Klik untuk unggah foto struk transfer / screenshot QRIS</p>
                          <p className="text-[11px] text-cokelat-tua/60 mt-1">Maksimal 5 MB (JPG / PNG)</p>
                        </label>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-cokelat-tua mb-1.5">
                        Catatan Pengirim (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Transfer via BCA an. Siti Rahma (Kamar A-05)"
                        value={catatanPenghuni}
                        onChange={(e) => setCatatanPenghuni(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-garis bg-latar text-xs text-cokelat-tua focus:outline-none focus:ring-2 focus:ring-marun"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sedangMengunggah}
                      className="tombol-marun w-full text-xs py-3 gap-2 shadow-sm font-semibold"
                    >
                      <CreditCard className="w-4 h-4 text-kuning-mas" />
                      <span>{sedangMengunggah ? 'Mengirim Bukti...' : 'Kirim Bukti Pembayaran'}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="kartu-bento p-8 text-center text-xs text-cokelat-tua/60">
                Tidak ada tagihan aktif untuk akun ini.
              </div>
            )}

            {/* Riwayat Tagihan Semua Periode */}
            <div className="kartu-bento p-6 space-y-4">
              <h3 className="font-bold text-sm text-marun pb-2 border-b border-garis">
                Daftar Riwayat Tagihan Sewa
              </h3>
              <div className="space-y-3">
                {daftarTagihan.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-latar border border-garis flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-cokelat-tua">{t.periode_bulan}</span>
                        <LencanaStatusTagihan status={t.status} />
                      </div>
                      <p className="text-[11px] text-cokelat-tua/70 mt-0.5">
                        Jatuh tempo: {t.jatuh_tempo} • Kamar {t.nomor_kamar}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-marun">
                        {formatMataUang(t.nominal)}
                      </span>
                      {t.status === 'lunas' && (
                        <button
                          type="button"
                          onClick={() => setKuitansiDipilih(t)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-semibold hover:bg-emerald-200 transition-colors"
                        >
                          Kuitansi
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Rekening Resmi Kos & Bantuan */}
          <div className="lg:col-span-4 space-y-6">
            <div className="kartu-bento p-6 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-garis">
                <Building className="w-5 h-5 text-terakota" />
                <h3 className="font-bold text-sm text-marun">Rekening Resmi Pengelola</h3>
              </div>
              <p className="text-xs text-cokelat-tua/75 leading-relaxed">
                Silakan lakukan transfer sewa bulanan ke salah satu nomor rekening pemilik di bawah:
              </p>

              <div className="space-y-3">
                {daftarRekening.map((rek, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-latar border border-garis space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-marun">{rek.nama_bank}</span>
                      <span className="text-[10px] bg-kuning-mas/30 px-2 py-0.5 rounded font-bold text-cokelat-tua">
                        {rek.logo_inisial}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-permukaan p-2 rounded-lg border border-garis">
                      <span className="font-mono text-sm font-extrabold text-cokelat-tua">
                        {rek.nomor_rekening}
                      </span>
                      <button
                        type="button"
                        onClick={() => salinRekening(rek.nomor_rekening, rek.nama_bank)}
                        className="text-terakota hover:text-marun p-1 rounded"
                        title="Salin nomor rekening"
                      >
                        {rekeningTersalin === rek.nama_bank ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-cokelat-tua/70">a.n. {rek.atas_nama}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Pengingat Sewa:
                </p>
                <p>
                  Jatuh tempo setiap <strong>tanggal 1</strong> setiap bulan. Harap simpan dan unggah struk transfer agar dapat diverifikasi tepat waktu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kuitansi Digital (Digital Receipt) */}
      {kuitansiDipilih && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => setKuitansiDipilih(null)}
        >
          <div
            className="relative max-w-lg w-full bg-permukaan rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl border border-garis"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-garis">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-marun text-kuning-mas flex items-center justify-center font-bold text-xs">
                  KA
                </div>
                <div>
                  <h3 className="font-bold text-sm text-marun">Kuitansi Pembayaran Digital</h3>
                  <span className="text-[11px] text-cokelat-tua/60 font-mono">
                    {kuitansiDipilih.id}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setKuitansiDipilih(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-latar"
                aria-label="Tutup kuitansi"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border border-dashed border-garis rounded-xl p-5 space-y-3 text-xs bg-latar/50">
              <div className="flex justify-between">
                <span className="text-cokelat-tua/70">Penyewa:</span>
                <span className="font-bold text-cokelat-tua">{kuitansiDipilih.nama_penghuni}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cokelat-tua/70">Kamar:</span>
                <span className="font-bold text-cokelat-tua">
                  {kuitansiDipilih.nomor_kamar} ({kuitansiDipilih.tipe_kamar})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-cokelat-tua/70">Periode Sewa:</span>
                <span className="font-bold text-cokelat-tua">{kuitansiDipilih.periode_bulan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cokelat-tua/70">Status:</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  LUNAS
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-cokelat-tua/70">Tanggal Verifikasi:</span>
                <span className="font-mono text-cokelat-tua">
                  {formatTanggal(kuitansiDipilih.verified_at)}
                </span>
              </div>
              <div className="pt-2 border-t border-garis flex justify-between items-baseline">
                <span className="font-bold text-sm text-cokelat-tua">Jumlah Dibayar:</span>
                <span className="text-xl font-extrabold text-marun">
                  {formatMataUang(kuitansiDipilih.nominal)}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-center text-cokelat-tua/60 italic">
              Kuitansi ini diterbitkan secara sah oleh sistem manajemen Kos Putri Alhamra dan berlaku sebagai bukti pelunasan sewa.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-garis">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="tombol-garis py-2 px-4 text-xs gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak</span>
              </button>
              <button
                type="button"
                onClick={() => setKuitansiDipilih(null)}
                className="tombol-marun py-2 px-5 text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatTagihan;
