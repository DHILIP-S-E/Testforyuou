import useSWR from 'swr';
import { getProducts } from '../services/getProducts';
import type { Product } from '../types';

export const PRODUCTS_CACHE_KEY = '/api/products';

export const useProducts = () => {
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>(PRODUCTS_CACHE_KEY, getProducts);
  return { products, error, isLoading, mutate };
};
