import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowRightIcon,
  ImageIcon,
  PlusCircledIcon
} from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';

const DetailPage = () => {
  // const { chatId } = useParams();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const loading = true;

  const chat = {
    messages: [
      {
        id: 1,
        isUser: false,
        text: 'Halo! Ada yang bisa saya bantu hari ini?',
        timestamp: '2025-06-28T10:05:00Z'
      },
      {
        id: 2,
        isUser: true,
        text: 'Hai! Bisa bantu buatkan summary laporan minggu ini?',
        timestamp: '2025-06-28T10:06:15Z'
      },
      {
        id: 3,
        isUser: false,
        text: 'Indonesia adalah negara kesatuan dengan bentuk pemerintahan republik berdasarkan konstitusi yang sah, yaitu Undang-Undang Dasar Negara Republik Indonesia Tahun. Indonesia adalah negara kesatuan dengan bentuk pemerintahan republik berdasarkan konstitusi yang sah, yaitu Undang-Undang Dasar Negara Republik Indonesia Tahun . Indonesia adalah negara kesatuan dengan bentuk pemerintahan republik berdasarkan konstitusi yang sah, yaitu Undang-Undang Dasar Negara Republik Indonesia Tahun',
        timestamp: '2025-06-28T10:06:45Z'
      },
      {
        id: 4,
        isUser: false,
        text: 'Berikut summary-nya:\n- Total transaksi: 125\n- Pendapatan: Rp12.500.000\n- Customer baru: 8',
        timestamp: '2025-06-28T10:07:30Z'
      },
      {
        id: 5,
        isUser: true,
        text: 'Terima kasih! Sangat membantu.',
        timestamp: '2025-06-28T10:08:00Z'
      },

      {
        id: 6,
        isUser: false,
        text: 'Sistem kepresidenan dirumuskan dalam UUD 1945 oleh Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia (BPUPKI), yang dibentuk di masa pendudukan Jepang pada tanggal 1 Maret 1945 untuk melakukan kegiatan yang berkaitan dengan "Usaha persiapan kemerdekaan Indonesia".[1] Pada tanggal 18 Agustus 1945, Panitia Persiapan Kemerdekaan Indonesia (PPKI), yang dibentuk untuk menggantikan BPUPKI, menunjuk Soekarno sebagai Presiden Republik Indonesia yang pertama dan dengan demikian mengesahkan terbentuknya lembaga kepresidenan Indonesia.',
        timestamp: '2025-06-28T10:06:45Z'
      },

      {
        id: 7,
        isUser: true,
        text: 'Bagaimana ?',
        timestamp: '2025-06-28T10:06:45Z'
      },
      {
        id: 8,
        isUser: false,
        text: 'Periode jabatan Soekarno pada era Revolusi Nasional Indonesia sebenarnya tidak benar-benar dijalankan secara penuh. Terdapat masa-masa yang membuat Soekarno memberikan mandat pemerintahan sementara kepada orang lain. Salah satunya ialah ketika Pemerintahan Darurat Republik Indonesia sebagai pemerintahan dalam pengasingan dibentuk setelah pemerintah resmi Indonesia ditawan dalam operasi Agresi Militer Belanda II. Sedangkan momen lainnya ialah ketika Soekarno menjadi Presiden Republik Indonesia Serikat (RIS). Selengkapnya lihat daftar di bawah ini.',
        timestamp: '2025-06-28T10:06:45Z'
      }
    ]
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  return (
    <>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="min-h-full">
          {chat.messages.map((message) => (
            <div
              className={`flex w-full p-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4`}>
                {!message.isUser ? (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white">
                    <img src="/icons/logo-short.png" />
                  </div>
                ) : null}
                <div
                  className={`rounded-2xl ${
                    message.isUser && 'rounded-br-md bg-[#D9D9D9] px-4 py-3'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex w-full justify-start p-4">
              <div className="flex max-w-[70%] gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white">
                  <img src="/icons/logo-short.png" />
                </div>
                <div className="rounded-2xl rounded-bl-md  px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="w-full rounded-xl border border-gray-300 bg-white p-4">
        <textarea
          className="w-full resize-none border-none text-sm outline-none placeholder:text-gray-400"
          rows={4}
          placeholder="Ask CombipharGPT whatever you want....."
          maxLength={1000}
        />

        <div className="mt-4 flex items-center justify-between text-sm text-gray-800">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 transition hover:text-purple-600">
              <PlusCircledIcon /> Add attachment
            </button>
            <button className="flex items-center gap-1 transition hover:text-purple-600">
              <ImageIcon /> Use image
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-900">0/1000</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7051f8] text-white transition hover:bg-[#5b3de4]">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPage;
