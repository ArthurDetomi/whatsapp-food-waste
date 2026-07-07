import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageSender } from "../../domain/ports/MessageSender.js";

export class ReceiveMessageUseCase {
  constructor(private readonly messageSender: MessageSender) {}

  async execute(message: IncomingMessage): Promise<void> {
    if (message.fromMe) {
      return;
    }

    const response = `Ola ${message.name}, em que posso ajuda-lo?`;

    await this.messageSender.send(message.phone, response);
  }
}
