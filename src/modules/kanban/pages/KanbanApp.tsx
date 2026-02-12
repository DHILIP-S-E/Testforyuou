import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import TaskBoard from '../components/TaskBoard';
import { useKanban } from '../hooks/useKanban';
import { Task } from '../types';

const KanbanApp: React.FC = () => {
  const { tasks, isLoading, addTask, deleteTask, moveTask } = useKanban();

  const handleAddTask = () => {
    // Simple mock prompt for adding task
    // Ideally use a Modal/Dialog here
    const title = prompt('Enter task title:');
    if (title) {
      addTask({
        title,
        description: 'New task created',
        status: 'todo',
        priority: 'medium',
        assignee: 'Me',
      });
    }
  };

  const handleMoveTask = (id: string, newStatus: Task['status']) => {
    moveTask(id, newStatus);
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
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
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, px: 1 }}>
        <Typography variant="h4" fontWeight="bold">
          Kanban Board
        </Typography>
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <Box sx={{ flex: 1, overflowX: 'auto' }}>
        <TaskBoard
          tasks={tasks}
          onDelete={handleDeleteTask}
          onMove={handleMoveTask}
        />
      </Box>
    </Box>
  );
};

export default KanbanApp;
