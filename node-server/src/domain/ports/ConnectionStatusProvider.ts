export type ConnectionStatus = "connected" | "disconnected";

export interface ConnectionStatusProvider {
  getStatus(): Promise<ConnectionStatus>;
}
