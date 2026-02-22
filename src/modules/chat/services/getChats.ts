import type { Chat } from '../types';
import { MOCK_CHATS } from './data';

export const getChats = async (): Promise<Chat[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Return a copy to avoid mutation issues
  return JSON.parse(JSON.stringify(MOCK_CHATS));
};
