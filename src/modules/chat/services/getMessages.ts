import { chatStore } from '../data';
import { Message } from '../types';

export const getMessages = async (userId: string): Promise<Message[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Return messages where sender or receiver is the userId (and the other is 'me')
  return chatStore.messages.filter(
    (m) => (m.senderId === userId && m.receiverId === 'me') || (m.senderId === 'me' && m.receiverId === userId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};
