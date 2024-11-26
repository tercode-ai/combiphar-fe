export type ChatInput = {
  question: string;
};

export type ChatResponse = {
  result: ChatResult;
};

export type ChatResult = {
  answer: string;
  source_documents: SourceDocument[];
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  message: string;
  isTyping?: boolean;
  isCopied?: boolean;
  sourceDocument?: SourceDocument[];
};

export type SourceDocument = {
  content: string;
  metadata: {
    page: number;
    source: string;
  };
};
