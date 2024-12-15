export class CreateTaskCommand {
  constructor(
    public readonly userId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly points: number,
    public readonly dueDate: Date
  ) {}
}
