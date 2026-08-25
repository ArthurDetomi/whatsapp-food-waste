export class Food {
    id;
    userId;
    name;
    estimatedExpiration;
    confidence;
    observations;
    constructor(props) {
        this.id = props.id;
        this.userId = props.userId;
        this.name = props.name;
        this.estimatedExpiration = props.estimatedExpiration;
        this.confidence = props.confidence;
        this.observations = props.observations;
    }
}
