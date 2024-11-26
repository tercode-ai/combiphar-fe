import { getGreeting } from '@/lib/utils';
import { Message } from '@/types/chat';

export const defaultChat: Message[] = [
  {
    id: new Date().getTime().toString(),
    role: 'assistant',
    message: `Selamat ${getGreeting()}, \nAda yang bisa saya bantu?\nSaya *Combiphar Assistant*, siap membantu Anda.`,
    isTyping: true
  }
];
