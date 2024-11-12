/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast';
import {
  CountBpkaInput,
  ListKecamatanInput,
  ListKelurahanInput
} from '@/types/dashboard';
import { ListRanmorInput } from '@/types/ranmor';
import { CountTemuanInput, ListTemuanInput } from '@/types/temuan';
import axios from 'axios';
import { capitalizeFirstLetter } from './utils';
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

export const apiClient = {
  async fetch(path: string, input: any) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}${path}`,
        {
          ...input
        },
        {
          headers: {
            'x-api-key': import.meta.env.VITE_API_KEY
          }
        }
      );
      return response.data;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: capitalizeFirstLetter(
          error.response?.data?.error || 'An error occurred'
        )
      });
      return error;
    }
  }
};

export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const dashboard = {
  count: (input: CountBpkaInput) => apiClient.fetch('/count-bpka', input),
  listKabupaten: () => apiClient.fetch('/count-bpka-kabupaten', {}),
  listKecamatan: (input: ListKecamatanInput) =>
    apiClient.fetch('/count-bpka-kecamatan', input),
  listKelurahan: (input: ListKelurahanInput) =>
    apiClient.fetch('/count-bpka-kelurahan', input),
  lastSynced: () =>
    apiClient.fetch('/list-ranmor', {
      page: 1,
      limit: 1,
      orders: [
        {
          order_by: 'sync_at',
          sort_by: 'desc'
        }
      ]
    })
};

export const ranmor = {
  list: (input: ListRanmorInput) => apiClient.fetch('/list-ranmor', input)
};

export const temuan = {
  count: (type: CountTemuanInput) =>
    apiClient.fetch('/count-bpka-temuan', type),
  list: (input: ListTemuanInput) => apiClient.fetch('/list-bpka-temuan', input)
};
