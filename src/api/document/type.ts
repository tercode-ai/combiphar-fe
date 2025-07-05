import { TResponse } from '@/commons/types/response';

export interface TUploadURLRequest {
  answer: string;
}

export type TDocItem = {
  created_at: string;
  deleted_at: string;
  document_name: string;
  id: string;
  metadata: unknown;
  portal_id: string | null;
  //missing
  updated_at: string;
};

export type TResponseListDocument = TResponse<TDocItem[]>;
export type TResponseDetailDocument = TResponse<TDocItem>;
