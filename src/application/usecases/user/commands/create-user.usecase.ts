import { IUserService } from "@/domain/interfaces/user.interface";
import { CreateUserCommand } from "./create-user.command";
import { User } from "@/domain/entities/User";

export class CreateUserUseCase {
  constructor(private readonly userInterface: IUserService) {}

  async execute(commands: CreateUserCommand): Promise<User> {
    const user = User.create({
      name: commands.name,
      password: commands.password,
    });

    return await this.userInterface.save(user);
  }
}
