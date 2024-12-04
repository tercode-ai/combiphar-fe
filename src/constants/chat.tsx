import { getGreeting } from '@/lib/utils';
import { Message } from '@/types/chat';

export const defaultChat: Message[] = [
  {
    id: new Date().getTime().toString(),
    role: 'assistant',
    message: `Selamat ${getGreeting()}, \nAku Vita siap membantu pekerjaanmu, memberimu ide/saran, membantumu menuliskan email, dll.\n Kamu juga bisa tanya aku tentang Combiphar dan Combiphar Policy.\nAda yang bisa Vita bantu hari ini?`,
    isTyping: true
  }
];
