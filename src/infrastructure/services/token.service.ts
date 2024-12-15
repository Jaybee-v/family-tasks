import { ITokenService } from "@/domain/interfaces/token.interface";
import { TokenMapper } from "../mapper/token.mapper";
import { Token } from "@/domain/entities/Token";
import prisma from "../config/prisma";
import { User } from "@/domain/entities/User";
import { UserMapper } from "../mapper/user.mapper";
import { getTokens } from "../utils/tokens";

export class TokenService implements ITokenService {
  async save(token: Token): Promise<Token> {
    const exists = await prisma.token.findFirst({
      where: {
        userId: token.getUserId(),
      },
    });

    if (exists) {
      await prisma.token.delete({
        where: {
          id: exists.id,
        },
      });
    }

    const orm = TokenMapper.toOrm(token);

    try {
      if (!orm) {
        throw new Error("ORM object is null after mapping");
      }

      const tokenOrm = await prisma.token.create({
        data: orm,
      });
      const savedToken = TokenMapper.toDomain(tokenOrm);
      return savedToken;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  }

  async findByToken(token: string): Promise<User | null> {
    const _token = await prisma.token.findFirst({
      where: {
        token: token,
      },
    });
    const currentDateTime = new Date();
    if (_token && _token.tokenExpiresAt > currentDateTime) {
      const user = await prisma.user.findFirst({
        where: {
          id: _token.userId,
        },
      });
      if (!user) {
        return null;
      }
      return UserMapper.toDomainEntity(user);
    }
    if (
      _token &&
      _token.tokenExpiresAt < currentDateTime &&
      _token.refreshTokenExpiresAt > currentDateTime
    ) {
      const newTokens = await getTokens();
      await prisma.token.update({
        where: {
          id: _token.id,
        },
        data: {
          token: newTokens.token,
          tokenExpiresAt: newTokens.tokenExpiresAt,
          refreshToken: newTokens.refreshToken,
          refreshTokenExpiresAt: newTokens.refreshTokenExpiresAt,
        },
      });
      const user = await prisma.user.findFirst({
        where: {
          id: _token.userId,
        },
      });
      if (!user) {
        return null;
      }
      return UserMapper.toDomainEntity(user);
    }
    return null;
  }

  async findByUserId(userId: number): Promise<Token | null> {
    const token = await prisma.token.findFirst({
      where: {
        userId: userId,
      },
    });
    console.log("IL EST LA");
    console.log(token);
    if (!token) {
      return null;
    }
    return TokenMapper.toDomain(token);
  }
}
