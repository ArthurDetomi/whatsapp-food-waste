import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface AddPantryItemInput {
  phone: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

export class AddPantryItemUseCase implements UseCase<
  AddPantryItemInput,
  PantryItem
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository, // Crie essa interface depois!
  ) {}

  async execute(input: AddPantryItemInput): Promise<PantryItem> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user || !user.id) {
      throw new Error("User not found!");
    }

    const item = new PantryItem({
      userId: user.id,
      name: input.name,
      quantity: input.quantity,
      unit: input.unit,
      expirationDate: new Date(input.expirationDate),
    });

    const itemSaved = await this.pantryRepository.save(item);

    return itemSaved;
  }
}
