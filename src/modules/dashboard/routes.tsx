import type { RouteObject } from 'react-router-dom';
import ModernDashboard from './pages/ModernDashboard';

const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    element: <ModernDashboard />,
  },
];

export default dashboardRoutes;
