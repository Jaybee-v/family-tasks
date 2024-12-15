import { ITaskService } from "@/domain/interfaces/task.interface";
import { TaskMapper } from "../mapper/task.mapper";
import prisma from "../config/prisma";
import { Task } from "@/domain/entities/Task";

export class TaskService implements ITaskService {
  async save(task: Task): Promise<Task> {
    const orm = TaskMapper.toOrm(task);
    try {
      if (!orm) {
        throw new Error("ORM object is null after mapping");
      }

      const taskOrm = await prisma.task.create({
        data: orm,
      });
      const savedTask = TaskMapper.toDomain(taskOrm);
      return savedTask;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  }
}
