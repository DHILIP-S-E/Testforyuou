import { MOCK_PRODUCTS } from '../data';
import type { Product } from '../types';

export const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return [...MOCK_PRODUCTS];
};
