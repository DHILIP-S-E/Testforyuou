import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { UserTable } from '../components/UserTable';
import { deleteUser } from '../services/deleteUser';
import AddIcon from '@mui/icons-material/Add';

export const UserList: React.FC = () => {
  const navigate = useNavigate();
  const { users, isLoading, mutate } = useUsers();

  const handleEdit = (id: string) => {
    navigate(`/users/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      mutate(); // Refresh list
    }
  };

  if (isLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">User List</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/users/create')}
        >
          Add User
        </Button>
      </Box>
      <UserTable users={users || []} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};
