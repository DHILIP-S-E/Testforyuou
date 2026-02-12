import { kanbanStore } from '../data';
import { Task } from '../types';

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = kanbanStore.tasks.findIndex(t => t.id === id);
  if (index === -1) throw new Error('Task not found');

  kanbanStore.tasks[index] = { ...kanbanStore.tasks[index], ...updates };
  return kanbanStore.tasks[index];
};
