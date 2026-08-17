import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageSender } from "../../domain/ports/MessageSender.js";
import { FoodAssistant } from "../../domain/ports/FoodAssistant.js";
import { AIResponseFormatter } from "../../domain/ai/AIResponseFormatter.js";

export class ReceiveMessageUseCase {
  constructor(
    private readonly messageSender: MessageSender,
    private readonly foodAssistant: FoodAssistant,
    private readonly responseFormatter: AIResponseFormatter,
  ) {}

  async execute(message: IncomingMessage): Promise<void> {
    if (message.fromMe) {
      return;
    }

    try {
      const response = await this.foodAssistant.process(message);
      const formattedResponse = this.responseFormatter.format(response);

      await this.messageSender.send(message.phone, formattedResponse);
    } catch (error: any) {
      console.error("Erro ao processar mensagem:", error);

      await this.messageSender.send(
        message.phone,
        "⚠️ Estamos com problemas no momento. Tente novamente mais tarde.\n\n⚠️ We're experiencing some issues right now. Please try again later.",
      );
    }
  }
}
