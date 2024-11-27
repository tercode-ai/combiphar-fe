/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from './utils';
import axios from 'axios';
import { FileUploadInput } from '@/types/file';
import { LoginInput } from '@/types/auth';
import { ChatInput } from '@/types/chat';
import api from './api';
import Cookies from 'js-cookie';

export const apiClient = {
  async login(path: string, input: any) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}${path}`,
        {
          headers: {
            Authorization: `Basic ${input.key}`
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
  },
  async get(path: string) {
    try {
      const response = await api.get(path);
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
    const session_id = Cookies.get('session_id');
    try {
      const response = await api.post(path, {
        ...input,
        session_id
      });
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
  async postFile(path: string, { file }: FileUploadInput) {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'File upload failed');
      }
      throw error;
    }
  }
};

export const auth = {
  login: (key: LoginInput) => apiClient.login('/login', key),
  logout: () => apiClient.post('/logout', {})
};

export const file = {
  list: () => apiClient.get('/docs'),
  upload: (payload: FileUploadInput) => apiClient.postFile('/upload', payload)
};

export const chat = {
  ask: (payload: ChatInput) => apiClient.post('/ask', payload),
  clear: () => apiClient.post('/clear-chat', {})
};
