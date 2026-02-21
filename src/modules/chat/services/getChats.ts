import { MOCK_CHATS } from '../data';
import type { Chat } from '../types';

export const getChats = async (): Promise<Chat[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_CHATS;
};
