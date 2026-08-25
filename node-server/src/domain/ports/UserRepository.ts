import { User } from "../entities/User.js";

export interface UserRepository {
  findByPhone(phone: string): Promise<User | undefined>;

  save(user: User): Promise<User>;
}
