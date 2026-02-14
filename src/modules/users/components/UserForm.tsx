import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material';
import type { CreateUserDTO, User } from '../types';

const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user', 'editor']),
  status: z.enum(['active', 'inactive']),
});

interface UserFormProps {
  initialData?: User;
  onSubmit: (data: CreateUserDTO) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserDTO>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
      status: 'active',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: CreateUserDTO) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            {initialData ? 'Edit User' : 'Create User'}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Role">
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Status">
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
