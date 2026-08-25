import { MessageType } from "../../../domain/entities/MessageType.js";
import { gemini } from "./client.js";
import { PromptBuilder } from "./PromptBuilder.js";
import { aiResponseSchema } from "./schema.js";
export class GeminiFoodAssistant {
  conversationRepository;
  promptBuilder;
  constructor(conversationRepository) {
    this.conversationRepository = conversationRepository;
    this.promptBuilder = new PromptBuilder();
  }
  async process(message) {
    const prompt = this.promptBuilder.build(message);
    const previousInteractionId =
      await this.conversationRepository.findLastInteractionId(message.phone);
    const input = this.buildInput(message, prompt);
    const interaction = await gemini.interactions.create({
      model: "gemini-3.7-flash",
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
    const parsedResponse = JSON.parse(responseText);
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
      messageType: message.type,
      mimeType: message.mimeType,
      response: parsedResponse,
    });
    return parsedResponse;
  }
  buildInput(message, prompt) {
    if (!message.mediaBase64 || !message.mimeType) {
      return prompt;
    }
    if (message.type === MessageType.IMAGE) {
      return [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "image",
          data: message.mediaBase64,
          mime_type: message.mimeType,
        },
      ];
    }
    if (message.type === MessageType.VIDEO) {
      return [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "video",
          data: message.mediaBase64,
          mime_type: message.mimeType,
        },
      ];
    }
    return prompt;
  }
  isAIResponse(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const response = value;
    if (typeof response.message !== "string") {
      return false;
    }
    if (
      response.detectedFoods !== undefined &&
      !Array.isArray(response.detectedFoods)
    ) {
      return false;
    }
    return true;
  }
}
