import useSWR from 'swr';
import { getProductById } from '../services/getProductById';
import type { Product } from '../types';

export const useProduct = (id: string | undefined) => {
  const { data: product, error, isLoading } = useSWR<Product | undefined>(
    id ? `/api/products/${id}` : null,
    () => (id ? getProductById(id) : Promise.resolve(undefined))
  );

  return { product, error, isLoading };
};
