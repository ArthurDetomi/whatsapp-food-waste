import { MessageType } from "./MessageType.js";

export interface MediaProps {
  id?: string;
  userId: string;
  type: MessageType;
  mimeType: string;
  fileName?: string;
  data: string;
}

export class Media {
  public readonly id?: string;
  public readonly userId: string;
  public readonly type: MessageType;
  public readonly mimeType: string;
  public readonly fileName?: string;
  public readonly data: string;

  constructor(props: MediaProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.type = props.type;
    this.mimeType = props.mimeType;
    this.fileName = props.fileName;
    this.data = props.data;
  }
}
