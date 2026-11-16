import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Bed, ShieldCheck, MapPin, HelpCircle, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoAlhamra from '../../assets/logos/logo-alhamra.svg';

export const NavbarUtama = () => {
  const [bukaMenuMobile, setBukaMenuMobile] = useState(false);
  const lokasi = useLocation();
  const { pengguna, sudahLogin } = useAuth();

  const daftarMenu = [
    { label: 'Beranda', href: '#beranda', ikon: Home },
    { label: 'Tipe Kamar', href: '#kamar', ikon: Bed },
    { label: 'Fasilitas', href: '#fasilitas', ikon: ShieldCheck },
    { label: 'Lokasi', href: '#lokasi', ikon: MapPin },
    { label: 'Peraturan', href: '#peraturan', ikon: ShieldCheck },
    { label: 'FAQ', href: '#faq', ikon: HelpCircle },
  ];

  // Penentuan tautan Dasbor sesuai peran jika sudah login
  const dapatkanRuteDasbor = () => {
    if (!pengguna) return '/login';
    if (pengguna.role === 'owner') return '/pemilik';
    if (pengguna.role === 'staff') return '/penjaga';
    return '/penghuni';
  };

  const tutupMenu = () => setBukaMenuMobile(false);

  return (
    <header className="sticky top-0 z-40 bg-permukaan/90 backdrop-blur-md border-b border-garis transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Resmi Kos Putri Alhamra */}
          <Link
            to="/"
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-kuning-mas rounded-lg"
          >
            <img
              src={logoAlhamra}
              alt="Kos Putri Alhamra"
              className="h-16 w-auto max-h-[72px] object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Navigasi Desktop */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Navigasi Utama">
            {daftarMenu.map((menu) => (
              <a
                key={menu.label}
                href={menu.href}
                className="px-3.5 py-2 text-sm font-medium text-cokelat-tua/80 hover:text-marun hover:bg-latar rounded-lg transition-colors"
              >
                {menu.label}
              </a>
            ))}
          </nav>

          {/* Tombol Masuk / Dasbor Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {sudahLogin ? (
              <Link
                to={dapatkanRuteDasbor()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-marun text-permukaan text-sm font-semibold hover:bg-marun/90 shadow-sm transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-kuning-mas" />
                <span>Dasbor {pengguna.role === 'owner' ? 'Pemilik' : pengguna.role === 'staff' ? 'Penjaga' : 'Penghuni'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-garis text-marun text-sm font-semibold hover:bg-latar hover:border-marun/30 shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk Portal</span>
              </Link>
            )}
          </div>

          {/* Tombol Hamburger Mobile */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setBukaMenuMobile(!bukaMenuMobile)}
              className="p-2.5 rounded-xl text-cokelat-tua hover:text-marun hover:bg-latar focus:outline-none focus:ring-2 focus:ring-kuning-mas"
              aria-label={bukaMenuMobile ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {bukaMenuMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      {bukaMenuMobile && (
        <div className="md:hidden border-b border-garis bg-permukaan px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {daftarMenu.map((menu) => {
            const Ikon = menu.ikon;
            return (
              <a
                key={menu.label}
                href={menu.href}
                onClick={tutupMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-cokelat-tua hover:bg-latar hover:text-marun transition-colors"
              >
                <Ikon className="w-5 h-5 text-terakota" />
                <span>{menu.label}</span>
              </a>
            );
          })}
          <div className="pt-4 border-t border-garis">
            {sudahLogin ? (
              <Link
                to={dapatkanRuteDasbor()}
                onClick={tutupMenu}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-marun text-permukaan font-semibold shadow-sm"
              >
                <LayoutDashboard className="w-5 h-5 text-kuning-mas" />
                <span>Dasbor {pengguna.role === 'owner' ? 'Pemilik' : pengguna.role === 'staff' ? 'Penjaga' : 'Penghuni'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={tutupMenu}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-latar border border-garis text-marun font-semibold shadow-sm"
              >
                <LogIn className="w-5 h-5" />
                <span>Masuk Portal Kos</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarUtama;
