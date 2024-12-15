import { User } from "@/domain/entities/User";
import { IUserService } from "@/domain/interfaces/user.interface";
import { UserMapper } from "../mapper/user.mapper";
import prisma from "../config/prisma";

export class UserService implements IUserService {
  async save(user: User): Promise<User> {
    console.log("User BEFORE ORM", {
      id: user.getId(),
      name: user.getName(),
      password: user.getPassword(),
      role: user.getRole(),
      points: user.getPoints(),
    });

    const orm = UserMapper.toOrmEntity(user);
    console.log("User AFTER ORM", orm);

    try {
      if (!orm) {
        throw new Error("ORM object is null after mapping");
      }

      const userOrm = await prisma.user.create({
        data: orm,
      });
      console.log("User ORM", userOrm);
      const savedUser = UserMapper.toDomainEntity(userOrm);
      console.log("User SAVED", savedUser);
      return savedUser;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return UserMapper.toDomainEntity(user);
  }

  async findUserByName(name: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { name } });
    if (!user) return null;
    return UserMapper.toDomainEntity(user);
  }

  async findAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => UserMapper.toDomainEntity(user));
  }

  async patchUser(id: number, key: string, value: string): Promise<User> {
    const user = this.findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }

    let _value: string | number = value;
    if (key === "points") {
      _value = parseInt(value);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { [key]: _value },
    });

    return UserMapper.toDomainEntity(updatedUser);
  }
}
