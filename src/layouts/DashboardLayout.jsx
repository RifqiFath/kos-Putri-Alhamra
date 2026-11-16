import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  CheckCircle,
  TrendingUp,
  Wrench,
  FileText,
  CreditCard,
  LogOut,
  Home,
  Menu,
  X,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import WidgetChatbot from '../components/common/WidgetChatbot';
import logoAlhamra from '../assets/logos/logo-alhamra.svg';

export const DashboardLayout = () => {
  const { pengguna, logout } = useAuth();
  const { tampilkanToast } = useToast();
  const navigate = useNavigate();
  const lokasi = useLocation();
  const [bukaSidebarMobile, setBukaSidebarMobile] = useState(false);

  const tanganiLogout = () => {
    logout();
    tampilkanToast('Kamu berhasil keluar dari sistem.', 'info');
    navigate('/');
  };

  // Navigasi berdasarkan peran
  const dapatkanMenuPeran = () => {
    if (pengguna?.role === 'owner') {
      return [
        { label: 'Ringkasan Bisnis', path: '/pemilik', ikon: LayoutDashboard },
        { label: 'Manajemen Keuangan', path: '/pemilik/keuangan', ikon: Wallet },
        { label: 'Verifikasi Pembayaran', path: '/pemilik/verifikasi', ikon: CheckCircle },
        { label: 'Prediksi Retensi AI', path: '/pemilik/prediksi-churn', ikon: TrendingUp },
      ];
    }
    if (pengguna?.role === 'staff') {
      return [
        { label: 'Dasbor Tugas', path: '/penjaga', ikon: LayoutDashboard },
        { label: 'Perbaikan Fasilitas', path: '/penjaga/perbaikan', ikon: Wrench },
        { label: 'Catat Kerusakan Baru', path: '/penjaga/lapor-kerusakan', ikon: FileText },
      ];
    }
    // Default: tenant
    return [
      { label: 'Status Kamar & Sewa', path: '/penghuni', ikon: LayoutDashboard },
      { label: 'Lapor Kerusakan', path: '/penghuni/lapor-kerusakan', ikon: FileText },
      { label: 'Tagihan & Pembayaran', path: '/penghuni/tagihan', ikon: CreditCard },
    ];
  };

  const menuAktif = dapatkanMenuPeran();
  const labelPeran =
    pengguna?.role === 'owner'
      ? 'Pemilik Kos'
      : pengguna?.role === 'staff'
      ? 'Penjaga Kos'
      : 'Penghuni Kos';

  return (
    <div className="min-h-screen bg-latar flex flex-col md:flex-row text-cokelat-tua">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-permukaan border-r border-garis shrink-0 min-h-screen p-6">
        {/* Brand */}
        <Link to="/" className="flex items-center pb-6 border-b border-garis">
          <img
            src={logoAlhamra}
            alt="Kos Putri Alhamra"
            className="h-20 sm:h-22 w-auto max-h-[88px] object-contain"
          />
        </Link>

        {/* Profil Mini */}
        <div className="my-6 p-4 rounded-xl bg-latar border border-garis flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-kuning-mas/30 text-marun flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-sm truncate text-cokelat-tua">
              {pengguna?.nama_lengkap || 'Pengguna Demo'}
            </p>
            <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-marun text-permukaan font-medium mt-0.5">
              {labelPeran}
            </span>
          </div>
        </div>

        {/* Daftar Navigasi */}
        <nav className="flex-1 space-y-1.5" aria-label="Menu Dasbor">
          {menuAktif.map((item) => {
            const Ikon = item.ikon;
            const aktif = lokasi.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  aktif
                    ? 'bg-marun text-permukaan shadow-sm'
                    : 'text-cokelat-tua/75 hover:bg-latar hover:text-marun'
                }`}
              >
                <Ikon className={`w-5 h-5 ${aktif ? 'text-kuning-mas' : 'text-terakota'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bawah Sidebar */}
        <div className="pt-6 border-t border-garis space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-cokelat-tua/70 hover:bg-latar hover:text-marun transition-colors"
          >
            <Home className="w-4 h-4 text-terakota" />
            <span>Halaman Publik</span>
          </Link>
          <button
            type="button"
            onClick={tanganiLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun</span>
          </button>
        </div>
      </aside>

      {/* Header Mobile */}
      <div className="md:hidden bg-permukaan border-b border-garis px-4 py-2.5 flex items-center justify-between sticky top-0 z-30">
        <Link to="/" className="flex items-center">
          <img
            src={logoAlhamra}
            alt="Kos Putri Alhamra"
            className="h-14 w-auto object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={() => setBukaSidebarMobile(!bukaSidebarMobile)}
          className="p-2 rounded-lg text-cokelat-tua hover:bg-latar"
          aria-label="Buka menu navigasi dasbor"
        >
          {bukaSidebarMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {bukaSidebarMobile && (
        <div className="md:hidden bg-permukaan border-b border-garis p-4 space-y-2">
          <div className="pb-3 mb-2 border-b border-garis">
            <p className="font-semibold text-sm text-cokelat-tua">{pengguna?.nama_lengkap}</p>
            <p className="text-xs text-terakota">{labelPeran}</p>
          </div>
          {menuAktif.map((item) => {
            const Ikon = item.ikon;
            const aktif = lokasi.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setBukaSidebarMobile(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  aktif ? 'bg-marun text-permukaan' : 'text-cokelat-tua hover:bg-latar'
                }`}
              >
                <Ikon className="w-4 h-4 text-kuning-mas" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-garis flex justify-between">
            <Link
              to="/"
              onClick={() => setBukaSidebarMobile(false)}
              className="text-xs text-cokelat-tua/80 hover:text-marun flex items-center gap-1.5"
            >
              <Home className="w-4 h-4" /> Beranda
            </Link>
            <button
              type="button"
              onClick={tanganiLogout}
              className="text-xs text-rose-700 font-semibold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>
      )}

      {/* Area Konten Utama */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <WidgetChatbot />
    </div>
  );
};

export default DashboardLayout;
