import type { KanbanBoard } from './types';

export const MOCK_BOARD: KanbanBoard = {
  columns: [
    {
      id: 'col-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    {
      id: 'col-2',
      title: 'In Progress',
      taskIds: ['task-3'],
    },
    {
      id: 'col-3',
      title: 'Done',
      taskIds: ['task-4'],
    },
  ],
  tasks: [
    {
      id: 'task-1',
      columnId: 'col-1',
      title: 'Research Competitors',
      description: 'Analyze top 5 competitors.',
      priority: 'high',
      dueDate: '2023-12-01',
    },
    {
      id: 'task-2',
      columnId: 'col-1',
      title: 'Draft Proposal',
      description: 'Create initial draft for client.',
      priority: 'medium',
      dueDate: '2023-12-05',
    },
    {
      id: 'task-3',
      columnId: 'col-2',
      title: 'Design Mockups',
      description: 'Figma designs for dashboard.',
      priority: 'high',
      dueDate: '2023-11-28',
    },
    {
      id: 'task-4',
      columnId: 'col-3',
      title: 'Initial Meeting',
      description: 'Kickoff meeting with team.',
      priority: 'low',
      dueDate: '2023-11-20',
    },
  ],
};
