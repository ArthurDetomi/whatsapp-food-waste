import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface RemovePantryItemInput {
  phone: string;
  itemId: string;
}

export class RemovePantryItemUseCase implements UseCase<
  RemovePantryItemInput,
  PantryItem
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
  ) {}

  async execute(input: RemovePantryItemInput): Promise<PantryItem> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user) {
      throw new Error("User not found!");
    }

    const item = await this.pantryRepository.findById(input.itemId);

    if (!item || item.userId !== user.id || !item.isActive) {
      throw new Error("Pantry item not found!");
    }

    const inactiveItem = item.deactivate();

    return this.pantryRepository.update(inactiveItem);
  }
}
