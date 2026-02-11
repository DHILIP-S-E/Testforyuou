import type { CreateUserDTO, User } from '../types';

export const createUser = async (user: CreateUserDTO): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    ...user,
    role: user.role || 'user',
    status: user.status || 'active',
    createdAt: new Date().toISOString(),
  };

  // In a real app, this would be a POST request
  console.log('User created:', newUser);

  return newUser;
};
