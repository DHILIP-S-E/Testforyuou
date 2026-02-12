import { kanbanStore } from '../data';
import { Task } from '../types';

export const getTasks = async (): Promise<Task[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return kanbanStore.tasks;
};
