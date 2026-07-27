import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageType } from "../../domain/entities/MessageType.js";
import { MessageMapper } from "../../domain/ports/MessageMapper.js";

export class EvolutionWebhookMapper implements MessageMapper<any> {
  public toDomain(payload: any): IncomingMessage {
    const data = payload.data;

    const name = data.Info.PushName;
    const phone = data.Info.Sender.replace("@s.whatsapp.net", "");
    const fromMe = data.Info.IsFromMe;

    if (data.Info.MediaType === "image") {
      return new IncomingMessage({
        name,
        phone,
        fromMe,
        type: MessageType.IMAGE,
        text: data.Message.imageMessage?.caption,
        mediaBase64: data.Message.base64,
        mediaUrl: data.Message.imageMessage?.URL,
        mimeType: data.Message.imageMessage?.mimetype,
      });
    }

    const videoMessage =
      data.Message.videoMessage ?? data.Message.documentMessage;

    if (
      ["video", "document"].includes(data.Info.MediaType) &&
      videoMessage?.mimetype?.startsWith("video/")
    ) {
      return new IncomingMessage({
        name,
        phone,
        fromMe,
        type: MessageType.VIDEO,
        text: videoMessage.caption,
        mediaBase64: data.Message.base64,
        mediaUrl: videoMessage.URL,
        fileName: videoMessage.fileName,
        mimeType: videoMessage.mimetype,
      });
    }

    return new IncomingMessage({
      name,
      phone,
      fromMe,
      type: MessageType.TEXT,
      text: data.Message.conversation,
    });
  }
}
