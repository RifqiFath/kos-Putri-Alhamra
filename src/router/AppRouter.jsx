import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Guard
import ProtectedRoute from './ProtectedRoute';

// Halaman Publik & Auth
import LandingPage from '../pages/publik/LandingPage';
import HalamanKatalogKamar from '../pages/publik/HalamanKatalogKamar';
import LoginPage from '../pages/auth/LoginPage';

// Halaman Dasbor Penghuni (Tenant)
import DasborPenghuni from '../pages/penghuni/DasborPenghuni';
import FormLaporKerusakan from '../pages/penghuni/FormLaporKerusakan';
import RiwayatTagihan from '../pages/penghuni/RiwayatTagihan';

// Halaman Dasbor Penjaga (Staff)
import DasborPenjaga from '../pages/penjaga/DasborPenjaga';
import DaftarPerbaikanFasilitas from '../pages/penjaga/DaftarPerbaikanFasilitas';

// Halaman Dasbor Pemilik (Owner)
import DasborPemilik from '../pages/pemilik/DasborPemilik';
import ManajemenKeuangan from '../pages/pemilik/ManajemenKeuangan';
import VerifikasiPembayaran from '../pages/pemilik/VerifikasiPembayaran';
import AnalitikPrediksiChurn from '../pages/pemilik/AnalitikPrediksiChurn';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/kamar" element={<HalamanKatalogKamar />} />
      </Route>

      {/* Rute Autentikasi */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rute Terproteksi: Penghuni (Tenant) */}
      <Route
        path="/penghuni"
        element={
          <ProtectedRoute peranDiizinkan={['tenant', 'staff', 'owner']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DasborPenghuni />} />
        <Route path="lapor-kerusakan" element={<FormLaporKerusakan />} />
        <Route path="tagihan" element={<RiwayatTagihan />} />
      </Route>

      {/* Rute Terproteksi: Penjaga (Staff) */}
      <Route
        path="/penjaga"
        element={
          <ProtectedRoute peranDiizinkan={['staff', 'owner']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DasborPenjaga />} />
        <Route path="perbaikan" element={<DaftarPerbaikanFasilitas />} />
        <Route path="lapor-kerusakan" element={<FormLaporKerusakan />} />
      </Route>

      {/* Rute Terproteksi: Pemilik (Owner) */}
      <Route
        path="/pemilik"
        element={
          <ProtectedRoute peranDiizinkan={['owner']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DasborPemilik />} />
        <Route path="keuangan" element={<ManajemenKeuangan />} />
        <Route path="verifikasi" element={<VerifikasiPembayaran />} />
        <Route path="prediksi-churn" element={<AnalitikPrediksiChurn />} />
      </Route>

      {/* Fallback ke beranda */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
