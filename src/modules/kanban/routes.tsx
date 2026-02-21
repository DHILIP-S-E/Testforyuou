import type { RouteObject } from 'react-router-dom';
import KanbanPage from './pages/KanbanPage';

const kanbanRoutes: RouteObject[] = [
  {
    path: 'apps/kanban',
    element: <KanbanPage />,
  },
];

export default kanbanRoutes;
