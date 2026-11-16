import { describe, it, expect, vi } from "vitest";

import { MonitorConnectionUseCase } from "../../../application/use-cases/MonitorConnectionUseCase.js";

import type { ConnectionStatus } from "../../../domain/ports/ConnectionStatusProvider.js";

describe("MonitorConnectionUseCase", () => {
  it("should notify when connection is lost", async () => {
    let status: ConnectionStatus = "connected";

    const provider = {
      getStatus: async () => "disconnected" as ConnectionStatus,
    };

    const repository = {
      getLastStatus: async () => status,
      saveStatus: async (newStatus: ConnectionStatus) => {
        status = newStatus;
      },
    };

    const notificationSender = {
      send: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new MonitorConnectionUseCase(
      provider,
      repository,
      notificationSender,
    );

    await useCase.execute();

    expect(notificationSender.send).toHaveBeenCalledOnce();
    expect(status).toBe("disconnected");
  });

  it("should not notify repeatedly while disconnected", async () => {
    const provider = {
      getStatus: async () => "disconnected" as ConnectionStatus,
    };

    const repository = {
      getLastStatus: async () => "disconnected" as ConnectionStatus,
      saveStatus: vi.fn(),
    };

    const notificationSender = {
      send: vi.fn(),
    };

    const useCase = new MonitorConnectionUseCase(
      provider,
      repository,
      notificationSender,
    );

    await useCase.execute();

    expect(notificationSender.send).not.toHaveBeenCalled();
    expect(repository.saveStatus).not.toHaveBeenCalled();
  });

  it("should notify when connection is restored", async () => {
    const provider = {
      getStatus: async () => "connected" as ConnectionStatus,
    };

    const repository = {
      getLastStatus: async () => "disconnected" as ConnectionStatus,
      saveStatus: vi.fn(),
    };

    const notificationSender = {
      send: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new MonitorConnectionUseCase(
      provider,
      repository,
      notificationSender,
    );

    await useCase.execute();

    expect(notificationSender.send).toHaveBeenCalledOnce();
    expect(repository.saveStatus).toHaveBeenCalledWith("connected");
  });
});
