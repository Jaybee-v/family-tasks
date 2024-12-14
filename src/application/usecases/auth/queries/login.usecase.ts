import { IUserService } from "@/domain/interfaces/user.interface";
import { LoginQuery } from "./login.query";
import { FindUserByNameUseCase } from "../../user/queries/find-user-by-name.usecase";

export class LoginUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly findUserByNameUseCase: FindUserByNameUseCase
  ) {}

  async execute(query: LoginQuery) {
    const user = await this.findUserByNameUseCase.execute({ name: query.name });
    console.log(user);

    if (user.getPassword() === query.password) {
      return user;
    } else {
      throw new Error("Invalid password");
    }
  }
}
