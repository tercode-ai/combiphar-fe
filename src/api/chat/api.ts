import api from '@/lib/api';

import { TChatRequest, TClearChatRequest, TGetHistoryRequest } from './type';

import { TDefaultResponse } from '../../commons/types/response';

export const Chat = async (req: TChatRequest): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/ask', req);
  return res.data;
};

export const clearChat = async (
  req: TClearChatRequest
): Promise<TDefaultResponse> => {
  const res = await api.post<TDefaultResponse>('/clear-chat', req);
  return res.data;
};

export const getHistory = async (
  req: TClearChatRequest
): Promise<TGetHistoryRequest> => {
  const res = await api.post<TGetHistoryRequest>('/get-history', req);
  return res.data;
};
