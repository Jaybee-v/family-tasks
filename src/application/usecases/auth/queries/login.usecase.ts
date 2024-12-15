import { LoginQuery } from "./login.query";
import { FindUserByNameUseCase } from "../../user/queries/find-user-by-name.usecase";
import { comparePassword } from "@/infrastructure/utils/hash-password";
import { CreateTokenUseCase } from "../../token/commands/create-token.usecase";
import { TokenService } from "@/infrastructure/services/token.service";

export class LoginUseCase {
  constructor(
    private readonly findUserByNameUseCase: FindUserByNameUseCase,
    private readonly tokenService: TokenService
  ) {}

  async execute(query: LoginQuery) {
    const user = await this.findUserByNameUseCase.execute({ name: query.name });
    console.log(user);
    if (!user) return null;
    const checkPassword = await comparePassword(
      query.password,
      user.getPassword()
    );

    if (checkPassword) {
      console.log("Le BCRYPT est ok");
      let token = "";
      const tokens = await this.tokenService.findByUserId(user.getId());
      if (tokens) {
        console.log("Le token existe");
        token = tokens.getToken();
      }
      if (!token) {
        console.log("Le token n'existe pas");
        const createTokenUseCase = new CreateTokenUseCase(this.tokenService);
        token = await createTokenUseCase.execute({ userId: user.getId() });
      }
      return { user, token };
    } else {
      throw new Error("Invalid password");
    }
  }
}
