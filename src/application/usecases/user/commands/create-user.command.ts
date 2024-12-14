export class CreateUserCommand {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly role: string
  ) {}
}
