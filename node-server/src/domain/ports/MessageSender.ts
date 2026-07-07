export interface MessageSender {
  send(phone: string, message: string): Promise<void>;
}
