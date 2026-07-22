import { MessageType } from "./MessageType.js";

// 1. Criamos uma Interface para definir os tipos dos argumentos
export interface IncomingMessageProps {
  name: string;
  phone: string;
  fromMe: boolean;
  type: MessageType;
  text?: string;
  mediaUrl?: string;
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
  public readonly fileName?: string;
  public readonly mimeType?: string;

  constructor(props: IncomingMessageProps) {
    this.name = props.name;
    this.phone = props.phone;
    this.fromMe = props.fromMe;
    this.type = props.type;
    this.text = props.text;
    this.mediaUrl = props.mediaUrl;
    this.fileName = props.fileName;
    this.mimeType = props.mimeType;
  }
}
