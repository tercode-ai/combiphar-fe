export interface Result {
  answer: string;
  source_documents: SourceDocument[];
}

export interface SourceDocument {
  content: string;
  metadata: Metadata;
}

export interface Metadata {
  page: number;
  source: string;
}

export interface TChatRequest {
  question: string;
  session_id: string;
}

export interface TClearChatRequest {
  session_id: string;
}

export interface TGetHistoryRequest {
  result: string[];
  message: string;
  index: number;
  data: {
    data: string[];
    message: string;
  };
}

export interface TNewSesionResponse {
  message: string;
  session_id: string;
  user_id: string;
  data: {
    message: string;
    session_id: string;
  };
}

export interface Daum {
  answer: string;
  created_at: string;
  id: string;
  question: string;
  session_id: string;
  user_id: string;
  source_documents: string;
}

export interface TGetDetailHistoryData {
  data: Daum[];
  session_id: string;
  message: string;
}
