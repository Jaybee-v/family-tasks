export class PatchUserCommand {
  constructor(
    public readonly id: number,
    public readonly key: string,
    public readonly value: string
  ) {}
}
