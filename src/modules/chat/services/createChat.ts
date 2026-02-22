import type { Chat } from '../types';
import { MOCK_CHATS } from './data';

export const createChat = async (newChat: Partial<Chat>): Promise<Chat> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const chat: Chat = {
    id: String(MOCK_CHATS.length + 1),
    name: newChat.name || 'New Chat',
    type: newChat.type || 'direct',
    participants: newChat.participants || [],
    unreadCount: 0,
    messages: [],
  };

  MOCK_CHATS.push(chat);
  return chat;
};
