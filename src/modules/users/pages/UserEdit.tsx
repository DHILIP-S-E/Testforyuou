import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { useUsers } from '../hooks/useUsers';
import type { CreateUserDTO, User } from '../types';
import { useSnackbar } from 'notistack';
import { getUserById } from '../services/getUserById';

const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { updateUserInfo } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const data = await getUserById(id);
          if (data) {
            setUser(data);
          } else {
            enqueueSnackbar('User not found', { variant: 'error' });
            navigate('/users');
          }
        } catch (error) {
          console.error(error);
          enqueueSnackbar('Failed to fetch user', { variant: 'error' });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUser();
  }, [id, navigate, enqueueSnackbar]);

  const handleSubmit = async (data: CreateUserDTO) => {
    if (id) {
      try {
        await updateUserInfo(id, data);
        enqueueSnackbar('User updated successfully', { variant: 'success' });
        navigate('/users');
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Failed to update user', { variant: 'error' });
      }
    }
  };

  const handleCancel = () => {
    navigate('/users');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <UserForm initialData={user} onSubmit={handleSubmit} onCancel={handleCancel} />
    </Container>
  );
};

export default UserEdit;
