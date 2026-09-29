export interface PantryItemProps {
  id?: string;
  userId: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: Date;
  isActive: boolean;
}

export class PantryItem {
  public readonly id?: string;
  public readonly userId: string;
  public readonly name: string;
  public readonly quantity: number;
  public readonly expirationDate: Date;
  public readonly unit: string;
  public readonly isActive: boolean;

  constructor(props: PantryItemProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.name = props.name;
    this.quantity = props.quantity;
    this.expirationDate = props.expirationDate;
    this.unit = props.unit;
    this.isActive = props.isActive;
  }

  deactivate(): PantryItem {
    return new PantryItem({
      id: this.id,
      userId: this.userId,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      expirationDate: this.expirationDate,
      isActive: false,
    });
  }
}
