import type { RouteObject } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';

const ecommerceRoutes: RouteObject[] = [
  {
    path: 'ecommerce/products',
    element: <ProductList />,
  },
  {
    path: 'ecommerce/products/create',
    element: <ProductCreate />,
  },
  {
    path: 'ecommerce/products/:id/edit',
    element: <ProductEdit />,
  },
];

export default ecommerceRoutes;
