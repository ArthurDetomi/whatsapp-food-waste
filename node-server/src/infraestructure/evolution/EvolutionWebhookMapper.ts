import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageType } from "../../domain/entities/MessageType.js";
import { MessageMapper } from "../../domain/ports/MessageMapper.js";

export class EvolutionWebhookMapper implements MessageMapper<any> {
  public toDomain(payload: any): IncomingMessage {
    const data = payload.data;

    const name = data.Info.PushName;

    const phone = data.Info.Sender.replace("@s.whatsapp.net", "");

    const text = data.Message.conversation;

    const fromMe = data.Info.IsFromMe;

    const response = new IncomingMessage({
      name: name,
      phone: phone,
      text: text,
      fromMe: fromMe,
      type: MessageType.TEXT,
    });

    return response;
  }
}
