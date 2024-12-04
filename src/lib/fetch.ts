/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from './utils';
import axios, { AxiosResponse } from 'axios';
import { FileUploadInput } from '@/types/file';
import { LoginInput } from '@/types/auth';
import { ChatInput } from '@/types/chat';
import api from './api';
import Cookies from 'js-cookie';
import {
  CreateEnhanceInput,
  DeleteEnhanceInput,
  UpdateEnhanceInput
} from '@/types/enhance';

interface FetcherParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: Record<string, any> | FormData | null;
  headers?: Record<string, string>;
  withSessionId?: boolean;
}

const fetcher = async <T = any>({
  url,
  method = 'GET',
  data = null,
  headers = {},
  withSessionId = false
}: FetcherParams): Promise<T> => {
  const session_id = Cookies.get('session_id');

  try {
    const response: AxiosResponse<T> = await api({
      url,
      method,
      data: {
        ...data,
        session_id: withSessionId ? session_id : undefined
      },
      headers
    });
    return response.data;
  } catch (error: any) {
    toast({
      title: capitalizeFirstLetter(
        error.response?.data?.error || 'An error occurred'
      ),
      duration: 5000
    });
    throw error;
  }
};

export const apiClient = {
  async get(path: string) {
    try {
      const response = await api.get(path);
      return response.data;
    } catch (error: any) {
      toast({
        title: capitalizeFirstLetter(
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
        title: capitalizeFirstLetter(
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
  login: ({ key }: LoginInput) =>
    fetcher({
      url: '/login',
      headers: {
        Authorization: `Basic ${key}`
      }
    }),
  logout: () =>
    fetcher({
      url: '/logout',
      method: 'POST',
      withSessionId: true
    })
};

export const file = {
  list: () =>
    fetcher({
      url: '/docs'
    }),
  upload: ({ file }: FileUploadInput) => {
    const formData = new FormData();
    formData.append('file', file);

    return fetcher({
      url: '/upload',
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export const chat = {
  ask: (input: ChatInput) =>
    fetcher({
      url: '/ask',
      method: 'POST',
      data: input,
      withSessionId: true
    }),
  clear: () =>
    fetcher({
      url: '/clear-chat',
      method: 'POST',
      withSessionId: true
    })
};

export const enhance = {
  list: () =>
    fetcher({
      url: '/enhance'
    }),
  create: (input: CreateEnhanceInput) =>
    fetcher({
      url: '/enhance-create',
      method: 'POST',
      data: input
    }),
  update: (input: UpdateEnhanceInput) =>
    fetcher({
      url: '/enhance-update',
      method: 'POST',
      data: input
    }),
  delete: (input: DeleteEnhanceInput) =>
    fetcher({
      url: '/enhance-delete',
      method: 'POST',
      data: input
    })
};
