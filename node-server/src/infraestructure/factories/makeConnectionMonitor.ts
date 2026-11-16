import { MonitorConnectionUseCase } from "../../application/use-cases/MonitorConnectionUseCase.js";

import { EvolutionConnectionStatusProvider } from "../evolution/EvolutionConnectionStatusProvider.js";

import { RedisConnectionStatusRepository } from "../storage/redis/repository/RedisConnectionStatusRepository.js";

import { EmailNotificationSender } from "../notifications/email/EmailNotificationSender.js";

import { ConnectionMonitorScheduler } from "../scheduler/ConnectionMonitorScheduler.js";

export function makeConnectionMonitor(): ConnectionMonitorScheduler {
  const connectionProvider = new EvolutionConnectionStatusProvider();

  const connectionRepository = new RedisConnectionStatusRepository();

  const notificationSender = new EmailNotificationSender();

  const monitorConnectionUseCase = new MonitorConnectionUseCase(
    connectionProvider,
    connectionRepository,
    notificationSender,
  );

  return new ConnectionMonitorScheduler(monitorConnectionUseCase);
}
