import { User } from "@/domain/entities/User";
import { IUserService } from "@/domain/interfaces/user.interface";

export class FindAllUsersUseCase {
  constructor(private readonly userInterface: IUserService) {}

  async execute(): Promise<User[]> {
    return await this.userInterface.findAllUsers();
  }
}
