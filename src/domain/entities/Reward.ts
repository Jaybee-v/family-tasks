export class Reward {
  constructor(
    private readonly id: number,
    private readonly title: string,
    private readonly description: string,
    private readonly points: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  public getId(): number {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getPoints(): number {
    return this.points;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static create(params: {
    title: string;
    description: string;
    points: number;
  }): Reward {
    return new Reward(
      0,
      params.title,
      params.description,
      params.points,
      new Date(),
      new Date()
    );
  }
}
