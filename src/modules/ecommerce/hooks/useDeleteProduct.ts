import { useState } from 'react';
import { deleteProduct } from '../services/deleteProduct';

export const useDeleteProduct = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const remove = async (id: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteProduct(id);
      return true;
    } catch (err) {
      setError(err as Error);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { remove, isDeleting, error };
};
