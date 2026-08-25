import { User } from "../../../../domain/entities/User.js";
import { UserRepository } from "../../../../domain/ports/UserRepository.js";
import { UserModel } from "../models/UserModel.js";

export class MongoUserRepository implements UserRepository {
  async findByPhone(phone: string): Promise<User | undefined> {
    const document = await UserModel.findOne({ phone });

    if (!document) {
      return undefined;
    }

    return new User({
      id: document._id.toString(),
      phone: document.phone,
      name: document.name,
    });
  }

  async save(user: User): Promise<User> {
    const document = await UserModel.create({
      phone: user.phone,
      name: user.name,
    });

    return new User({
      id: document._id.toString(),
      name: document.name,
      phone: document.phone,
    });
  }
}
