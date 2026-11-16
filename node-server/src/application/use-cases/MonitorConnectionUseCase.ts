import type { ConnectionStatusProvider } from "../../domain/ports/ConnectionStatusProvider.js";

import type { ConnectionStatusRepository } from "../../domain/ports/ConnectionStatusRepository.js";

import type { NotificationSender } from "../../domain/ports/NotificationSender.js";

export class MonitorConnectionUseCase {
  constructor(
    private connectionProvider: ConnectionStatusProvider,
    private connectionRepository: ConnectionStatusRepository,
    private notificationSender: NotificationSender,
  ) {}

  async execute(): Promise<void> {
    const currentStatus = await this.connectionProvider.getStatus();

    const previousStatus = await this.connectionRepository.getLastStatus();

    if (currentStatus === previousStatus) {
      return;
    }

    if (currentStatus === "disconnected") {
      await this.notifyDisconnection();
    } else if (previousStatus === "disconnected") {
      await this.notifyReconnection();
    }

    await this.connectionRepository.saveStatus(currentStatus);
  }

  private async notifyDisconnection(): Promise<void> {
    await this.notificationSender.send(
      "[WhatsApp Food Waste] Conexão perdida",
      "A conexão com o WhatsApp foi perdida. Verifique a instância da Evolution Go.",
    );
  }

  private async notifyReconnection(): Promise<void> {
    await this.notificationSender.send(
      "[WhatsApp Food Waste] Conexão restabelecida",
      "A conexão com o WhatsApp foi restabelecida. A aplicação pode voltar a operar normalmente.",
    );
  }
}
