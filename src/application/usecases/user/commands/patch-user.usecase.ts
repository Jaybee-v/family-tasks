import { IUserService } from "@/domain/interfaces/user.interface";
import { PatchUserCommand } from "./patch-user.command";
import { User } from "@/domain/entities/User";

export class PatchUserUseCase {
  constructor(private readonly userInterface: IUserService) {}

  async execute(commands: PatchUserCommand): Promise<User> {
    return await this.userInterface.patchUser(
      commands.id,
      commands.key,
      commands.value
    );
  }
}
