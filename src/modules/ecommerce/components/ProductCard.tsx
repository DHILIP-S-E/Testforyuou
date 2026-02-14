import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from '@mui/material';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', p: 2 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {product.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" onClick={onEdit}>Edit</Button>
          <Button size="small" variant="outlined" color="error" onClick={onDelete}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
