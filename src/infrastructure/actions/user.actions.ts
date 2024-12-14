"use server";

import { User } from "@/domain/entities/User";
import { UserService } from "../services/user.service";

export async function saveUser(user: User): Promise<User> {
  const userService = new UserService();
  return userService.save(user);
}
