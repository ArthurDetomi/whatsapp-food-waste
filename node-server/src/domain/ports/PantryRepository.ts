import { PantryItem } from "../entities/PantryItem.js";

export interface PantryRepository {
  save(item: PantryItem): Promise<PantryItem>;

  findByUserId(userId: string): Promise<PantryItem[]>;
}
