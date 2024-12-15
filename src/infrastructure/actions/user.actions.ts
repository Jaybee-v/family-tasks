"use server";

import { User } from "@/domain/entities/User";
import { UserService } from "../services/user.service";
import { CreateUserUseCase } from "@/application/usecases/user/commands/create-user.usecase";
import { CreateUserDto } from "@/presentation/dto/create-user.dto";

export async function saveUser(user: CreateUserDto): Promise<User> {
  const createUserUseCase = new CreateUserUseCase(new UserService());

  return createUserUseCase.execute(user);
}

export async function findUserById(id: number): Promise<User | null> {
  const userService = new UserService();
  return userService.findUserById(id);
}

export async function patchUser(
  id: number,
  key: string,
  value: string
): Promise<User> {
  const userService = new UserService();
  return userService.patchUser(id, key, value);
}

export async function findUserByName(name: string): Promise<User | null> {
  const userService = new UserService();
  return userService.findUserByName(name);
}

export async function findAllUsers(): Promise<User[]> {
  const userService = new UserService();
  return userService.findAllUsers();
}
