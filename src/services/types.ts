export interface TaskType {
  taskName: string;
  dueOn: Date;
  status: string;
  category: string;
  _id?: string;
  description?: string; // Optional
  fileLinks?: string[]; // Optional
}