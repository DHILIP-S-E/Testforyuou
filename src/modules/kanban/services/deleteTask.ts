import { kanbanStore } from '../data';

export const deleteTask = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = kanbanStore.tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    kanbanStore.tasks.splice(index, 1);
  }
};
