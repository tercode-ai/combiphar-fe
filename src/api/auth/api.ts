import api from '@/lib/api';
import { TLoginRequest, TLoginResponse } from './type';

export const login = async (req: TLoginRequest): Promise<TLoginResponse> => {
  const res = await api.post<TLoginResponse>('/login', req);
  return res.data;
};
