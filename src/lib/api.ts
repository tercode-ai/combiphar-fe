/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast';

import axios from 'axios';
import { capitalizeFirstLetter } from './utils';
import { ChatInput } from '@/types/chat';
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

export const apiClient = {
  async get(path: string) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}${path}`
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
  },
  async post(path: string, input: any) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}${path}`,
        {
          ...input
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
  },
  async postFile(path: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}${path}`,
        {
          formData
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

export const file = {
  list: () => apiClient.get('/docs'),
  upload: (payload: File) => apiClient.postFile('/upload', payload)
};

export const chat = {
  ask: (payload: ChatInput) => apiClient.post('/ask', payload)
};
