import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { ProductCard } from '../components/ProductCard';
import DeleteConfirmationDialog from '../../../components/common/DeleteConfirmationDialog';
import type { Product } from '../types';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { products, isLoading, mutate } = useProducts();
  const { remove, isDeleting } = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    navigate(`/ecommerce/products/${product.id}/edit`);
  };

  const handleDeleteClick = (product: Product) => {
    setDeleteId(product.id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      const success = await remove(deleteId);
      if (success) {
        mutate(); // Refresh the list
      }
      setDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/ecommerce/products/create')}
        >
          Add Product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <ProductCard
              product={product}
              onEdit={() => handleEdit(product)}
              onDelete={() => handleDeleteClick(product)}
            />
          </Grid>
        ))}
      </Grid>

      <DeleteConfirmationDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
      />
    </Box>
  );
};

export default ProductList;
