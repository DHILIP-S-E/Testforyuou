import React from 'react';
import { RouteObject } from 'react-router-dom';
import ChatApp from './pages/ChatApp';

const chatRoutes: RouteObject[] = [
  {
    path: '/chat',
    element: <ChatApp />,
  },
];

export default chatRoutes;
