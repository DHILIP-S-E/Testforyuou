import type { RouteObject } from 'react-router-dom';
import ProductList from './pages/ProductList';

const ecommerceRoutes: RouteObject[] = [
  {
    path: 'ecommerce/products',
    element: <ProductList />,
  },
];

export default ecommerceRoutes;
