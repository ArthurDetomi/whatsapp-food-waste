import { MessageSender } from "../../domain/ports/MessageSender.js";

export class FakeMessageSender implements MessageSender {
  public messages: Object[] = [];

  async send(phone: string, message: string): Promise<void> {
    this.messages.push({
      phone: phone,
      message: message,
    });
  }
}
