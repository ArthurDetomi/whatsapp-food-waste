export interface PantryItemProps {
  id?: string;
  userId: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: Date;
}

export class PantryItem {
  public readonly id?: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly quantity: number;
  public readonly expirationDate: Date;
  public readonly unit: string;

  constructor(props: PantryItemProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.quantity = props.quantity;
    this.expirationDate = props.expirationDate;
    this.unit = props.unit;
  }
}
