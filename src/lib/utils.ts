import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const thousandSeparator = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatDate = (value: string | Date, format: string) => {
  return dayjs(value).format(format);
};
