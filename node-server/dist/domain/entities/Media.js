export class Media {
    id;
    userId;
    type;
    mimeType;
    fileName;
    data;
    constructor(props) {
        this.id = props.id;
        this.userId = props.userId;
        this.type = props.type;
        this.mimeType = props.mimeType;
        this.fileName = props.fileName;
        this.data = props.data;
    }
}
