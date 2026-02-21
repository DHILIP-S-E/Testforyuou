import { MOCK_BOARD } from '../data';
import type { Task } from '../types';

export const addTask = async (columnId: string, title: string): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newTask: Task = {
    id: Date.now().toString(),
    columnId,
    title,
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
  };

  MOCK_BOARD.tasks.push(newTask);

  const column = MOCK_BOARD.columns.find((c) => c.id === columnId);
  if (column) {
    column.taskIds.push(newTask.id);
  }

  return newTask;
};
