export class User {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly password: string,
    private readonly points: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPassword(): string {
    return this.password;
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

  static create(params: { name: string; password: string }): User {
    return new User(0, params.name, params.password, 0, new Date(), new Date());
  }
}
