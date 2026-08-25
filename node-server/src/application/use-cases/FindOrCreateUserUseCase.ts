import { User } from "../../domain/entities/User.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface FindOrCreateUserInput {
  phone: string;
  name: string;
}

export class FindOrCreateUserUseCase implements UseCase<
  FindOrCreateUserInput,
  User
> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: FindOrCreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByPhone(input.phone);

    if (existingUser) {
      return existingUser;
    }

    const user = new User({
      phone: input.phone,
      name: input.name,
    });

    return this.userRepository.save(user);
  }
}
