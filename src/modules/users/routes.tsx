import type { RouteObject } from 'react-router-dom';
import { UserList } from './pages/UserList';
import { UserCreate } from './pages/UserCreate';
import { UserEdit } from './pages/UserEdit';

export const userRoutes: RouteObject[] = [
  {
    path: 'users',
    children: [
      { path: '', element: <UserList /> },
      { path: 'create', element: <UserCreate /> },
      { path: ':id/edit', element: <UserEdit /> },
    ],
  },
];
