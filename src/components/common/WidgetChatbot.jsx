import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  ambilPertanyaanCepat,
  prosesPesanChatbot,
} from '../../services/chatService';

export const WidgetChatbot = () => {
  const [bukaChat, setBukaChat] = useState(false);
  const [inputTeks, setInputTeks] = useState('');
  const [sedangMengetik, setSedangMengetik] = useState(false);
  const [pertanyaanCepat, setPertanyaanCepat] = useState([]);
  const [riwayatPesan, setRiwayatPesan] = useState([
    {
      id: 'sambutan-awal',
      pengirim: 'bot',
      waktu: 'Sekarang',
      teks: 'Halo! Aku Asisten Virtual Kos Putri Alhamra. Ada yang bisa kubantu seputar info kamar, harga sewa, fasilitas, atau aturan kos?',
      tautan_aksi: null,
    },
  ]);

  const wadahPesanRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setPertanyaanCepat(ambilPertanyaanCepat());
  }, []);

  // Auto scroll ke pesan paling bawah saat riwayat bertambah atau bot mengetik
  useEffect(() => {
    if (bukaChat && wadahPesanRef.current) {
      wadahPesanRef.current.scrollTo({
        top: wadahPesanRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [riwayatPesan, sedangMengetik, bukaChat]);

  // Fokus input otomatis saat chat dibuka
  useEffect(() => {
    if (bukaChat && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [bukaChat]);

  const formatWaktuSekarang = () => {
    return new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const tanganiKirimPesan = async (teksKirim) => {
    const teksBersih = (teksKirim || inputTeks).trim();
    if (!teksBersih || sedangMengetik) return;

    const pesanPengguna = {
      id: `user-${Date.now()}`,
      pengirim: 'user',
      waktu: formatWaktuSekarang(),
      teks: teksBersih,
    };

    setRiwayatPesan((prev) => [...prev, pesanPengguna]);
    setInputTeks('');
    setSedangMengetik(true);

    try {
      const balasanBot = await prosesPesanChatbot(teksBersih);
      setRiwayatPesan((prev) => [...prev, balasanBot]);
    } catch (err) {
      setRiwayatPesan((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          pengirim: 'bot',
          waktu: formatWaktuSekarang(),
          teks: 'Mohon maaf, terjadi gangguan jaringan saat memproses pertanyaanmu. Silakan coba lagi atau hubungi Pak Yusuf via WhatsApp ya!',
          tautan_aksi: {
            tipe: 'whatsapp',
            label: 'Chat WhatsApp Pak Yusuf',
            url: 'https://wa.me/6281371958826',
          },
        },
      ]);
    } finally {
      setSedangMengetik(false);
    }
  };

  const tanganiSubmitForm = (e) => {
    e.preventDefault();
    tanganiKirimPesan();
  };

  const tanganiResetChat = () => {
    setRiwayatPesan([
      {
        id: `sambutan-${Date.now()}`,
        pengirim: 'bot',
        waktu: formatWaktuSekarang(),
        teks: 'Percakapan telah diatur ulang. Ada yang ingin kamu tanyakan tentang Kos Putri Alhamra?',
        tautan_aksi: null,
      },
    ]);
  };

  return (
    <aside aria-label="Asisten Chat Virtual Kos Putri Alhamra">
      {/* Tombol Pemicu Mengambang (Floating Action Button) */}
      {!bukaChat && (
        <button
          type="button"
          onClick={() => setBukaChat(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-marun hover:bg-terakota text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-kuning-mas/60 focus:outline-none focus:ring-4 focus:ring-kuning-mas/30 group"
          aria-expanded={bukaChat}
          aria-label="Buka Asisten Chatbot Virtual"
        >
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-kuning-mas animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:inline-block">
            Tanya Asisten AI
          </span>
        </button>
      )}

      {/* Jendela Obrolan (Chat Window Bento) */}
      {bukaChat && (
        <div
          role="dialog"
          aria-label="Jendela Percakapan Asisten AI"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] h-[580px] bg-permukaan border border-garis rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn"
        >
          {/* Header Chat Window */}
          <header className="bg-gradient-to-r from-marun to-cokelat-tua text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-white/10 border border-kuning-mas/40 flex items-center justify-center text-kuning-mas shadow-inner">
                <Bot className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-marun"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-wide text-white">
                    Asisten Alhamra
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-kuning-mas/20 text-kuning-mas border border-kuning-mas/30">
                    AI RAG
                  </span>
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Siap membantu informasi kos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                type="button"
                onClick={tanganiResetChat}
                title="Atur Ulang Obrolan"
                className="p-1.5 hover:bg-white/15 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-kuning-mas"
                aria-label="Atur ulang obrolan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setBukaChat(false)}
                title="Tutup Jendela Chat"
                className="p-1.5 hover:bg-white/15 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-kuning-mas"
                aria-label="Tutup jendela chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Area Percakapan Pesan */}
          <div
            ref={wadahPesanRef}
            tabIndex={0}
            aria-label="Riwayat Percakapan Chat"
            className="flex-1 p-4 overflow-y-auto space-y-4 bg-latar/50 text-xs sm:text-sm"
          >
            {/* Banner Keamanan */}
            <div className="p-2.5 rounded-xl bg-kuning-mas/15 border border-kuning-mas/30 text-[11px] text-cokelat-tua flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-terakota shrink-0" />
              <span>
                Informasi disinkronkan langsung dari panduan resmi Kos Putri Alhamra Pekanbaru.
              </span>
            </div>

            {/* Daftar Balon Pesan */}
            {riwayatPesan.map((pesan) => {
              const apakahUser = pesan.pengirim === 'user';
              return (
                <div
                  key={pesan.id}
                  className={`flex flex-col ${apakahUser ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed whitespace-pre-line ${
                      apakahUser
                        ? 'bg-marun text-white rounded-tr-none'
                        : 'bg-white border border-garis text-cokelat-tua rounded-tl-none'
                    }`}
                  >
                    {pesan.teks}

                    {/* Tautan Aksi Cepat / Redirect Link */}
                    {pesan.tautan_aksi && (
                      <div className="mt-3 pt-2.5 border-t border-garis/60">
                        {pesan.tautan_aksi.tipe === 'internal' ? (
                          <Link
                            to={pesan.tautan_aksi.url}
                            onClick={() => setBukaChat(false)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-marun hover:text-terakota bg-kuning-mas/30 hover:bg-kuning-mas/50 px-3 py-1.5 rounded-lg border border-kuning-mas/50 transition-colors"
                          >
                            <span>{pesan.tautan_aksi.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <a
                            href={pesan.tautan_aksi.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                          >
                            <span>{pesan.tautan_aksi.label}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-cokelat-tua/50 px-1">
                    {pesan.waktu}
                  </span>
                </div>
              );
            })}

            {/* Indikator Animasi Mengetik */}
            {sedangMengetik && (
              <div className="flex items-center gap-2 p-3 bg-white border border-garis rounded-2xl rounded-tl-none max-w-[120px] shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-marun animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-terakota animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-kuning-mas animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-cokelat-tua/60 ml-1">Mengetik...</span>
              </div>
            )}
          </div>

          {/* Quick FAQ Pills (Pertanyaan Cepat) */}
          <div className="px-3 py-2 bg-white border-t border-garis shrink-0 overflow-x-auto">
            <div className="flex items-center gap-1.5 pb-1">
              <span className="text-[10px] font-bold text-terakota uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3" /> FAQ Cepat:
              </span>
              {pertanyaanCepat.map((faq) => (
                <button
                  key={faq.id}
                  type="button"
                  onClick={() => tanganiKirimPesan(faq.pertanyaan)}
                  disabled={sedangMengetik}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-latar hover:bg-kuning-mas/25 text-cokelat-tua hover:text-marun border border-garis whitespace-nowrap transition-colors disabled:opacity-50 shrink-0"
                >
                  {faq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Input Chat */}
          <form
            onSubmit={tanganiSubmitForm}
            className="p-3 bg-white border-t border-garis flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputTeks}
              onChange={(e) => setInputTeks(e.target.value)}
              placeholder="Tanya seputar harga, fasilitas, aturan..."
              disabled={sedangMengetik}
              className="flex-1 text-xs sm:text-sm bg-latar border border-garis rounded-xl px-3.5 py-2.5 text-cokelat-tua placeholder:text-cokelat-tua/40 focus:outline-none focus:ring-2 focus:ring-marun/20 focus:border-marun transition-all"
            />
            <button
              type="submit"
              disabled={!inputTeks.trim() || sedangMengetik}
              className="p-2.5 bg-marun hover:bg-terakota disabled:bg-garis text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-marun/40"
              aria-label="Kirim Pesan"
            >
              <Send className="w-4 h-4 text-kuning-mas" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
};

export default WidgetChatbot;
