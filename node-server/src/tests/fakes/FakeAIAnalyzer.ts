import { AnalysisResult } from "../../domain/ai/AnalysisResult.js";
import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { AIAnalyzer } from "../../domain/ports/AIAnalyzer.js";

export class FakeAIAnalyzer implements AIAnalyzer {
  async analyze(message: IncomingMessage): Promise<AnalysisResult> {
    return new AnalysisResult(`Olá ${message.name}, em que posso ajudá-lo?`);
  }
}
