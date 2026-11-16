import axios from 'axios';

// Konfigurasi dasar Axios client
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor permintaan: selipkan JWT token jika tersedia di penyimpanan lokal
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token_alhamra');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor respon: standarisasi penanganan galat
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const pesanGalat =
      error.response?.data?.pesan ||
      error.response?.data?.message ||
      'Terjadi kendala pada jaringan server. Silakan coba kembali.';
    return Promise.reject(new Error(pesanGalat));
  }
);

export default api;
