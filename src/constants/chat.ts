import { Message } from 'ai/react';

export const messages: Message[] = [
  {
    id: '1',
    role: 'system',
    content: 'Welcome to our support chatbot!',
    createdAt: new Date('2024-11-12T10:00:00')
  },
  {
    id: '2',
    role: 'user',
    content: 'Hi! I need help with my account settings.',
    createdAt: new Date('2024-11-12T10:01:00')
  },
  {
    id: '3',
    role: 'assistant',
    content:
      'I can help with that! Could you tell me specifically what you need assistance with?',
    createdAt: new Date('2024-11-12T10:01:30')
  },
  {
    id: '4',
    role: 'user',
    content: 'I’d like to change my email address.',
    createdAt: new Date('2024-11-12T10:02:00')
  },
  {
    id: '5',
    role: 'function',
    content: 'Checking email update function...',
    createdAt: new Date('2024-11-12T10:02:30')
  },
  {
    id: '6',
    role: 'data',
    content: 'Your email update is available in the account settings section.',
    createdAt: new Date('2024-11-12T10:03:00')
  }
];
