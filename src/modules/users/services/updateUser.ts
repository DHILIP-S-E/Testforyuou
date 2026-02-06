import type { UpdateUserDTO, User } from '../types';

export const updateUser = async (id: string, data: UpdateUserDTO): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response
      const updatedUser: User = {
        id,
        name: data.name || 'Updated Name',
        email: data.email || 'updated@example.com',
        role: data.role || 'User',
        status: data.status || 'active',
      };
      resolve(updatedUser);
    }, 1000);
  });
};
