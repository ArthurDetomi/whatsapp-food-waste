import axios from "axios";

import {
  ConnectionStatus,
  ConnectionStatusProvider,
} from "../../domain/ports/ConnectionStatusProvider.js";

import { EVOLUTION_API, EVOLUTION_API_KEY } from "../../config/config.js";

interface EvolutionConnectionStatusResponse {
  data: {
    Connected: boolean;
    LoggedIn: boolean;
    Name: string;
  };
  message: string;
}

export class EvolutionConnectionStatusProvider implements ConnectionStatusProvider {
  async getStatus(): Promise<ConnectionStatus> {
    const response = await axios.get<EvolutionConnectionStatusResponse>(
      `${EVOLUTION_API}/instance/status`,
      {
        headers: {
          apikey: EVOLUTION_API_KEY,
        },
        timeout: 10000,
      },
    );

    const { Connected, LoggedIn } = response.data.data;

    if (typeof Connected !== "boolean" || typeof LoggedIn !== "boolean") {
      throw new Error("Invalid Evolution connection status response");
    }

    return Connected && LoggedIn ? "connected" : "disconnected";
  }
}
