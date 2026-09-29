import { PantryItem } from "../../domain/entities/PantryItem.js";
import { PantryRepository } from "../../domain/ports/PantryRepository.js";
import { UserRepository } from "../../domain/ports/UserRepository.js";
import { UseCase } from "./UseCase.js";

export interface ListPantryItemsInput {
  phone: string;
}

export class ListPantryItemsUseCase implements UseCase<
  ListPantryItemsInput,
  PantryItem[]
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly pantryRepository: PantryRepository,
  ) {}

  async execute(input: ListPantryItemsInput): Promise<PantryItem[]> {
    const user = await this.userRepository.findByPhone(input.phone);

    if (!user) {
      throw new Error("User not found!");
    }

    const pantryList = await this.pantryRepository.findByUserId(user.id!);

    return pantryList;
  }
}
