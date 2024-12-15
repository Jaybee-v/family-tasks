import { IUserService } from "@/domain/interfaces/user.interface";
import { CreateUserCommand } from "./create-user.command";
import { User } from "@/domain/entities/User";
import { hashPassword } from "@/infrastructure/utils/hash-password";

export class CreateUserUseCase {
  constructor(private readonly userInterface: IUserService) {}

  async execute(commands: CreateUserCommand): Promise<User> {
    const hashedPassword = await hashPassword(commands.password);
    const user = User.create({
      name: commands.name,
      password: hashedPassword,
      role: commands.role,
    });

    return await this.userInterface.save(user);
  }
}
