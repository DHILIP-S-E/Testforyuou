import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useKanban } from '../hooks/useKanban';

const KanbanPage: React.FC = () => {
  const { board, isLoading, addTask, moveTask, deleteTask } = useKanban();
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [targetColumnId, setTargetColumnId] = useState<string | null>(null);

  if (isLoading || !board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Typography>Loading Kanban...</Typography>
      </Box>
    );
  }

  const handleOpenAddDialog = (columnId: string) => {
    setTargetColumnId(columnId);
    setNewTaskTitle('');
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setTargetColumnId(null);
  };

  const handleAddTask = () => {
    if (targetColumnId && newTaskTitle.trim()) {
      addTask(targetColumnId, newTaskTitle);
      handleCloseAddDialog();
    }
  };

  const handleMoveTask = (taskId: string, currentColumnIndex: number, direction: 'forward' | 'backward') => {
    const targetColumnIndex = direction === 'forward' ? currentColumnIndex + 1 : currentColumnIndex - 1;
    if (targetColumnIndex >= 0 && targetColumnIndex < board.columns.length) {
      const targetColumnId = board.columns[targetColumnIndex].id;
      moveTask(taskId, targetColumnId);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflowX: 'auto' }}>
      <Box sx={{ display: 'flex', gap: 3, height: '100%', minWidth: 'fit-content' }}>
        {board.columns.map((column, colIndex) => (
          <Box
            key={column.id}
            sx={{
              minWidth: 300,
              width: 300,
              bgcolor: 'background.default',
              borderRadius: 2,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content',
              maxHeight: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                {column.title}
              </Typography>
              <Typography variant="caption" sx={{ bgcolor: 'action.hover', px: 1, borderRadius: 1 }}>
                {column.taskIds.length}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', flexGrow: 1 }}>
              {column.taskIds.map((taskId) => {
                const task = board.tasks.find((t) => t.id === taskId);
                if (!task) return null;

                return (
                  <Card key={task.id} sx={{ mb: 1 }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {task.title}
                      </Typography>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {task.description}
                        </Typography>
                      )}
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                        {colIndex > 0 && (
                          <IconButton size="small" onClick={() => handleMoveTask(task.id, colIndex, 'backward')}>
                            <ArrowBackIcon fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton size="small" color="error" onClick={() => deleteTask(task.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        {colIndex < board.columns.length - 1 && (
                          <IconButton size="small" onClick={() => handleMoveTask(task.id, colIndex, 'forward')}>
                            <ArrowForwardIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            <Button
              startIcon={<AddIcon />}
              fullWidth
              variant="text"
              sx={{ mt: 2, justifyContent: 'flex-start' }}
              onClick={() => handleOpenAddDialog(column.id)}
            >
              Add Task
            </Button>
          </Box>
        ))}
      </Box>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} PaperProps={{ sx: { bgcolor: 'background.paper', backgroundImage: 'none' } }}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained" disabled={!newTaskTitle.trim()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KanbanPage;
