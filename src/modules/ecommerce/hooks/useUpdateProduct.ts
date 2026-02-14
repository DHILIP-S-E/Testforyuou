import { useState } from 'react';
import { updateProduct } from '../services/updateProduct';
import type { UpdateProductDTO, Product } from '../types';

export const useUpdateProduct = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, data: UpdateProductDTO): Promise<Product | undefined> => {
    setIsUpdating(true);
    setError(null);
    try {
      const updatedProduct = await updateProduct(id, data);
      return updatedProduct;
    } catch (err) {
      setError(err as Error);
      return undefined;
    } finally {
      setIsUpdating(false);
    }
  };

  return { update, isUpdating, error };
};
