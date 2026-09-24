import { randomUUID } from "node:crypto";
import { User } from "../../../domain/entities/User.js";
import { UserRepository } from "../../../domain/ports/UserRepository.js";

export class FakeUserRepository implements UserRepository {
  private users: User[] = [];

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.users.find((u) => u.phone == phone);
  }

  async save(user: User): Promise<User> {
    const newUser: User = {
      ...user,
      id: randomUUID(),
    };

    this.users.push(newUser);

    return newUser;
  }
}
