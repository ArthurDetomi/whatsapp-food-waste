import { AIResponse } from "../../../domain/ai/AIResponse.js";
import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";
import { FoodAssistant } from "../../../domain/ports/FoodAssistant.js";

import { gemini } from "./client.js";
import { PromptBuilder } from "./PromptBuilder.js";
import { aiResponseSchema } from "./schema.js";

import { ConversationRepository } from "../../../domain/ports/ConversationRepository.js";

export class GeminiFoodAssistant implements FoodAssistant {
  private readonly promptBuilder: PromptBuilder;

  constructor(private readonly conversationRepository: ConversationRepository) {
    this.promptBuilder = new PromptBuilder();
  }

  async process(message: IncomingMessage): Promise<AIResponse> {
    const prompt = this.promptBuilder.build(message);

    const previousInteractionId =
      await this.conversationRepository.findLastInteractionId(message.phone);

    const input =
      message.mediaBase64 && message.mimeType
        ? [
            {
              type: "text" as const,
              text: prompt,
            },
            {
              type: "image" as const,
              data: message.mediaBase64,
              mime_type: message.mimeType,
            },
          ]
        : prompt;

    const interaction = await gemini.interactions.create({
      model: "gemini-3.5-flash-lite",
      input,
      previous_interaction_id: previousInteractionId,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: aiResponseSchema,
      },
    });

    const responseText = interaction.output_text;

    if (!responseText) {
      throw new Error("O Gemini retornou uma resposta vazia.");
    }

    const parsedResponse: unknown = JSON.parse(responseText);

    if (!this.isAIResponse(parsedResponse)) {
      throw new Error("O Gemini retornou uma resposta em formato inválido.");
    }

    await this.conversationRepository.saveLastInteractionId(
      message.phone,
      interaction.id,
    );

    console.log({
      interactionId: interaction.id,
      previousInteractionId,
      response: parsedResponse,
    });

    return parsedResponse;
  }

  private isAIResponse(value: unknown): value is AIResponse {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const response = value as Record<string, unknown>;

    return (
      typeof response.message === "string" &&
      Array.isArray(response.detectedFoods)
    );
  }
}
