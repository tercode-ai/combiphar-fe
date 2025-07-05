import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import { SourceDocument } from '@/types/chat';
import { FileListResponse } from '@/types/file';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const thousandSeparator = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatDate = (
  value: string | Date,
  format: string | undefined = 'DD/MM/YYYY'
) => {
  return dayjs(value).format(format);
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const truncateFileName = (fileName: string, maxLength: number) => {
  const extension = fileName.split('.').pop();
  if (!extension) return fileName;

  const nameWithoutExtension = fileName.slice(0, -(extension.length + 1));
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const charsToShow = maxLength - extension.length - 3;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return `${nameWithoutExtension.slice(0, frontChars)}...${nameWithoutExtension.slice(-backChars)}.${extension}`;
};

export const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Pagi';
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'Siang';
  } else if (currentHour >= 15 && currentHour < 18) {
    return 'Sore';
  } else {
    return 'Malam';
  }
};

export const getUniqSourceDocument = (documents: SourceDocument[]) => {
  const seen = new Set<string>();
  return documents.filter((doc) => {
    const key = `${doc.metadata.page}-${doc.metadata.source}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const excludeFileByName = (files?: FileListResponse[]) => {
  const excluded = [
    'AR-United-Tractors-2023-Final.pdf',
    'Bung Karno.pdf',
    'Catatan Hitam Lima Presiden Indonesia.pdf',
    'Asal Bangsa nusantara.pdf',
    'konflik_agama.pdf',
    'Sumbangan Pernikahan-1.PDF',
    'Diskusi 1 Logika Informatika Eva Vani Elisa.pdf',
    '053972828_Tugas2_EKMA4158.pdf'
  ];

  return files?.filter(({ file }) => !excluded.includes(file));
};
