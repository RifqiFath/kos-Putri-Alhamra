import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SkeletonLoader from '../components/feedback/SkeletonLoader';

/**
 * Pelindung rute berdasarkan status login dan hak akses peran (RBAC).
 */
export const ProtectedRoute = ({ peranDiizinkan, children }) => {
  const { pengguna, sudahLogin, sedangMemuat } = useAuth();
  const lokasi = useLocation();

  if (sedangMemuat) {
    return (
      <div className="min-h-screen bg-latar flex flex-col items-center justify-center p-6 space-y-4">
        <SkeletonLoader varian="lingkaran" lebar="w-16" tinggi="h-16" />
        <SkeletonLoader lebar="w-48" tinggi="h-5" />
        <SkeletonLoader lebar="w-32" tinggi="h-4" />
      </div>
    );
  }

  // Jika belum login, alihkan ke halaman login dengan menyimpan lokasi asal
  if (!sudahLogin) {
    return <Navigate to="/login" state={{ dari: lokasi }} replace />;
  }

  // Jika peran tertentu dibatasi dan pengguna tidak memiliki hak akses
  if (peranDiizinkan && !peranDiizinkan.includes(pengguna?.role)) {
    // Alihkan ke dasbor yang sesuai peran mereka
    let ruteTujuan = '/login';
    if (pengguna?.role === 'owner') ruteTujuan = '/pemilik';
    else if (pengguna?.role === 'staff') ruteTujuan = '/penjaga';
    else if (pengguna?.role === 'tenant') ruteTujuan = '/penghuni';

    return <Navigate to={ruteTujuan} replace />;
  }

  return children;
};

export default ProtectedRoute;
