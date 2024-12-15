import { Reward } from "@/domain/entities/Reward";
import { Reward as PrismaReward } from "@prisma/client";
export class RewardMapper {
  static toEntity(reward: Reward): Omit<PrismaReward, "id"> {
    return {
      title: reward.getTitle(),
      description: reward.getDescription(),
      points: reward.getPoints(),
      createdAt: reward.getCreatedAt(),
      updatedAt: reward.getUpdatedAt(),
    };
  }

  static toDomainEntity(rewardOrm: PrismaReward): Reward {
    return new Reward(
      rewardOrm.id,
      rewardOrm.title,
      rewardOrm.description,
      rewardOrm.points,
      rewardOrm.createdAt,
      rewardOrm.updatedAt
    );
  }
}
