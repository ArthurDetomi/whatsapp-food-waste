export class IncomingMessage {
    name;
    phone;
    fromMe;
    type;
    text;
    mediaUrl;
    mediaBase64;
    fileName;
    mimeType;
    constructor(props) {
        this.name = props.name;
        this.phone = props.phone;
        this.fromMe = props.fromMe;
        this.type = props.type;
        this.text = props.text;
        this.mediaUrl = props.mediaUrl;
        this.mediaBase64 = props.mediaBase64;
        this.fileName = props.fileName;
        this.mimeType = props.mimeType;
    }
}
