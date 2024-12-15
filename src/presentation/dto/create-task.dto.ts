export interface CreateTaskDto {
  userId: number;
  title: string;
  description: string;
  points: number;
  dueDate: Date;
}
