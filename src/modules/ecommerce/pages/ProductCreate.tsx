import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useCreateProduct } from '../hooks/useCreateProduct';
import type { CreateProductDTO } from '../types';

const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const { create, isCreating } = useCreateProduct();

  const handleSubmit = async (data: CreateProductDTO) => {
    const newProduct = await create(data);
    if (newProduct) {
      navigate('/ecommerce/products');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <ProductForm
        onSubmit={handleSubmit}
        isSubmitting={isCreating}
        onCancel={() => navigate('/ecommerce/products')}
      />
    </Box>
  );
};

export default ProductCreate;
