/**
 * Utilitas format tanggal ramah Bahasa Indonesia
 * @param {string|Date} tanggalInput
 * @returns {string} Contoh: "16 Nov 2026, 14:30 WIB"
 */
export const formatTanggal = (tanggalInput) => {
  if (!tanggalInput) return '-';
  try {
    const d = new Date(tanggalInput);
    if (isNaN(d.getTime())) return '-';

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d) + ' WIB';
  } catch (error) {
    return String(tanggalInput);
  }
};

export default formatTanggal;
