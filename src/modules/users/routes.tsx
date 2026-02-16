import type { RouteObject } from 'react-router-dom';
import UserList from './pages/UserList';
import UserCreate from './pages/UserCreate';
import UserEdit from './pages/UserEdit';

const userRoutes: RouteObject[] = [
  {
    path: 'users',
    element: <UserList />,
  },
  {
    path: 'users/create',
    element: <UserCreate />,
  },
  {
    path: 'users/edit/:id',
    element: <UserEdit />,
  },
];

export default userRoutes;
