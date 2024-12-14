import { User } from "@/domain/entities/User";
import { User as PrismaUser } from "@prisma/client";

export class UserMapper {
  static toOrmEntity(user: User): Omit<PrismaUser, "id"> {
    if (!user) {
      console.error("User object is null in mapper");
      throw new Error("User object cannot be null");
    }

    const mappedUser = {
      name: user.getName(),
      password: user.getPassword(),
      points: user.getPoints(),
      role: user.getRole(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    console.log("Mapped user in mapper:", mappedUser);
    return mappedUser;
  }

  static toDomainEntity(userOrm: PrismaUser): User {
    return new User(
      userOrm.id,
      userOrm.name,
      userOrm.password,
      userOrm.points,
      userOrm.role,
      userOrm.createdAt,
      userOrm.updatedAt
    );
  }
}
