import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../types';
import DeleteConfirmationDialog from '../../../components/common/DeleteConfirmationDialog';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      onDelete(deleteUserId);
      setDeleteUserId(null);
    }
  };

  const handleCloseDelete = () => {
    setDeleteUserId(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton aria-label="edit user" color="primary" onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton aria-label="delete user" color="error" onClick={() => handleDeleteClick(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationDialog
        open={!!deleteUserId}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
    </>
  );
};

export default UserTable;
