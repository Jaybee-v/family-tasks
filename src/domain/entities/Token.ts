export class Token {
  constructor(
    private readonly id: number,
    private readonly userId: number,
    private readonly token: string,
    private readonly tokenExpiresAt: Date,
    private readonly refreshToken: string,
    private readonly refreshTokenExpiresAt: Date,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  public getId(): number {
    return this.id;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getToken(): string {
    return this.token;
  }

  public getTokenExpiresAt(): Date {
    return this.tokenExpiresAt;
  }

  public getRefreshToken(): string {
    return this.refreshToken;
  }

  public getRefreshTokenExpiresAt(): Date {
    return this.refreshTokenExpiresAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  static create(params: {
    userId: number;
    token: string;
    tokenExpiresAt: Date;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
  }): Token {
    return new Token(
      0,
      params.userId,
      params.token,
      params.tokenExpiresAt,
      params.refreshToken,
      params.refreshTokenExpiresAt,
      new Date(),
      new Date()
    );
  }
}
