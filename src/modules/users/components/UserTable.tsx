import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, Avatar, Box, Typography, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} elevation={0} variant="outlined">
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={user.avatar} alt={user.name}>{user.name.charAt(0)}</Avatar>
                  <Typography variant="subtitle2" fontWeight={600}>{user.name}</Typography>
                </Box>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  color={user.status === 'active' ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title={`Edit ${user.name}`}>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(user.id)}
                    aria-label={`Edit ${user.name}`}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Delete ${user.name}`}>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(user.id)}
                    aria-label={`Delete ${user.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
