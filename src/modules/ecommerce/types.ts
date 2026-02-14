export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type CreateProductDTO = Omit<Product, 'id' | 'rating'>;
export type UpdateProductDTO = Partial<CreateProductDTO>;
