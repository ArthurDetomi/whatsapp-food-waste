import { IncomingMessage } from "../entities/IncomingMessage.js";
import { AIResponse } from "../ai/AIResponse.js";
export interface FoodAssistant {
  process(message: IncomingMessage): Promise<AIResponse>;
}
