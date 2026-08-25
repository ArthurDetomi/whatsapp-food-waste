import axios from "axios";
import { EVOLUTION_API, EVOLUTION_API_KEY } from "../../config/config.js";
export class EvolutionMessageSender {
    async send(phone, message) {
        await axios.post(`${EVOLUTION_API}/send/text`, {
            delay: 0,
            formatJid: true,
            number: phone,
            text: message,
        }, {
            headers: {
                apikey: EVOLUTION_API_KEY,
            },
        });
    }
}
