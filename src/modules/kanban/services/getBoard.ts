import { MOCK_BOARD } from '../data';
import type { KanbanBoard } from '../types';

export const getBoard = async (): Promise<KanbanBoard> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Return a deep copy to avoid mutation issues with React state
  return JSON.parse(JSON.stringify(MOCK_BOARD));
};
