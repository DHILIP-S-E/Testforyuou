import { createBrowserRouter, Navigate } from 'react-router-dom';
import FullLayout from './layouts/FullLayout/FullLayout';
import BlankLayout from './layouts/BlankLayout';
import userRoutes from './modules/users/routes';
import dashboardRoutes from './modules/dashboard/routes';
import ecommerceRoutes from './modules/ecommerce/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      ...dashboardRoutes,
      ...userRoutes,
      ...ecommerceRoutes,
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      // Auth routes would go here (Login, Register)
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" />,
  },
]);

export default router;
