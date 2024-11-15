import { Message } from '@/types/chat';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatStore {
  messages: Message[];

  setChat: (value: Message[]) => void;
  addChat: (value: Message) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],

      setChat: (values) => set({ messages: values }),
      addChat: (value) =>
        set(({ messages }) => ({ messages: [...messages, value] })),
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
