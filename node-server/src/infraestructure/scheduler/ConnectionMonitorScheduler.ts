import cron from "node-cron";

import { MonitorConnectionUseCase } from "../../application/use-cases/MonitorConnectionUseCase.js";

export class ConnectionMonitorScheduler {
  private task: ReturnType<typeof cron.schedule> | null = null;
  private isRunning = false;

  constructor(
    private readonly monitorConnectionUseCase: MonitorConnectionUseCase,
  ) {}

  start(): void {
    if (this.task) {
      return;
    }

    this.task = cron.schedule(
      "0 * * * *",
      () => {
        void this.executeCheck();
      },
      {
        timezone: "America/Sao_Paulo",
        noOverlap: true,
      },
    );

    console.log("[ConnectionMonitor] Monitoramento iniciado.");

    // Primeira verificação imediatamente.
    void this.executeCheck();
  }

  private async executeCheck(): Promise<void> {
    if (this.isRunning) {
      console.log("[ConnectionMonitor] Verificação já em andamento.");
      return;
    }

    this.isRunning = true;

    try {
      console.log("[ConnectionMonitor] Verificando conexão...");

      await this.monitorConnectionUseCase.execute();

      console.log("[ConnectionMonitor] Verificação concluída.");
    } catch (error) {
      console.error("[ConnectionMonitor] Erro ao verificar conexão:", error);
    } finally {
      this.isRunning = false;
    }
  }

  stop(): void {
    this.task?.stop();
    this.task = null;
  }
}
