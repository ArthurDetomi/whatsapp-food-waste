import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface UpdatePantryItemInput {
  phone: string;
  itemId: string;
  name?: string;
  quantity?: number;
  expirationDate?: string;
}

export class UpdatePantryItemUseCase implements UseCase<
  UpdatePantryItemInput,
  PantryItem
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
  ) {}

  async execute(input: UpdatePantryItemInput): Promise<PantryItem> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user) {
      throw new Error("User not found!");
    }

    const item = await this.pantryRepository.findById(input.itemId);

    if (!item || item.userId !== user.id || !item.isActive) {
      throw new Error("Pantry item not found!");
    }

    const updatedItem = item.update({
      name: input.name,
      expirationDate: input.expirationDate
        ? new Date(input.expirationDate)
        : undefined,
      quantity: input.quantity,
    });

    return this.pantryRepository.update(updatedItem);
  }
}
