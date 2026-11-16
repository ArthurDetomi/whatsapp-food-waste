import { ConnectionStatusRepository } from "../../../../domain/ports/ConnectionStatusRepository.js";
import { ConnectionStatus } from "../../../../domain/ports/ConnectionStatusProvider.js";
import { redisClient } from "../client.js";

export class RedisConnectionStatusRepository implements ConnectionStatusRepository {
  private readonly key = "whatsapp:connection:status";

  async getLastStatus(): Promise<ConnectionStatus | null> {
    const status = await redisClient.get(this.key);

    if (status === "connected" || status === "disconnected") {
      return status;
    }

    return null;
  }

  async saveStatus(status: ConnectionStatus): Promise<void> {
    await redisClient.set(this.key, status);
  }
}
