import useSWR from 'swr';
import { getProducts } from '../services/getProducts';
import type { Product } from '../types';

export const useProducts = () => {
  const { data: products, error, isLoading } = useSWR<Product[]>('/api/products', getProducts);
  return { products, error, isLoading };
};
