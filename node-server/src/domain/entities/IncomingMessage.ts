import { MessageType } from "./MessageType.js";

export interface IncomingMessageProps {
  name: string;
  phone: string;
  fromMe: boolean;
  type: MessageType;
  text?: string;
  mediaUrl?: string;
  mediaBase64?: string;
  fileName?: string;
  mimeType?: string;
}

export class IncomingMessage {
  public readonly name: string;
  public readonly phone: string;
  public readonly fromMe: boolean;
  public readonly type: MessageType;
  public readonly text?: string;
  public readonly mediaUrl?: string;
  public readonly mediaBase64?: string;
  public readonly fileName?: string;
  public readonly mimeType?: string;

  constructor(props: IncomingMessageProps) {
    this.name = props.name;
    this.phone = props.phone;
    this.fromMe = props.fromMe;
    this.type = props.type;
    this.text = props.text;
    this.mediaUrl = props.mediaUrl;
    this.mediaBase64 = props.mediaBase64;
    this.fileName = props.fileName;
    this.mimeType = props.mimeType;
  }
}
