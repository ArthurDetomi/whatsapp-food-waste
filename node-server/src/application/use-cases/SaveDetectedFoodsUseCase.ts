import { DetectedFood } from "../../domain/ai/DetectedFood.js";
import { Food } from "../../domain/entities/Food.js";
import { FoodRepository } from "../../domain/ports/FoodRepository.js";
import { UseCase } from "./UseCase.js";

export interface SaveDetectedFoodsInput {
  userId: string;
  detectedFoods: DetectedFood[];
}

export class SaveDetectedFoodsUseCase implements UseCase<
  SaveDetectedFoodsInput,
  Food[]
> {
  constructor(private readonly foodRepository: FoodRepository) {}

  async execute(input: SaveDetectedFoodsInput): Promise<Food[]> {
    const foods = input.detectedFoods.map(
      (detectedFood) =>
        new Food({
          userId: input.userId,
          name: detectedFood.name,
          estimatedExpiration: detectedFood.estimatedExpiration,
          confidence: detectedFood.confidence,
          observations: detectedFood.observations,
        }),
    );

    return this.foodRepository.saveAll(foods);
  }
}
