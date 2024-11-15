export type ChatInput = {
  question: string;
};

export type ChatResponse = {
  result: {
    answer: string;
    source_documents: SourceDocument[];
  };
};

type SourceDocument = {
  content: string;
  metadata: {
    page: number;
    source: string;
  };
};
