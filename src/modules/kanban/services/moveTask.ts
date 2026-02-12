import { updateTask } from './updateTask';
import { Task } from '../types';

export const moveTask = async (id: string, newStatus: Task['status']): Promise<Task> => {
  return updateTask(id, { status: newStatus });
};
