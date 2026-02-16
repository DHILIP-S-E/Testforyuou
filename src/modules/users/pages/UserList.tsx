import React, { useState } from 'react';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import { useSnackbar } from 'notistack';
import DeleteConfirmationDialog from '../../../components/common/DeleteConfirmationDialog';
import type { User } from '../types';

const UserList: React.FC = () => {
  const { users, isLoading, removeUser } = useUsers();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = (id: string) => {
    const user = users?.find((u) => u.id === id);
    if (user) {
      setUserToDelete(user);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await removeUser(userToDelete.id);
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to delete user', { variant: 'error' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    if (!isDeleting) {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
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
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        content={
          <Typography>
            Are you sure you want to delete user <strong>{userToDelete?.name}</strong>? This action cannot be undone.
          </Typography>
        }
        isDeleting={isDeleting}
      />
    </Container>
  );
};

export default UserList;
