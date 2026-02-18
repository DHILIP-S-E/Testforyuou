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

  // State for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  // Open the dialog instead of window.confirm
  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Perform the actual delete action
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await removeUser(userToDelete);
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Failed to delete user', { variant: 'error' });
      }
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
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
        content="Are you sure you want to delete this user? This action cannot be undone."
      />
    </Container>
  );
};

export default UserList;
