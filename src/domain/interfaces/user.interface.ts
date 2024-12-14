import { User } from "../entities/User";

export interface IUserService {
  save(user: User): Promise<User>;
  findUserById(id: number): Promise<User | null>;
  findUserByName(name: string): Promise<User | null>;
  patchUser(id: number, key: string, value: string): Promise<User>;
}
