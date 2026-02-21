import React from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import type { CreateUserDTO } from '../types';
import { useSnackbar } from 'notistack';

const UserCreate: React.FC = () => {
  const { addUser } = useUsers();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (data: CreateUserDTO) => {
    try {
      await addUser(data);
      enqueueSnackbar('User created successfully', { variant: 'success' });
      navigate('/users');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to create user', { variant: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <Container maxWidth="md">
      <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Container>
  );
};

export default UserCreate;
