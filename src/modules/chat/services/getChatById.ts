import type { Chat } from '../types';
import { MOCK_CHATS } from './data';

export const getChatById = async (id: string): Promise<Chat | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const chat = MOCK_CHATS.find((c) => c.id === id);
  return chat ? JSON.parse(JSON.stringify(chat)) : undefined;
};
