import { Resend } from "resend";

import type { NotificationSender } from "../../../domain/ports/NotificationSender.js";

import {
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
  ALERT_EMAIL,
} from "../../../config/config.js";

export class EmailNotificationSender implements NotificationSender {
  private readonly resend: Resend;

  constructor() {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY não configurada.");
    }

    this.resend = new Resend(RESEND_API_KEY);
  }

  async send(subject: string, message: string): Promise<void> {
    if (!RESEND_FROM_EMAIL || !ALERT_EMAIL) {
      throw new Error("Configuração de e-mail incompleta.");
    }

    const { data, error } = await this.resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: ALERT_EMAIL,
      subject,
      text: message,
    });

    if (error) {
      throw new Error(`Falha ao enviar e-mail: ${error.message}`);
    }

    console.log("E-mail de notificação enviado:", data?.id);
  }
}
