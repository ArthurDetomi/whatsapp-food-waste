import { IncomingMessage } from "../entities/IncomingMessage.js";
import { AnalysisResult } from "../ai/AnalysisResult.js";

export interface AIAnalyzer {
  analyze(message: IncomingMessage): Promise<AnalysisResult>;
}
