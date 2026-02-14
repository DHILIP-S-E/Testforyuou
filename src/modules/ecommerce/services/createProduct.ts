import { MOCK_PRODUCTS } from '../data';
import type { CreateProductDTO, Product } from '../types';

export const createProduct = async (data: CreateProductDTO): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newProduct: Product = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    rating: { rate: 0, count: 0 },
  };

  MOCK_PRODUCTS.push(newProduct);
  return newProduct;
};
