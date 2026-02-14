import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  Grid,
  Box,
} from '@mui/material';
import type { CreateProductDTO, Product } from '../types';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Image must be a valid URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: CreateProductDTO) => void;
  isSubmitting?: boolean;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        price: initialData.price,
        description: initialData.description,
        category: initialData.category,
        image: initialData.image,
      });
    }
  }, [initialData, reset]);

  const onSubmitForm = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price"
                type="number"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                fullWidth
                error={!!errors.image}
                helperText={errors.image?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
