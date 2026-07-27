import { AIResponse } from "../ai/AIResponse.js";

export interface AIResponseFormatter {
  format(response: AIResponse): string;
}
