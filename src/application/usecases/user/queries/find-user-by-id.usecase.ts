import { IUserService } from "@/domain/interfaces/user.interface";
import { FindUserByIdQuery } from "./find-user-by-id.query";
import { User } from "@/domain/entities/User";

export class FindUserByIdUseCase {
  constructor(private readonly userInterface: IUserService) {}

  async execute(query: FindUserByIdQuery): Promise<User> {
    const user = await this.userInterface.findUserById(query.id);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
