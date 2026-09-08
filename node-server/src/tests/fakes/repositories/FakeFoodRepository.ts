import { Food } from "../../../domain/entities/Food.js";
import { FoodRepository } from "../../../domain/ports/FoodRepository.js";

export class FakeFoodRepository implements FoodRepository {
  private foods: Food[] = [];

  async saveAll(foods: Food[]): Promise<Food[]> {
    this.foods = this.foods.concat(foods).map((f, i) => {
      return {
        id: String(i + 1),
        ...f,
      };
    });

    return foods;
  }
}
