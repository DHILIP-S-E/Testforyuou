import type { RouteObject } from 'react-router-dom';
import { EcommercePage } from './pages/Page';

export const ecommerceRoutes: RouteObject[] = [
  {
    path: 'ecommerce',
    element: <EcommercePage />,
  },
];
