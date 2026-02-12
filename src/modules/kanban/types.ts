export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate?: string;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanState {
  columns: Column[];
  tasks: Task[];
}
