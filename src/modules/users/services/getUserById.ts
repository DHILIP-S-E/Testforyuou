import type { User } from '../types';
import { MOCK_USERS } from './getUsers';

export const getUserById = async (id: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = MOCK_USERS.find((u) => u.id === id);
      resolve(user);
    }, 500);
  });
};
