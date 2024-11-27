import { chat } from '@/lib/fetch';
import { ChatResponse, ChatInput } from '@/types/chat';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useChat = (
  options?: UseMutationOptions<ChatResponse, Error, ChatInput>
) => {
  return useMutation<ChatResponse, Error, ChatInput>({
    mutationFn: async (variables: ChatInput) => {
      return chat.ask(variables);
    },
    ...options
  });
};

export const useClearChat = (
  options?: UseMutationOptions<ChatResponse, Error>
) => {
  return useMutation<ChatResponse, Error>({
    mutationFn: async () => {
      return chat.clear();
    },
    ...options
  });
};
