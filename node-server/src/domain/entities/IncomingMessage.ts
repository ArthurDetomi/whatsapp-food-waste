export class IncomingMessage {
  constructor(
    public readonly name: string,
    public readonly phone: string,
    public readonly text: string,
    public readonly fromMe: boolean,
  ) {}
}
