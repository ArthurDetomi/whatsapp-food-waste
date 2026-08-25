export class FakeMessageSender {
    messages = [];
    async send(phone, message) {
        this.messages.push({
            phone: phone,
            message: message,
        });
    }
}
