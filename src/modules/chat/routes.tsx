import type { RouteObject } from 'react-router-dom';
import { ChatPage } from './pages/Page';

export const chatRoutes: RouteObject[] = [
  {
    path: 'chat',
    element: <ChatPage />,
  },
];
