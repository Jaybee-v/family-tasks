// TASK STATUS
// waiting: when the task is created
// doing: when the task is being executed
// done: when the task is finished
// canceled: when the task is canceled

export class Task {
  constructor(
    private readonly id: number,
    private readonly userId: number,
    private readonly title: string,
    private readonly description: string,
    private readonly status: string,
    private readonly points: number,
    private readonly dueDate: Date,
    private readonly createdAt: Date,
    private readonly updatedAt: Date // private readonly user: User
  ) {}

  public getId(): number {
    return this.id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getStatus(): string {
    return this.status;
  }

  public getPoints(): number {
    return this.points;
  }

  public getDueDate(): Date {
    return this.dueDate;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  // public getUser(): User {
  //   return this.user;
  // }

  static create(params: {
    userId: number;
    title: string;
    description: string;
    points: number;
    dueDate: Date;
  }): Task {
    return new Task(
      0,
      params.userId,
      params.title,
      params.description,
      "waiting",
      params.points,
      params.dueDate,
      new Date(),
      new Date()
    );
  }
}
