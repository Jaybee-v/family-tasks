export interface ITask {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: string;
  points: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
