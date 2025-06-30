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
  data: {
    data: string[];
    message: string;
  };
}
