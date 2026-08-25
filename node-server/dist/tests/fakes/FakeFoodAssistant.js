export class FakeFoodAssistant {
    async process(message) {
        return {
            message: `Olá ${message.name}, em que posso ajudá-lo?`,
            detectedFoods: [],
        };
    }
}
