import { IncomingMessage } from "../../domain/entities/IncomingMessage.js";
import { MessageSender } from "../../domain/ports/MessageSender.js";
import { FoodAssistant } from "../../domain/ports/FoodAssistant.js";
import { AIResponseFormatter } from "../../domain/ai/AIResponseFormatter.js";
import { UseCase } from "./UseCase.js";
import { FindOrCreateUserUseCase } from "./FindOrCreateUserUseCase.js";
import { SaveMediaUseCase } from "./SaveMediaUseCase.js";
import { SaveDetectedFoodsUseCase } from "./SaveDetectedFoodsUseCase.js";

export class ReceiveMessageUseCase implements UseCase<
  IncomingMessage,
  string | null
> {
  constructor(
    private readonly messageSender: MessageSender,
    private readonly foodAssistant: FoodAssistant,
    private readonly responseFormatter: AIResponseFormatter,
    private readonly findOrCreateUserUseCase: FindOrCreateUserUseCase,
    private readonly saveMediaUseCase: SaveMediaUseCase,
    private readonly saveDetectedFoodsUseCase: SaveDetectedFoodsUseCase,
  ) {}

  async execute(message: IncomingMessage): Promise<string | null> {
    if (message.fromMe) {
      return null;
    }

    try {
      const user = await this.findOrCreateUserUseCase.execute({
        phone: message.phone,
        name: message.name,
      });

      if (!user.id) {
        throw new Error("Usuário persistido sem identificador");
      }

      if (message.mediaBase64 && message.mimeType) {
        await this.saveMediaUseCase.execute({
          userId: user.id,
          type: message.type,
          mimeType: message.mimeType,
          data: message.mediaBase64,
          fileName: message.fileName,
        });
      }

      const response = await this.foodAssistant.process(message);

      if (response.detectedFoods?.length) {
        await this.saveDetectedFoodsUseCase.execute({
          detectedFoods: response.detectedFoods,
          userId: user.id,
        });
      }

      const formattedResponse = this.responseFormatter.format(response);

      await this.messageSender.send(message.phone, formattedResponse);

      return formattedResponse;
    } catch (error: any) {
      console.error("Erro ao processar mensagem:", error);

      const errorMessage =
        "⚠️ Estamos com problemas no momento. Tente novamente mais tarde.\n\n⚠️ We're experiencing some issues right now. Please try again later.";

      await this.messageSender.send(message.phone, errorMessage);

      return errorMessage;
    }
  }
}
