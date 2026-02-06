import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { createUser } from '../services/createUser';
import type { CreateUserDTO } from '../types';

export const UserCreate: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateUserDTO) => {
    await createUser(data);
    navigate('/users');
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>Create User</Typography>
      <Paper sx={{ p: 3 }}>
        <UserForm onSubmit={handleSubmit} onCancel={() => navigate('/users')} />
      </Paper>
    </Box>
  );
};
