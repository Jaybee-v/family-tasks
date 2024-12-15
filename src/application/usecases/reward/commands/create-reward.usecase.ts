import { IRewardService } from "@/domain/interfaces/reward.interface";
import { CreateRewardCommand } from "./create-reward.command";
import { Reward } from "@/domain/entities/Reward";
import { FindUserByIdUseCase } from "../../user/queries/find-user-by-id.usecase";

export class CreateRewardUseCase {
  constructor(
    private readonly rewardInterface: IRewardService,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}

  async execute(command: CreateRewardCommand): Promise<Reward> {
    const user = await this.findUserByIdUseCase.execute({
      id: command.creatorId,
    });

    if (user.getRole() !== "ADMIN") {
      throw new Error("Only admins can create rewards");
    }

    const reward = Reward.create({
      title: command.title,
      description: command.description,
      points: command.points,
    });

    return await this.rewardInterface.save(reward);
  }
}
