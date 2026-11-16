import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Akun Demo untuk Pengujian Cepat (Quick Login)
export const AKUN_DEMO = {
  owner: {
    id: 'usr-owner-001',
    nama_lengkap: 'Bapak Yusuf',
    email: 'pemilik@alhamra.id',
    role: 'owner',
    nomor_whatsapp: '+6281371958826',
    token: 'jwt-token-demo-owner-alhamra-2026',
  },
  staff: {
    id: 'usr-staff-002',
    nama_lengkap: 'Pak Joko (Penjaga Kos)',
    email: 'penjaga@alhamra.id',
    role: 'staff',
    nomor_whatsapp: '+6281234567890',
    token: 'jwt-token-demo-staff-alhamra-2026',
  },
  tenant: {
    id: 'usr-tenant-003',
    nama_lengkap: 'Siti Rahma',
    email: 'penghuni@alhamra.id',
    role: 'tenant',
    nomor_whatsapp: '+6289876543210',
    nomor_kamar: 'A-05 (Tipe Sendiri)',
    token: 'jwt-token-demo-tenant-alhamra-2026',
  },
};

export const AuthProvider = ({ children }) => {
  const [pengguna, setPengguna] = useState(null);
  const [token, setToken] = useState(null);
  const [sedangMemuat, setSedangMemuat] = useState(true);

  // Inisialisasi sesi dari penyimpanan lokal
  useEffect(() => {
    try {
      const tokenTersimpan = localStorage.getItem('token_alhamra');
      const dataPenggunaTersimpan = localStorage.getItem('pengguna_alhamra');

      if (tokenTersimpan && dataPenggunaTersimpan) {
        setToken(tokenTersimpan);
        setPengguna(JSON.parse(dataPenggunaTersimpan));
      }
    } catch (galat) {
      console.error('Gagal memuat sesi pengguna:', galat);
      localStorage.removeItem('token_alhamra');
      localStorage.removeItem('pengguna_alhamra');
    } finally {
      setSedangMemuat(false);
    }
  }, []);

  // Fungsi Login Manual
  const login = async (email, kataSandi) => {
    setSedangMemuat(true);
    try {
      // Cek apakah cocok dengan akun demo
      const akunDitemukan = Object.values(AKUN_DEMO).find(
        (akun) => akun.email.toLowerCase() === email.toLowerCase()
      );

      if (akunDitemukan) {
        // Simulasi latensi otentikasi
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.setItem('token_alhamra', akunDitemukan.token);
        localStorage.setItem('pengguna_alhamra', JSON.stringify(akunDitemukan));
        setToken(akunDitemukan.token);
        setPengguna(akunDitemukan);
        return { sukses: true, data: akunDitemukan };
      }

      // Jika bukan akun demo, buat sesi fallback tenant
      const penggunaBaru = {
        id: 'usr-custom-' + Date.now(),
        nama_lengkap: email.split('@')[0],
        email: email,
        role: 'tenant',
        token: 'jwt-token-custom-' + Date.now(),
      };
      localStorage.setItem('token_alhamra', penggunaBaru.token);
      localStorage.setItem('pengguna_alhamra', JSON.stringify(penggunaBaru));
      setToken(penggunaBaru.token);
      setPengguna(penggunaBaru);
      return { sukses: true, data: penggunaBaru };
    } catch (error) {
      return { sukses: false, pesan: error.message || 'Login gagal' };
    } finally {
      setSedangMemuat(false);
    }
  };

  // Fungsi Quick Login untuk pengujian instan
  const quickLogin = async (peran) => {
    setSedangMemuat(true);
    try {
      const dataAkun = AKUN_DEMO[peran];
      if (!dataAkun) {
        throw new Error(`Peran '${peran}' tidak ditemukan dalam akun demo.`);
      }

      // Beri jeda halus untuk simulasi
      await new Promise((resolve) => setTimeout(resolve, 300));

      localStorage.setItem('token_alhamra', dataAkun.token);
      localStorage.setItem('pengguna_alhamra', JSON.stringify(dataAkun));
      setToken(dataAkun.token);
      setPengguna(dataAkun);
      return { sukses: true, data: dataAkun };
    } catch (error) {
      return { sukses: false, pesan: error.message };
    } finally {
      setSedangMemuat(false);
    }
  };

  // Fungsi Logout
  const logout = () => {
    localStorage.removeItem('token_alhamra');
    localStorage.removeItem('pengguna_alhamra');
    setToken(null);
    setPengguna(null);
  };

  // Pengecekan Peran
  const apakahPeran = (peranDiizinkan) => {
    if (!pengguna || !pengguna.role) return false;
    if (Array.isArray(peranDiizinkan)) {
      return peranDiizinkan.includes(pengguna.role);
    }
    return pengguna.role === peranDiizinkan;
  };

  const nilai = {
    pengguna,
    token,
    sedangMemuat,
    sudahLogin: Boolean(token && pengguna),
    login,
    quickLogin,
    logout,
    apakahPeran,
  };

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const konteks = useContext(AuthContext);
  if (!konteks) {
    throw new Error('useAuth harus digunakan di dalam AuthProvider');
  }
  return konteks;
};

export default AuthContext;
