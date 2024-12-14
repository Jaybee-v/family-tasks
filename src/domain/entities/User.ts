export class User {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly password: string,
    private readonly points: number,
    private readonly role: string,
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

  public getRole(): string {
    return this.role;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static create(params: {
    name: string;
    password: string;
    role: string;
  }): User {
    return new User(
      0,
      params.name,
      params.password,
      0,
      params.role,
      new Date(),
      new Date()
    );
  }
}
