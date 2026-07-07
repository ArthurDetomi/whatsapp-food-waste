import axios from "axios";
import { MessageSender } from "../../domain/ports/MessageSender.js";
import { EVOLUTION_API, EVOLUTION_API_KEY } from "../../config/config.js";

export class EvolutionMessageSender implements MessageSender {
  async send(phone: string, message: string): Promise<void> {
    await axios.post(
      `${EVOLUTION_API}/send/text`,
      {
        delay: 0,
        formatJid: true,
        number: phone,
        text: message,
      },
      {
        headers: {
          apikey: EVOLUTION_API_KEY,
        },
      },
    );
  }
}
