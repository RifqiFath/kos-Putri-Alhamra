import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

/**
 * Komponen ToastNotification untuk menampilkan notifikasi mengambang di pojok kanan atas.
 */
export const ToastNotification = ({ toasts = [], onTutup }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const { id, tipe = 'sukses', pesan } = toast;

        let warnaBg = 'bg-permukaan border-emerald-300 text-emerald-900';
        let Ikon = CheckCircle2;
        let warnaIkon = 'text-emerald-600';

        if (tipe === 'galat' || tipe === 'error') {
          warnaBg = 'bg-permukaan border-rose-300 text-rose-900';
          Ikon = XCircle;
          warnaIkon = 'text-rose-600';
        } else if (tipe === 'peringatan' || tipe === 'warning') {
          warnaBg = 'bg-permukaan border-amber-300 text-amber-900';
          Ikon = AlertTriangle;
          warnaIkon = 'text-amber-600';
        } else if (tipe === 'info') {
          warnaBg = 'bg-permukaan border-blue-300 text-blue-900';
          Ikon = Info;
          warnaIkon = 'text-blue-600';
        }

        return (
          <div
            key={id}
            role="alert"
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg ${warnaBg} animate-slideIn transition-all`}
          >
            <Ikon className={`w-5 h-5 shrink-0 mt-0.5 ${warnaIkon}`} />
            <div className="flex-1 text-sm font-medium leading-relaxed">
              {pesan}
            </div>
            {onTutup && (
              <button
                type="button"
                onClick={() => onTutup(id)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded"
                aria-label="Tutup notifikasi"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ToastNotification;
