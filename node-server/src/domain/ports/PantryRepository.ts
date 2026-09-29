import { PantryItem } from "../entities/PantryItem.js";

export interface PantryRepository {
  save(item: PantryItem): Promise<PantryItem>;

  findActiveByUserId(userId: string): Promise<PantryItem[]>;

  update(item: PantryItem): Promise<PantryItem>;

  findById(id: string): Promise<PantryItem>;
}
