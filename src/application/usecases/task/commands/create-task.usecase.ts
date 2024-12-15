import { ITaskService } from "@/domain/interfaces/task.interface";
import { CreateTaskCommand } from "./create-task.command";
import { Task } from "@/domain/entities/Task";

export class CreateTaskUseCase {
  constructor(private readonly taskService: ITaskService) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    const task = Task.create({
      userId: command.userId,
      title: command.title,
      description: command.description,
      points: command.points,
      dueDate: command.dueDate,
    });

    return await this.taskService.save(task);
  }
}
