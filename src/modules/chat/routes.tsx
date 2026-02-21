import type { RouteObject } from 'react-router-dom';
import ChatPage from './pages/ChatPage';

const chatRoutes: RouteObject[] = [
  {
    path: 'apps/chat',
    element: <ChatPage />,
  },
];

export default chatRoutes;
