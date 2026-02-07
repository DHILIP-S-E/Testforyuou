import { MOCK_USERS } from './getUsers';

export const deleteUser = async (id: string): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(`User ${id} deleted`);

  const index = MOCK_USERS.findIndex((user) => user.id === id);
  if (index !== -1) {
    MOCK_USERS.splice(index, 1);
  }
};
