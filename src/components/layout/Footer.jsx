import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import logoAlhamra from '../../assets/logos/logo-alhamra.svg';

export const Footer = () => {
  return (
    <footer className="bg-cokelat-tua text-permukaan/90 pt-16 pb-12 border-t border-marun/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-permukaan/10">
          {/* Kolom 1: Profil Kos */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block py-1">
              <img
                src={logoAlhamra}
                alt="Kos Putri Alhamra"
                className="h-20 sm:h-24 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-permukaan/80 text-sm leading-relaxed max-w-md">
              Rumah kos putri minimalis, unik, bersih, dan nyaman. Menawarkan suasana tenang dan kondusif untuk mahasiswi yang menempuh pendidikan di Pekanbaru.
            </p>
            <div className="flex items-center gap-2 text-xs text-kuning-mas/90 bg-marun/60 w-fit px-3 py-1.5 rounded-lg border border-marun">
              <ShieldCheck className="w-4 h-4 text-kuning-mas" />
              <span>Khusus Putri • Lingkungan Aman & Berkeluarga</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi Tautan */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-kuning-mas tracking-wider uppercase">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm text-permukaan/75">
              <li>
                <a href="#beranda" className="hover:text-kuning-mas transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#kamar" className="hover:text-kuning-mas transition-colors">
                  Tipe Kamar & Harga
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-kuning-mas transition-colors">
                  Fasilitas & Keamanan
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-kuning-mas transition-colors">
                  Peta Lokasi & Kampus
                </a>
              </li>
              <li>
                <a href="#peraturan" className="hover:text-kuning-mas transition-colors">
                  Peraturan & Ketentuan Sewa
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-kuning-mas transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Lokasi */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-kuning-mas tracking-wider uppercase">
              Kontak Pengelola
            </h4>
            <div className="space-y-3 text-sm text-permukaan/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-kuning-mas shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Jl. Buraq, Simpang Baru, Binawidya, Kota Pekanbaru, Riau 28292 (Dekat UNRI, STIFAR, & UIN)
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-kuning-mas shrink-0" />
                <a
                  href="https://wa.me/6281371958826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kuning-mas transition-colors font-medium text-xs"
                >
                  +62 813-7195-8826 (Pak Yusuf)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Baris Hak Cipta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-permukaan/60 gap-4">
          <p>© 2026 Kos Putri Alhamra. Hak cipta website dilindungi.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-terakota fill-terakota" /> untuk kenyamanan mahasiswi Pekanbaru
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
