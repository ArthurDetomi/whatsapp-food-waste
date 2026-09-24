import { Request, Response } from "express";
import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";
import { MessageMapper } from "../../../domain/ports/MessageMapper.js";

export class DevChatController {
  constructor(
    private readonly receiveMessageUseCase: ReceiveMessageUseCase,
    private readonly mapper: MessageMapper<any>,
  ) {}

  async handle(req: Request, res: Response) {
    const message = this.mapper.toDomain(req.body);

    const response = await this.receiveMessageUseCase.execute(message);

    return res.status(200).json({
      responseMessage: response,
    });
  }
}
