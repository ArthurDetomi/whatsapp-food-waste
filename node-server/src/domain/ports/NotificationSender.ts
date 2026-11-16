export interface NotificationSender {
  send(subject: string, message: string): Promise<void>;
}
