import { createBrowserRouter, Navigate } from 'react-router-dom';
import { FullLayout } from './layouts/FullLayout';
import { userRoutes } from './modules/users/routes';
import { chatRoutes } from './modules/chat/routes';
import { emailRoutes } from './modules/email/routes';
import { kanbanRoutes } from './modules/kanban/routes';
import { calendarRoutes } from './modules/calendar/routes';
import { ecommerceRoutes } from './modules/ecommerce/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/users" replace /> },
      ...userRoutes,
      ...chatRoutes,
      ...emailRoutes,
      ...kanbanRoutes,
      ...calendarRoutes,
      ...ecommerceRoutes,
    ],
  },
]);
