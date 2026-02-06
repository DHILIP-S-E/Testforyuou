import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { updateUser } from '../services/updateUser';
import { getUserById } from '../services/getUserById';
import type { CreateUserDTO, User } from '../types';

export const UserEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getUserById(id).then((u) => {
        setUser(u);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSubmit = async (data: CreateUserDTO) => {
    if (id) {
      await updateUser(id, data);
      navigate('/users');
    }
  };

  if (loading) return <CircularProgress />;
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box>
      <Typography variant="h4" mb={3}>Edit User</Typography>
      <Paper sx={{ p: 3 }}>
        <UserForm initialValues={user} onSubmit={handleSubmit} onCancel={() => navigate('/users')} />
      </Paper>
    </Box>
  );
};
