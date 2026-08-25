export interface UserProps {
  id?: string;
  phone: string;
  name: string;
}

export class User {
  public readonly id?: string;
  public readonly phone: string;
  public readonly name: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.phone = props.phone;
    this.name = props.name;
  }
}
