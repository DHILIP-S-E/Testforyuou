import { MOCK_USERS } from '../data';
import type { User } from '../types';

export const getContacts = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_USERS;
};
