import type { CreateUserDTO, User } from '../types';

export const createUser = async (data: CreateUserDTO): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
      };
      // In a real app, we would add to the list here or the server would handle it.
      resolve(newUser);
    }, 1000);
  });
};
