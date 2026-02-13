import type { User } from '../types';
import { getUsers } from './getUsers';

export const getUserById = async (id: string): Promise<User | undefined> => {
  const users = await getUsers();
  return users.find((u) => u.id === id);
};
