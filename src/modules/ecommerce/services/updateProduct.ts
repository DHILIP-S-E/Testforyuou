import { MOCK_PRODUCTS } from '../data';
import type { UpdateProductDTO, Product } from '../types';

export const updateProduct = async (id: string, data: UpdateProductDTO): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...data };
    return MOCK_PRODUCTS[index];
  }
  return undefined;
};
