import type { RouteObject } from 'react-router-dom';
import { KanbanPage } from './pages/Page';

export const kanbanRoutes: RouteObject[] = [
  {
    path: 'kanban',
    element: <KanbanPage />,
  },
];
