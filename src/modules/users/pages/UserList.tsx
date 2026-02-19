import React, { useState } from 'react';
import { Box, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useUsers } from '../hooks/useUsers';
import type { User } from '../types';
import UserTable from '../components/UserTable';
import { useSnackbar } from 'notistack';
import DeleteConfirmationDialog from '../../../components/common/DeleteConfirmationDialog';

const UserList: React.FC = () => {
  const { users, isLoading, removeUser } = useUsers();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // State for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      await removeUser(userToDelete);
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
        description="Are you sure you want to delete this user? This action cannot be undone."
        isLoading={isDeleting}
      />
    </Container>
  );
};

export default UserList;
