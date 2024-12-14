import { User } from "@/domain/entities/User";
import { IUserService } from "@/domain/interfaces/user.interface";
import { UserMapper } from "../mapper/user.mapper";
import prisma from "../config/prisma";

export class UserService implements IUserService {
  async save(user: User): Promise<User> {
    const orm = UserMapper.toOrmEntity(user);
    const userOrm = await prisma.user.create({ data: orm });
    return UserMapper.toDomainEntity(userOrm);
  }
}
