import React from 'react';
import {
  Clock,
  Wrench,
  CheckCircle2,
  AlertOctagon,
  AlertTriangle,
  Info,
  Droplets,
  Zap,
  Armchair,
  Sparkles,
} from 'lucide-react';

/**
 * Lencana Status Tiket (MENUNGGU, DIPROSES, SELESAI)
 */
export const LencanaStatus = ({ status }) => {
  const s = (status || '').toLowerCase();

  if (s === 'selesai') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>SELESAI</span>
      </span>
    );
  }

  if (s === 'diproses') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
        <Wrench className="w-3.5 h-3.5 text-blue-600 animate-spin" />
        <span>DIPROSES</span>
      </span>
    );
  }

  // Default: Menunggu
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
      <Clock className="w-3.5 h-3.5 text-amber-600" />
      <span>MENUNGGU</span>
    </span>
  );
};

/**
 * Lencana Tingkat Urgensi AI (TINGGI, SEDANG, RENDAH)
 */
export const LencanaUrgensi = ({ urgensi, skor }) => {
  const u = (urgensi || '').toLowerCase();

  if (u === 'tinggi') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
        <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
        <span>URGENSI TINGGI</span>
        {skor !== undefined && <span className="opacity-75">({skor})</span>}
      </span>
    );
  }

  if (u === 'sedang') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span>URGENSI SEDANG</span>
        {skor !== undefined && <span className="opacity-75">({skor})</span>}
      </span>
    );
  }

  // Default: Rendah
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-300">
      <Info className="w-3.5 h-3.5 text-emerald-600" />
      <span>URGENSI RENDAH</span>
      {skor !== undefined && <span className="opacity-75">({skor})</span>}
    </span>
  );
};

/**
 * Lencana Kategori AI
 */
export const LencanaKategori = ({ kategori }) => {
  const k = (kategori || '').toLowerCase();

  if (k === 'plumbing') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
        <Droplets className="w-3.5 h-3.5 text-sky-600" />
        <span>Plumbing / Pipa Air</span>
      </span>
    );
  }

  if (k === 'listrik') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
        <Zap className="w-3.5 h-3.5 text-amber-600" />
        <span>Kelistrikan</span>
      </span>
    );
  }

  if (k === 'kebersihan') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
        <span>Kebersihan Area</span>
      </span>
    );
  }

  // Default: Furnitur
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-marun bg-latar px-2 py-0.5 rounded border border-garis">
      <Armchair className="w-3.5 h-3.5 text-terakota" />
      <span>Furnitur & Fasilitas</span>
    </span>
  );
};

export default {
  LencanaStatus,
  LencanaUrgensi,
  LencanaKategori,
};
