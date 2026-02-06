import type { User } from '../types';

// Mock data
export const MOCK_USERS: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=3' },
];

export const getUsers = async (): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_USERS]);
    }, 800);
  });
};
