import { Food } from "../entities/Food.js";

export interface FoodRepository {
  saveAll(foods: Food[]): Promise<Food[]>;
}
