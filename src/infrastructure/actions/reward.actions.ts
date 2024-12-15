import { Reward } from "@/domain/entities/Reward";
import { CreateRewardDto } from "@/presentation/dto/create-reward.dto";
import { RewardService } from "../services/reward.service";
import { CreateRewardUseCase } from "@/application/usecases/reward/commands/create-reward.usecase";
import { FindUserByIdUseCase } from "@/application/usecases/user/queries/find-user-by-id.usecase";
import { UserService } from "../services/user.service";

export async function saveReward(reward: CreateRewardDto): Promise<Reward> {
  const createRewardUseCase = new CreateRewardUseCase(
    new RewardService(),
    new FindUserByIdUseCase(new UserService())
  );
  return createRewardUseCase.execute(reward);
}
