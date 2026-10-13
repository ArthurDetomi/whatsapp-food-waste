import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface PantryItemInput {
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

export interface AddPantryItemsInput {
  phone: string;
  items: PantryItemInput[];
}

export class AddPantryItemsUseCase implements UseCase<
  AddPantryItemsInput,
  PantryItem[]
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
  ) {}

  async execute(input: AddPantryItemsInput): Promise<PantryItem[]> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user || !user.id) {
      throw new Error("User not found!");
    }

    const items = input.items.map(
      (item) =>
        new PantryItem({
          userId: user.id!,
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          expirationDate: new Date(item.expirationDate),
          isActive: true,
        }),
    );

    const itemsSaved = await this.pantryRepository.saveMany(items);

    return itemsSaved;
  }
}
