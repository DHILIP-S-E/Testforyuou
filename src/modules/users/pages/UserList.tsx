import React from 'react';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import type { User } from '../types';

const UserList: React.FC = () => {
  const { users, isLoading, removeUser } = useUsers();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      await removeUser(deleteUserId);
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to delete user', { variant: 'error' });
    } finally {
      setDeleteUserId(null);
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
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Add User
        </Button>
      </Box>
      <UserTable users={users || []} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <DeleteConfirmationDialog
        open={!!deleteUserId}
        onClose={() => setDeleteUserId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        content="Are you sure you want to delete this user? This action cannot be undone."
      />
    </Container>
  );
};

export default UserList;
