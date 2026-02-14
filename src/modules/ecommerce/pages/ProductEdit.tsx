import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useProduct } from '../hooks/useProduct';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import type { CreateProductDTO } from '../types';

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, isLoading } = useProduct(id);
  const { update, isUpdating } = useUpdateProduct();

  const handleSubmit = async (data: CreateProductDTO) => {
    if (id) {
      const updatedProduct = await update(id, data);
      if (updatedProduct) {
        navigate('/ecommerce/products');
      }
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>Product not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        isSubmitting={isUpdating}
        onCancel={() => navigate('/ecommerce/products')}
      />
    </Box>
  );
};

export default ProductEdit;
