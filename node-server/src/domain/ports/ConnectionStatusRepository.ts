import { ConnectionStatus } from "./ConnectionStatusProvider.js";

export interface ConnectionStatusRepository {
  getLastStatus(): Promise<ConnectionStatus | null>;

  saveStatus(status: ConnectionStatus): Promise<void>;
}
