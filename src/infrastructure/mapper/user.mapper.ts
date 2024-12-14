import { User } from "@/domain/entities/User";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toOrmEntity(user: User): Omit<PrismaUser, "id"> {
    return {
      name: user.getName(),
      password: user.getPassword(),
      points: user.getPoints(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }

  static toDomainEntity(userOrm: PrismaUser): User {
    const user = new User(
      userOrm.id,
      userOrm.name,
      userOrm.password,
      userOrm.points,
      userOrm.createdAt,
      userOrm.updatedAt
    );

    return user;
  }
}
