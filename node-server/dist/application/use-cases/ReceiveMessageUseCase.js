export class ReceiveMessageUseCase {
    messageSender;
    foodAssistant;
    responseFormatter;
    findOrCreateUserUseCase;
    saveMediaUseCase;
    saveDetectedFoodsUseCase;
    constructor(messageSender, foodAssistant, responseFormatter, findOrCreateUserUseCase, saveMediaUseCase, saveDetectedFoodsUseCase) {
        this.messageSender = messageSender;
        this.foodAssistant = foodAssistant;
        this.responseFormatter = responseFormatter;
        this.findOrCreateUserUseCase = findOrCreateUserUseCase;
        this.saveMediaUseCase = saveMediaUseCase;
        this.saveDetectedFoodsUseCase = saveDetectedFoodsUseCase;
    }
    async execute(message) {
        if (message.fromMe) {
            return;
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
        }
        catch (error) {
            console.error("Erro ao processar mensagem:", error);
            await this.messageSender.send(message.phone, "⚠️ Estamos com problemas no momento. Tente novamente mais tarde.\n\n⚠️ We're experiencing some issues right now. Please try again later.");
        }
    }
}
