import { MOCK_CHATS } from '../data';
import type { Chat } from '../types';

export const getChatById = async (id: string): Promise<Chat | undefined> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_CHATS.find((chat) => chat.id === id);
};
