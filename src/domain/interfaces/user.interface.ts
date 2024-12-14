import { User } from "../entities/User";

export interface IUserService {
  save(user: User): Promise<User>;
}
