import { chat } from '@/lib/api';
import { ChatResponse, ChatInput } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';

export const useAskChat = (input: ChatInput) => {
  return useQuery<ChatResponse>({
    queryKey: ['ask_chat'],
    queryFn: async () => chat.ask(input)
  });
};
