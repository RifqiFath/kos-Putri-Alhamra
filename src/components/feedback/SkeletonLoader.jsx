import React from 'react';

/**
 * Komponen SkeletonLoader untuk efek loading berdenyut (pulse).
 * Mendukung varian: baris teks, kartu bento, lingkaran, atau kustom.
 */
export const SkeletonLoader = ({
  varian = 'persegi', // 'teks' | 'lingkaran' | 'persegi' | 'kartu'
  lebar = 'w-full',
  tinggi = 'h-5',
  jumlah = 1,
  className = '',
}) => {
  const deretan = Array.from({ length: jumlah });

  if (varian === 'lingkaran') {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded-full shrink-0 ${lebar} ${tinggi} ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (varian === 'kartu') {
    return (
      <div
        className={`animate-pulse bg-permukaan border border-garis rounded-2xl p-5 shadow-sm space-y-4 ${className}`}
        aria-hidden="true"
      >
        <div className="bg-gray-200 h-40 w-full rounded-xl" />
        <div className="space-y-2">
          <div className="bg-gray-200 h-5 w-3/4 rounded-md" />
          <div className="bg-gray-200 h-4 w-1/2 rounded-md" />
        </div>
        <div className="pt-2 flex justify-between items-center">
          <div className="bg-gray-200 h-6 w-24 rounded-md" />
          <div className="bg-gray-200 h-8 w-20 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 w-full" aria-hidden="true">
      {deretan.map((_, indeks) => (
        <div
          key={indeks}
          className={`animate-pulse bg-gray-200 rounded-md ${lebar} ${tinggi} ${className}`}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
