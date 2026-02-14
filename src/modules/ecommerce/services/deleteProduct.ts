import { MOCK_PRODUCTS } from '../data';

export const deleteProduct = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
  if (index !== -1) {
    MOCK_PRODUCTS.splice(index, 1);
  }
};
