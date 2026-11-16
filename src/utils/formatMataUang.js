/**
 * Utilitas untuk memformat angka nominal ke mata uang Rupiah (IDR).
 * @param {number|string} nominal - Angka yang akan diformat.
 * @returns {string} Contoh: "Rp700.000"
 */
export const formatMataUang = (nominal) => {
  const angka = Number(nominal) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka).replace(/\s+/g, '');
};

export default formatMataUang;
