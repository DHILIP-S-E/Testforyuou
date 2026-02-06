import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import type { CreateUserDTO, User } from '../types';

interface UserFormProps {
  initialValues?: User;
  onSubmit: (data: CreateUserDTO) => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  const { control, handleSubmit, reset } = useForm<CreateUserDTO>({
    defaultValues: {
      name: '',
      email: '',
      role: 'User',
      status: 'active',
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name,
        email: initialValues.email,
        role: initialValues.role,
        status: initialValues.status,
      });
    }
  }, [initialValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Name"
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Email"
            variant="outlined"
            error={!!error}
            helperText={error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Role" select fullWidth>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Status" select fullWidth>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        )}
      />

      <Box display="flex" gap={2} justifyContent="flex-end">
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </Box>
    </Box>
  );
};
