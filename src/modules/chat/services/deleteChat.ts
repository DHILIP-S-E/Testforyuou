import { MOCK_CHATS } from './data';

export const deleteChat = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const index = MOCK_CHATS.findIndex((c) => c.id === id);
  if (index !== -1) {
    MOCK_CHATS.splice(index, 1);
    return true;
  }
  return false;
};
