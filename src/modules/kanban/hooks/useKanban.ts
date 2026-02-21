import { useState, useEffect } from 'react';
import type { KanbanBoard } from '../types';
import { getBoard } from '../services/getBoard';
import { addTask as addTaskService } from '../services/addTask';
import { moveTask as moveTaskService } from '../services/moveTask';
import { deleteTask as deleteTaskService } from '../services/deleteTask';

export const useKanban = () => {
  const [board, setBoard] = useState<KanbanBoard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      setIsLoading(true);
      try {
        const data = await getBoard();
        setBoard({ ...data }); // Spread to ensure new reference
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoard();
  }, []);

  const addTask = async (columnId: string, title: string) => {
    try {
      const newTask = await addTaskService(columnId, title);
      setBoard((prev) => {
        if (!prev) return null;
        const newColumns = prev.columns.map((col) => {
          if (col.id === columnId) {
            return { ...col, taskIds: [...col.taskIds, newTask.id] };
          }
          return col;
        });
        return { ...prev, columns: newColumns, tasks: [...prev.tasks, newTask] };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const moveTask = async (taskId: string, newColumnId: string) => {
    try {
      await moveTaskService(taskId, newColumnId);
      // Optimistic update
      setBoard((prev) => {
        if (!prev) return null;
        const task = prev.tasks.find((t) => t.id === taskId);
        if (!task) return prev;

        const oldColumnId = task.columnId;
        const newColumns = prev.columns.map((col) => {
          if (col.id === oldColumnId) {
            return { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) };
          }
          if (col.id === newColumnId) {
            return { ...col, taskIds: [...col.taskIds, taskId] };
          }
          return col;
        });

        const newTasks = prev.tasks.map((t) => (t.id === taskId ? { ...t, columnId: newColumnId } : t));

        return { ...prev, columns: newColumns, tasks: newTasks };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskService(taskId);
      setBoard((prev) => {
        if (!prev) return null;
        const task = prev.tasks.find((t) => t.id === taskId);
        if (!task) return prev;

        const newColumns = prev.columns.map((col) => {
          if (col.id === task.columnId) {
            return { ...col, taskIds: col.taskIds.filter((id) => id !== taskId) };
          }
          return col;
        });

        return { ...prev, columns: newColumns, tasks: prev.tasks.filter((t) => t.id !== taskId) };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return { board, isLoading, addTask, moveTask, deleteTask };
};
