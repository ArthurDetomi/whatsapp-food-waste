import { Food } from "../../domain/entities/Food.js";
export class SaveDetectedFoodsUseCase {
    foodRepository;
    constructor(foodRepository) {
        this.foodRepository = foodRepository;
    }
    async execute(input) {
        const foods = input.detectedFoods.map((detectedFood) => new Food({
            userId: input.userId,
            name: detectedFood.name,
            estimatedExpiration: detectedFood.estimatedExpiration,
            confidence: detectedFood.confidence,
            observations: detectedFood.observations,
        }));
        return this.foodRepository.saveAll(foods);
    }
}
