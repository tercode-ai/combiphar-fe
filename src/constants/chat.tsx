import { getGreeting } from '@/lib/utils';
import { Message } from '@/types/chat';

export const defaultChat: Message[] = [
  {
    id: new Date().getTime().toString(),
    role: 'assistant',
    message: `Selamat ${getGreeting()}, \nAku Vita siap membantu pekerjaanmu`,
    isTyping: true
  }
];
