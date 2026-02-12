import { kanbanStore } from '../data';
import { Task } from '../types';

export const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newTask: Task = {
    ...task,
    id: `t${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  kanbanStore.tasks.push(newTask);
  return newTask;
};
