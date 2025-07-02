import api from '@/lib/api';

import {
  TChatRequest,
  TClearChatRequest,
  TGetDetailHistoryData,
  TGetHistoryRequest,
  TNewSesionResponse
} from './type';
import { TDefaultResponse } from '@/commons/types/response';

export const chat = async (req: TChatRequest): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/ask', req);
  return res.data;
};

export const clearChat = async (
  req: TClearChatRequest
): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/clear-chat', req);
  return res.data;
};

export const newChat = async (): Promise<TNewSesionResponse> => {
  const res = await api.get<TNewSesionResponse>('/generate-session');
  return res.data;
};

export const getHistory = async (): Promise<TGetHistoryRequest> => {
  const res = await api.get<TGetHistoryRequest>('/recent-chat');
  return res.data;
};

export const getDetailHistory = async (
  req: TClearChatRequest
): Promise<TGetDetailHistoryData> => {
  console.log('MASUK REQUEST HISTORY', req);
  const res = await api.get<TGetDetailHistoryData>(
    `/get-history?session_id=${req.session_id}`
  );
  return res.data;
};
