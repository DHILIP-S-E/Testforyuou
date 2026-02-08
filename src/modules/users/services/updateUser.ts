import type { UpdateUserDTO, User } from '../types';

export const updateUser = async (id: string, data: UpdateUserDTO): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));

  console.log(`User ${id} updated with:`, data);

  // Return a mock updated user
  return {
    id,
    name: data.name || 'Updated Name',
    email: data.email || 'updated@example.com',
    role: data.role || 'user',
    status: data.status || 'active',
    createdAt: new Date().toISOString(),
  };
};
