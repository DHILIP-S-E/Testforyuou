import React from 'react';
import { Box } from '@mui/material';
import { Task } from '../types';
import TaskColumn from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: Task['status']) => void;
}

const COLUMNS: { id: Task['status']; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDelete, onMove }) => {
  return (
    <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 2, height: '100%' }}>
      {COLUMNS.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);
        return (
          <TaskColumn
            key={col.id}
            title={col.title}
            tasks={colTasks}
            onDelete={onDelete}
            onMove={onMove}
          />
        );
      })}
    </Box>
  );
};

export default TaskBoard;
