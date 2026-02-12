import { Task } from './types';

export const mockTasks: Task[] = [
  {
    id: 't1',
    title: 'Design Dashboard',
    description: 'Create UI mockups for the main dashboard.',
    status: 'todo',
    priority: 'high',
    createdAt: new Date().toISOString(),
    assignee: 'James Johnson',
  },
  {
    id: 't2',
    title: 'Implement Authentication',
    description: 'Set up JWT authentication flow.',
    status: 'progress',
    priority: 'high',
    createdAt: new Date().toISOString(),
    assignee: 'Maria Hernandez',
  },
  {
    id: 't3',
    title: 'Fix Navigation Bug',
    description: 'Sidebar does not collapse on mobile.',
    status: 'review',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    assignee: 'David Smith',
  },
  {
    id: 't4',
    title: 'Update Documentation',
    description: 'Document the API endpoints.',
    status: 'done',
    priority: 'low',
    createdAt: new Date().toISOString(),
    assignee: 'James Johnson',
  },
];

export const kanbanStore = {
  tasks: [...mockTasks],
  columns: [
    { id: 'todo', title: 'To Do' },
    { id: 'progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ],
};
