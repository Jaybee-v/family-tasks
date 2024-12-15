"use server";

import { CreateTaskUseCase } from "@/application/usecases/task/commands/create-task.usecase";
import { Task } from "@/domain/entities/Task";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "@/presentation/dto/create-task.dto";

export async function saveTask(task: CreateTaskDto): Promise<Task> {
  const createTaskUseCase = new CreateTaskUseCase(new TaskService());

  return createTaskUseCase.execute(task);
}

export async function fetchNextTasks(): Promise<Task[]> {
  const taskService = new TaskService();
  return taskService.findAllNextTasks();
}
