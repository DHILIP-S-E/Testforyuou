import type { Message } from '../types';
import { MOCK_CHATS } from './data';

export const sendMessage = async (chatId: string, content: string, senderId: string): Promise<Message> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const chat = MOCK_CHATS.find((c) => c.id === chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }

  const newMessage: Message = {
    id: `m${Date.now()}`,
    content,
    senderId,
    createdAt: new Date().toISOString(),
  };

  chat.messages.push(newMessage);
  chat.lastMessage = newMessage;

  return newMessage;
};
