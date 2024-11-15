import { chat } from '@/lib/api';
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
