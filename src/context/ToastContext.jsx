import React, { createContext, useContext, useState, useCallback } from 'react';
import ToastNotification from '../components/feedback/ToastNotification';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [daftarToast, setDaftarToast] = useState([]);

  const hapusToast = useCallback((id) => {
    setDaftarToast((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const tampilkanToast = useCallback(
    (pesan, tipe = 'sukses', durasiMs = 4000) => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
      setDaftarToast((prev) => [...prev, { id, pesan, tipe }]);

      if (durasiMs > 0) {
        setTimeout(() => {
          hapusToast(id);
        }, durasiMs);
      }
    },
    [hapusToast]
  );

  return (
    <ToastContext.Provider value={{ tampilkanToast, hapusToast }}>
      {children}
      <ToastNotification toasts={daftarToast} onTutup={hapusToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast harus digunakan di dalam ToastProvider');
  }
  return context;
};

export default ToastContext;
