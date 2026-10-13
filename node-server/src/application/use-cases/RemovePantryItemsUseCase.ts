import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface RemovePantryItemsInput {
  phone: string;
  items: string[];
}

export class RemovePantryItemsUseCase implements UseCase<
  RemovePantryItemsInput,
  number
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
  ) {}

  async execute(input: RemovePantryItemsInput): Promise<number> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user || !user.id) {
      throw new Error("User not found!");
    }

    if (input.items.length === 0) {
      throw new Error("At least one pantry item is required!");
    }

    return this.pantryRepository.deactivateMany(user.id, input.items);
  }
}
