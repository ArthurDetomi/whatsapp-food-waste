export interface FoodProps {
  id?: string;
  userId: string;
  name: string;
  estimatedExpiration?: string;
  confidence: number;
  observations?: string;
}

export class Food {
  public readonly id?: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly estimatedExpiration?: string;
  public readonly confidence: number;
  public readonly observations?: string;

  constructor(props: FoodProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.estimatedExpiration = props.estimatedExpiration;
    this.confidence = props.confidence;
    this.observations = props.observations;
  }
}
