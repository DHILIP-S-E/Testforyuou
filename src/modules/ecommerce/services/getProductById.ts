import { MOCK_PRODUCTS } from '../data';
import type { Product } from '../types';

export const getProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PRODUCTS.find((p) => p.id === id);
};
