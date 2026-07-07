import { IncomingMessage } from "../entities/IncomingMessage.js";

export interface MessageMapper<T> {
  toDomain(input: T): IncomingMessage;
}
