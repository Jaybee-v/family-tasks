import { IUserService } from "@/domain/interfaces/user.interface";
import { LoginQuery } from "./login.query";
import { FindUserByNameUseCase } from "../../user/queries/find-user-by-name.usecase";
import { comparePassword } from "@/infrastructure/utils/hash-password";

export class LoginUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly findUserByNameUseCase: FindUserByNameUseCase
  ) {}

  async execute(query: LoginQuery) {
    const user = await this.findUserByNameUseCase.execute({ name: query.name });
    console.log(user);
    const checkPassword = await comparePassword(
      query.password,
      user.getPassword()
    );

    if (checkPassword) {
      console.log("Le BCRYPT est ok");
      return user;
    } else {
      throw new Error("Invalid password");
    }
  }
}
