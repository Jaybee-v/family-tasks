import { ITokenService } from "@/domain/interfaces/token.interface";
import { CreateTokenCommand } from "./create-token.command";
import { getTokens } from "@/infrastructure/utils/tokens";
import { Token } from "@/domain/entities/Token";

export class CreateTokenUseCase {
  constructor(private readonly tokenService: ITokenService) {}

  async execute(params: CreateTokenCommand): Promise<string> {
    const generateToken = getTokens();
    const _token = {
      userId: params.userId,
      token: generateToken.token,
      tokenExpiresAt: generateToken.tokenExpiresAt,
      refreshToken: generateToken.refreshToken,
      refreshTokenExpiresAt: generateToken.refreshTokenExpiresAt,
    };
    const token = Token.create({
      userId: _token.userId,
      token: _token.token,
      tokenExpiresAt: _token.tokenExpiresAt,
      refreshToken: _token.refreshToken,
      refreshTokenExpiresAt: _token.refreshTokenExpiresAt,
    });
    const savedToken = await this.tokenService.save(token);
    return savedToken.getToken() as string;
  }
}
