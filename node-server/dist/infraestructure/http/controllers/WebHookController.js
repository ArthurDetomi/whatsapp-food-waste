// Recebe Http, Transforma payload, Chama o caso de uso
export class WebHookController {
    receiveMessageUseCase;
    mapper;
    constructor(receiveMessageUseCase, mapper) {
        this.receiveMessageUseCase = receiveMessageUseCase;
        this.mapper = mapper;
    }
    async handle(req, res) {
        const message = this.mapper.toDomain(req.body);
        await this.receiveMessageUseCase.execute(message);
        return res.status(200).json({
            received: true,
        });
    }
}
