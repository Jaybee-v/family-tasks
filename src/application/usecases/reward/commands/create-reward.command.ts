export class CreateRewardCommand {
  constructor(
    public readonly creatorId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly points: number
  ) {}
}
