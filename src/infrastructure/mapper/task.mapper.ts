import { Task } from "@/domain/entities/Task";
import { Task as PrismaTask } from "@prisma/client";

export class TaskMapper {
  static toDomain(raw: PrismaTask): Task {
    return new Task(
      raw.id,
      raw.userId,
      raw.title,
      raw.description,
      raw.status,
      raw.points,
      raw.dueDate,
      raw.createdAt,
      raw.updatedAt
    );
  }

  static toOrm(task: Task): Omit<PrismaTask, "id"> {
    return {
      userId: task.getUserId(),
      title: task.getTitle(),
      description: task.getDescription(),
      status: task.getStatus(),
      points: task.getPoints(),
      dueDate: task.getDueDate(),
      createdAt: task.getCreatedAt(),
      updatedAt: task.getUpdatedAt(),
    };
  }
}
