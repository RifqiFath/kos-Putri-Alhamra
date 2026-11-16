import React from 'react';
import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  AlertOctagon,
  Calendar,
} from 'lucide-react';

/**
 * Lencana Status Pembayaran Tagihan
 */
export const LencanaStatusTagihan = ({ status }) => {
  const s = (status || '').toLowerCase();

  if (s === 'lunas') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>LUNAS</span>
      </span>
    );
  }

  if (s === 'menunggu_verifikasi') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
        <Clock className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
        <span>MENUNGGU VERIFIKASI</span>
      </span>
    );
  }

  if (s === 'ditolak') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
        <XCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>DITOLAK</span>
      </span>
    );
  }

  // Default: Belum Bayar
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
      <span>BELUM BAYAR</span>
    </span>
  );
};

/**
 * Lencana Pengingat Jatuh Tempo (Due Date Countdown)
 */
export const LencanaPengingatJatuhTempo = ({ pengingat }) => {
  if (!pengingat) return null;

  if (pengingat.status_waktu === 'lunas') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Sewa Lunas</span>
      </span>
    );
  }

  if (pengingat.status_waktu === 'terlambat') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
        <AlertOctagon className="w-3 h-3 text-rose-600" />
        <span>{pengingat.teks_pengingat}</span>
      </span>
    );
  }

  if (pengingat.status_waktu === 'hari_ini') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
        <Clock className="w-3 h-3 text-amber-700" />
        <span>{pengingat.teks_pengingat}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
      <Calendar className="w-3 h-3 text-blue-600" />
      <span>{pengingat.teks_pengingat}</span>
    </span>
  );
};

export default {
  LencanaStatusTagihan,
  LencanaPengingatJatuhTempo,
};
