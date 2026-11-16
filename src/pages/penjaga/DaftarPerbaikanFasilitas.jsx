import React from 'react';
import DaftarTiketKerusakan from '../../components/cards/DaftarTiketKerusakan';
import { useAuth } from '../../context/AuthContext';

export const DaftarPerbaikanFasilitas = () => {
  const { pengguna } = useAuth();

  return (
    <div className="space-y-6">
      {/* <!-- dikerjakan oleh Syifa 'Alin Anufy (Modul Pemantauan & Perbaikan Fasilitas) --> */}
      <DaftarTiketKerusakan
        peranPengguna={pengguna?.role || 'staff'}
        judulBagian="Manajemen & Riwayat Perbaikan Fasilitas Kos"
      />
    </div>
  );
};

export default DaftarPerbaikanFasilitas;
