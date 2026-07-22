import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageSender } from "../../domain/ports/MessageSender.js";
import { AIAnalyzer } from "../../domain/ports/AIAnalyzer.js";
import { AnalysisResult } from "../../domain/ai/AnalysisResult.js";

export class ReceiveMessageUseCase {
  constructor(
    private readonly messageSender: MessageSender,
    private readonly aiAnalyzer: AIAnalyzer,
  ) {}

  async execute(message: IncomingMessage): Promise<void> {
    if (message.fromMe) {
      return;
    }

    const analysis = await this.aiAnalyzer.analyze(message);

    await this.messageSender.send(message.phone, analysis.response);
  }
}
