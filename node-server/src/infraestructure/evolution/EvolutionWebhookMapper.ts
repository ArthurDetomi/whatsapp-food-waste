import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";

export class EvolutionWebhookMapper {
  static toDomain(payload: any): IncomingMessage {
    const data = payload.data;

    const name = data.Info.PushName;

    const phone = data.Info.Sender.replace("@s.whatsapp.net", "");

    const text = data.Message.conversation;

    const fromMe = data.Info.IsFromMe;

    const response = new IncomingMessage(name, phone, text, fromMe);

    return response;
  }
}
