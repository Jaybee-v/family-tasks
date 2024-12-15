import { Task } from "../entities/Task";

export interface ITaskService {
  save(task: Task): Promise<Task>;
}
