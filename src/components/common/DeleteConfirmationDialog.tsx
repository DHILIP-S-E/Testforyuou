import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isDeleting?: boolean;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  isDeleting = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus disabled={isDeleting}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
