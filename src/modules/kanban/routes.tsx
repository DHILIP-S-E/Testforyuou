import React from 'react';
import { RouteObject } from 'react-router-dom';
import KanbanApp from './pages/KanbanApp';

const kanbanRoutes: RouteObject[] = [
  {
    path: '/kanban',
    element: <KanbanApp />,
  },
];

export default kanbanRoutes;
