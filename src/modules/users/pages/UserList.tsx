import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../components/UserTable';
import { useSnackbar } from 'notistack';
import type { User } from '../types';

const UserList: React.FC = () => {
  const { users, isLoading, removeUser } = useUsers();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: User) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      try {
        await removeUser(deleteId);
        enqueueSnackbar('User deleted successfully', { variant: 'success' });
      } catch {
        enqueueSnackbar('Failed to delete user', { variant: 'error' });
      } finally {
        setDeleteId(null);
      }
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

      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserList;
