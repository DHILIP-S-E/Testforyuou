import { useState } from 'react';
import { useSWRConfig } from 'swr';
import { createProduct } from '../services/createProduct';
import { PRODUCTS_CACHE_KEY } from './useProducts';
import type { CreateProductDTO, Product } from '../types';

export const useCreateProduct = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { mutate } = useSWRConfig();

  const create = async (data: CreateProductDTO): Promise<Product | undefined> => {
    setIsCreating(true);
    setError(null);
    try {
      const newProduct = await createProduct(data);
      mutate(PRODUCTS_CACHE_KEY);
      return newProduct;
    } catch (err) {
      setError(err as Error);
      return undefined;
    } finally {
      setIsCreating(false);
    }
  };

  return { create, isCreating, error };
};
