import React from 'react';
import { Box, Typography } from '@mui/material';
import { Task } from '../types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: Task['status']) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onDelete, onMove }) => {
  return (
    <Box sx={{ width: 300, minWidth: 300, bgcolor: 'grey.100', p: 2, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {tasks.length === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          No tasks
        </Typography>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} onMove={onMove} />
        ))
      )}
    </Box>
  );
};

export default TaskColumn;
