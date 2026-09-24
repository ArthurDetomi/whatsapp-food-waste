import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageType } from "../../domain/entities/MessageType.js";
import { MessageMapper } from "../../domain/ports/MessageMapper.js";

interface DevChatProps {
  message: string;
}

export class DevChatMapper implements MessageMapper<any> {
  public toDomain(payload: DevChatProps): IncomingMessage {
    return new IncomingMessage({
      fromMe: false,
      name: "DevChatUser",
      phone: "3299999999",
      type: MessageType.TEXT,
      text: payload.message,
    });
  }
}
