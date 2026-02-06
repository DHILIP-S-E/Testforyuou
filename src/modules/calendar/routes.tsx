import type { RouteObject } from 'react-router-dom';
import { CalendarPage } from './pages/Page';

export const calendarRoutes: RouteObject[] = [
  {
    path: 'calendar',
    element: <CalendarPage />,
  },
];
