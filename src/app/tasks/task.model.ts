export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'Pendiente' | 'Completada';
    dueDate?: Date;
  }
  