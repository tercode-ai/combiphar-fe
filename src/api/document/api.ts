import api from '@/lib/api';
import { TResponseListDocument, TUploadURLRequest } from './type';
import { TDefaultResponse } from '@/commons/types/response';

export const deleteAllDocs = async (): Promise<TDefaultResponse> => {
  const res = await api.get<TDefaultResponse>('/delete_all');
  return res.data;
};

export const getDocs = async (): Promise<TResponseListDocument> => {
  const res = await api.get<TResponseListDocument>('/documents');
  return res.data;
};

export const uploadDoc = async (
  formData: FormData
): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const uploadDocFromUrl = async (
  req: TUploadURLRequest
): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/upload-url', req);
  return res.data;
};
