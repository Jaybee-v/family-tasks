import { Token } from "../entities/Token";
import { User } from "../entities/User";

export interface ITokenService {
  save(token: Token): Promise<Token>;
  findByToken(token: string): Promise<User | null>;
  findByUserId(userId: number): Promise<Token | null>;
}
