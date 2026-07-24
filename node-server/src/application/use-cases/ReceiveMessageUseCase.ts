import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageSender } from "../../domain/ports/MessageSender.js";
import { FoodAssistant } from "../../domain/ports/FoodAssistant.js";

export class ReceiveMessageUseCase {
  constructor(
    private readonly messageSender: MessageSender,
    private readonly foodAssistant: FoodAssistant,
  ) {}

  async execute(message: IncomingMessage): Promise<void> {
    if (message.fromMe) {
      return;
    }

    const response = await this.foodAssistant.process(message);

    await this.messageSender.send(message.phone, response.message);
  }
}
