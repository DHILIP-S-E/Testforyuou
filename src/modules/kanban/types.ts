export interface Task {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanBoard {
  columns: Column[];
  tasks: Task[];
}
