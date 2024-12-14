import { IUserService } from "@/domain/interfaces/user.interface";
import { FindUserByNameQuery } from "./find-user-by-name.query";
import { User } from "@/domain/entities/User";

export class FindUserByNameUseCase {
  constructor(private readonly userService: IUserService) {}

  async execute(query: FindUserByNameQuery): Promise<User> {
    const user = await this.userService.findUserByName(query.name);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
