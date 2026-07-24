import { AIResponse } from "../../domain/ai/AIResponse.js";
import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { FoodAssistant } from "../../domain/ports/FoodAssistant.js";

export class FakeFoodAssistant implements FoodAssistant {
  async process(message: IncomingMessage): Promise<AIResponse> {
    return {
      message: `Olá ${message.name}, em que posso ajudá-lo?`,
      detectedFoods: [],
    };
  }
}
