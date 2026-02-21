import { MOCK_BOARD } from '../data';

export const deleteTask = async (taskId: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const taskIndex = MOCK_BOARD.tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }

  const columnId = MOCK_BOARD.tasks[taskIndex].columnId;
  const column = MOCK_BOARD.columns.find((c) => c.id === columnId);

  if (column) {
    column.taskIds = column.taskIds.filter((id) => id !== taskId);
  }

  MOCK_BOARD.tasks.splice(taskIndex, 1);
};
