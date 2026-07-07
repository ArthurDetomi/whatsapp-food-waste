// Recebe Http, Transforma payload, Chama o caso de uso

import { Request, Response } from "express";

import { ReceiveMessageUseCase } from "../../../application/use-cases/ReceiveMessageUseCase.js";

import { EvolutionWebhookMapper } from "../../evolution/EvolutionWebhookMapper.js";

export class WebHookController {
  constructor(private readonly receiveMessageUseCase: ReceiveMessageUseCase) {}

  async handle(req: Request, res: Response) {
    const message = EvolutionWebhookMapper.toDomain(req.body);

    await this.receiveMessageUseCase.execute(message);

    return res.status(200).json({
      received: true,
    });
  }
}
