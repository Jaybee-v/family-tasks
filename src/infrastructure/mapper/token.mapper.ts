import { Token } from "@/domain/entities/Token";
import { Token as PrismaToken } from "@prisma/client";

export class TokenMapper {
  static toDomain(raw: PrismaToken): Token {
    return new Token(
      raw.id,
      raw.userId,
      raw.token,
      raw.tokenExpiresAt,
      raw.refreshToken,
      raw.refreshTokenExpiresAt,
      raw.createdAt,
      raw.updatedAt
    );
  }

  static toOrm(token: Token): Omit<PrismaToken, "id"> {
    return {
      userId: token.getUserId(),
      token: token.getToken(),
      tokenExpiresAt: token.getTokenExpiresAt(),
      refreshToken: token.getRefreshToken(),
      refreshTokenExpiresAt: token.getRefreshTokenExpiresAt(),
      createdAt: token.getCreatedAt(),
      updatedAt: token.getUpdatedAt(),
    };
  }
}
