import { AIResponse } from "../../domain/ai/AIResponse.js";
import { AIResponseFormatter } from "../../domain/ai/AIResponseFormatter.js";

export class WhatsAppAIResponseFormatter implements AIResponseFormatter {
  format(response: AIResponse): string {
    if (!response.detectedFoods?.length) {
      return response.message;
    }

    const foods = response.detectedFoods
      .map((food) => {
        const lines = [`🍽️ *${food.name}*`];

        if (food.estimatedExpiration) {
          lines.push(`⏳ Consumir em: ${food.estimatedExpiration}`);
        } else {
          lines.push("⏳ Não foi possível estimar a validade");
        }

        if (food.observations) {
          lines.push(`💡 ${food.observations}`);
        }

        return lines.join("\n");
      })
      .join("\n\n");

    return [
      response.message,
      "",
      "🥬 *Alimentos encontrados*",
      "",
      foods,
      "",
      "⚠️ As datas são estimativas. Antes de consumir, confira o cheiro, a aparência e a textura do alimento.",
    ].join("\n");
  }
}
