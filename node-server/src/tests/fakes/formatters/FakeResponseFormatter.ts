import { AIResponse } from "../../../domain/ai/AIResponse.js";
import { AIResponseFormatter } from "../../../domain/ai/AIResponseFormatter.js";

export class FakeResponseFormatter implements AIResponseFormatter {
  format(response: AIResponse): string {
    return response.message;
  }
}
