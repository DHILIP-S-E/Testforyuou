import type { RouteObject } from 'react-router-dom';
import { EmailPage } from './pages/Page';

export const emailRoutes: RouteObject[] = [
  {
    path: 'email',
    element: <EmailPage />,
  },
];
