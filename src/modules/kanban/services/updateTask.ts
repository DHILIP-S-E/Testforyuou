import { MOCK_BOARD } from '../data';
import type { Task } from '../types';

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const taskIndex = MOCK_BOARD.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }

  const updatedTask = { ...MOCK_BOARD.tasks[taskIndex], ...updates };
  MOCK_BOARD.tasks[taskIndex] = updatedTask;

  return updatedTask;
};
