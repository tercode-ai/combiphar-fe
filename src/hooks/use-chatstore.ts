import { Message } from '@/types/chat';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStore {
  messages: Message[];

  setChat: (value: Message[]) => void;
  addChat: (value: Message) => void;
  setIsTyping: (id: string, value: boolean) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],

      setChat: (values) => set({ messages: values }),
      addChat: (value) =>
        set(({ messages }) => ({ messages: [...messages, value] })),
      setIsTyping: (id, isTyping) =>
        set(({ messages }) => {
          const updatedMessages = messages.map((message) =>
            message.id === id ? { ...message, isTyping } : message
          );

          return { messages: updatedMessages };
        }),
      resetChat: () =>
        set({
          messages: []
        })
    }),
    {
      name: 'combiphar-chats'
    }
  )
);
