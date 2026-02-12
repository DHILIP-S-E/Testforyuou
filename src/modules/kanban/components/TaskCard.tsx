import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMove }) => {
  const priorityColor =
    task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success';

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip
            label={task.priority}
            size="small"
            color={priorityColor}
            variant="outlined"
          />
          <IconButton size="small" onClick={() => onDelete(task.id)} aria-label="delete task">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        {/* Simple status mover (since we don't have drag-and-drop set up yet) */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {task.status !== 'todo' && (
            <Chip label="Todo" size="small" onClick={() => onMove(task.id, 'todo')} />
          )}
          {task.status !== 'progress' && (
            <Chip label="Doing" size="small" onClick={() => onMove(task.id, 'progress')} />
          )}
          {task.status !== 'review' && (
            <Chip label="Review" size="small" onClick={() => onMove(task.id, 'review')} />
          )}
          {task.status !== 'done' && (
            <Chip label="Done" size="small" onClick={() => onMove(task.id, 'done')} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
