import { chatStore } from '../data';
import { User } from '../types';

export const getContacts = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return chatStore.users;
};
