import { Food } from "../../../../domain/entities/Food.js";
import { FoodRepository } from "../../../../domain/ports/FoodRepository.js";

import { FoodModel } from "../models/FoodModel.js";

export class MongoFoodRepository implements FoodRepository {
  async saveAll(foods: Food[]): Promise<Food[]> {
    const documents = await FoodModel.insertMany(
      foods.map((food) => ({
        userId: food.userId,
        name: food.name,
        estimatedExpiration: food.estimatedExpiration,
        confidence: food.confidence,
        observations: food.observations,
      })),
    );

    return documents.map(
      (document) =>
        new Food({
          id: document._id.toString(),
          userId: document.userId,
          name: document.name,
          estimatedExpiration: document.estimatedExpiration,
          confidence: document.confidence,
          observations: document.observations,
        }),
    );
  }
}
