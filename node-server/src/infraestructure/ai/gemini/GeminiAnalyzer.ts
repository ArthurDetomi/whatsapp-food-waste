import { AIAnalyzer } from "../../../domain/ports/AIAnalyzer.js";
import { IncomingMessage } from "../../../domain/entities/IncomingMessage.js";
import { AnalysisResult } from "../../../domain/ai/AnalysisResult.js";

import { gemini } from "./client.js";
import { expirationPrompt } from "../prompts/expirationPrompt.js";

export class GeminiAnalyzer implements AIAnalyzer {
  async analyze(message: IncomingMessage): Promise<AnalysisResult> {
    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
                ${expirationPrompt}
                Mensagem do usuário:
                ${message.text}
            `,
    });

    return new AnalysisResult(
      response.text ?? "Não foi possível gerar uma resposta.",
    );
  }
}
