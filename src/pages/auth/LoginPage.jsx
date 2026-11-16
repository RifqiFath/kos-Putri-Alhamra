import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LogIn, KeyRound, Mail, ShieldAlert, ArrowLeft, UserCheck, Wrench, Building } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [sedangMemproses, setSedangMemproses] = useState(false);

  const { login, quickLogin, sudahLogin, pengguna } = useAuth();
  const { tampilkanToast } = useToast();
  const navigate = useNavigate();
  const lokasi = useLocation();

  const ruteAsal = lokasi.state?.dari?.pathname;

  // Arahkan ke dasbor yang sesuai peran
  const arahkanSesuaiPeran = (peran) => {
    if (ruteAsal) {
      navigate(ruteAsal, { replace: true });
      return;
    }
    if (peran === 'owner') navigate('/pemilik', { replace: true });
    else if (peran === 'staff') navigate('/penjaga', { replace: true });
    else navigate('/penghuni', { replace: true });
  };

  const tanganiSubmitManual = async (e) => {
    e.preventDefault();
    if (!email || !kataSandi) {
      tampilkanToast('Mohon lengkapi email dan kata sandi.', 'peringatan');
      return;
    }

    setSedangMemproses(true);
    const hasil = await login(email, kataSandi);
    setSedangMemproses(false);

    if (hasil.sukses) {
      tampilkanToast(`Selamat datang kembali, ${hasil.data.nama_lengkap}!`, 'sukses');
      arahkanSesuaiPeran(hasil.data.role);
    } else {
      tampilkanToast(hasil.pesan || 'Gagal masuk akun. Periksa kembali kredensial.', 'galat');
    }
  };

  const tanganiQuickLogin = async (peran) => {
    setSedangMemproses(true);
    const hasil = await quickLogin(peran);
    setSedangMemproses(false);

    if (hasil.sukses) {
      tampilkanToast(`Quick Login Berhasil: Masuk sebagai ${hasil.data.nama_lengkap}`, 'sukses');
      arahkanSesuaiPeran(hasil.data.role);
    } else {
      tampilkanToast(hasil.pesan || 'Gagal Quick Login.', 'galat');
    }
  };

  return (
    <div className="min-h-screen bg-latar flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Tombol Kembali */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cokelat-tua/75 hover:text-marun mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Header Login */}
        <div className="text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-marun text-kuning-mas font-bold text-2xl flex items-center justify-center shadow-md">
            KA
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-marun">
            Portal Kos Putri Alhamra
          </h1>
          <p className="mt-1.5 text-sm text-cokelat-tua/80">
            Masuk untuk mengakses layanan operasional & keuangan kos
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="kartu-bento p-6 sm:p-8 space-y-6">
          {/* Fitur Quick Login untuk Penilai / Pengujian Cepat */}
          <section aria-labelledby="judul-quick-login" className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-garis">
              <span id="judul-quick-login" className="text-xs font-bold uppercase tracking-wider text-terakota">
                Akses Demo Cepat (Quick Login)
              </span>
              <span className="text-[11px] bg-kuning-mas/30 text-cokelat-tua px-2 py-0.5 rounded-full font-medium">
                Satu Klik
              </span>
            </div>
            <p className="text-xs text-cokelat-tua/70 leading-relaxed">
              Gunakan tombol di bawah untuk langsung mencoba aplikasi tanpa mengetik kredensial:
            </p>
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <button
                type="button"
                disabled={sedangMemproses}
                onClick={() => tanganiQuickLogin('owner')}
                className="flex items-center justify-between p-3 rounded-xl border border-garis hover:border-marun bg-latar hover:bg-permukaan text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-marun text-kuning-mas flex items-center justify-center font-bold">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-marun group-hover:text-marun">
                      Pemilik (Owner)
                    </p>
                    <p className="text-[11px] text-cokelat-tua/70">
                      Bapak Yusuf • Dasbor Keuangan & Analisis
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-terakota group-hover:translate-x-0.5 transition-transform">
                  Pilih &rarr;
                </span>
              </button>

              <button
                type="button"
                disabled={sedangMemproses}
                onClick={() => tanganiQuickLogin('staff')}
                className="flex items-center justify-between p-3 rounded-xl border border-garis hover:border-marun bg-latar hover:bg-permukaan text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-terakota text-permukaan flex items-center justify-center font-bold">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-marun group-hover:text-marun">
                      Penjaga (Staff)
                    </p>
                    <p className="text-[11px] text-cokelat-tua/70">
                      Pak Joko • Pemantauan Perbaikan & Tiket
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-terakota group-hover:translate-x-0.5 transition-transform">
                  Pilih &rarr;
                </span>
              </button>

              <button
                type="button"
                disabled={sedangMemproses}
                onClick={() => tanganiQuickLogin('tenant')}
                className="flex items-center justify-between p-3 rounded-xl border border-garis hover:border-marun bg-latar hover:bg-permukaan text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-kuning-mas text-cokelat-tua flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-marun group-hover:text-marun">
                      Penghuni (Tenant)
                    </p>
                    <p className="text-[11px] text-cokelat-tua/70">
                      Siti Rahma • Lapor Rusak & Bukti Bayar
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-terakota group-hover:translate-x-0.5 transition-transform">
                  Pilih &rarr;
                </span>
              </button>
            </div>
          </section>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-garis" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-permukaan px-2 text-cokelat-tua/60 font-medium">
                Atau masuk dengan kredensial
              </span>
            </div>
          </div>

          {/* Form Login Manual */}
          <form onSubmit={tanganiSubmitManual} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-cokelat-tua uppercase tracking-wider mb-1"
              >
                Alamat Email
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="contoh: pemilik@alhamra.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marun focus:bg-permukaan transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="kataSandi"
                className="block text-xs font-bold text-cokelat-tua uppercase tracking-wider mb-1"
              >
                Kata Sandi
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="kataSandi"
                  name="kataSandi"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={kataSandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  className="block w-full pl-10 pr-3.5 py-3 rounded-xl border border-garis bg-latar text-sm text-cokelat-tua placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-marun focus:bg-permukaan transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sedangMemproses}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm bg-marun text-permukaan hover:bg-marun/90 shadow-sm transition-all disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{sedangMemproses ? 'Memeriksa...' : 'Masuk ke Sistem'}</span>
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-cokelat-tua/60">
          Butuh bantuan masuk akun? Hubungi pengelola di{' '}
          <a
            href="https://wa.me/6281371958826"
            target="_blank"
            rel="noopener noreferrer"
            className="text-marun font-semibold underline"
          >
            WhatsApp Pengelola
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
