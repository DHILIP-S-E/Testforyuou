import useSWR, { mutate } from 'swr';
import { getTasks } from '../services/getTasks';
import { addTask } from '../services/addTask';
import { updateTask } from '../services/updateTask';
import { deleteTask } from '../services/deleteTask';
import { moveTask } from '../services/moveTask';
import { Task } from '../types';

export const useKanban = () => {
  const { data: tasks, error, isLoading } = useSWR<Task[]>('/api/kanban/tasks', getTasks);

  const addNewTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await addTask(task);
      mutate('/api/kanban/tasks');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const updateTaskDetails = async (id: string, updates: Partial<Task>) => {
    try {
      await updateTask(id, updates);
      mutate('/api/kanban/tasks');
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await deleteTask(id);
      mutate('/api/kanban/tasks');
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const moveTaskStatus = async (id: string, status: Task['status']) => {
    try {
      // Optimistic UI
      mutate(
        '/api/kanban/tasks',
        (currentTasks: Task[] = []) =>
          currentTasks.map((t) => (t.id === id ? { ...t, status } : t)),
        false
      );
      await moveTask(id, status);
      mutate('/api/kanban/tasks');
    } catch (err) {
      console.error('Failed to move task:', err);
      mutate('/api/kanban/tasks');
    }
  };

  return {
    tasks: tasks || [],
    isLoading,
    error,
    addTask: addNewTask,
    updateTask: updateTaskDetails,
    deleteTask: removeTask,
    moveTask: moveTaskStatus,
  };
};
