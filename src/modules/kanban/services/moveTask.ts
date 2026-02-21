import { MOCK_BOARD } from '../data';
import type { Task } from '../types';

export const moveTask = async (taskId: string, newColumnId: string): Promise<Task> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const task = MOCK_BOARD.tasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error('Task not found');
  }

  const oldColumnId = task.columnId;
  const oldColumn = MOCK_BOARD.columns.find((c) => c.id === oldColumnId);
  const newColumn = MOCK_BOARD.columns.find((c) => c.id === newColumnId);

  if (!oldColumn || !newColumn) {
    throw new Error('Column not found');
  }

  // Remove from old column
  oldColumn.taskIds = oldColumn.taskIds.filter((id) => id !== taskId);

  // Add to new column
  newColumn.taskIds.push(taskId);

  // Update task
  task.columnId = newColumnId;

  return task;
};
