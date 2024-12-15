import { Reward } from "@/domain/entities/Reward";
import { IRewardService } from "@/domain/interfaces/reward.interface";
import { RewardMapper } from "../mapper/reward.mapper";
import prisma from "../config/prisma";

export class RewardService implements IRewardService {
  async save(reward: Reward): Promise<Reward> {
    const orm = RewardMapper.toEntity(reward);
    try {
      if (!orm) {
        throw new Error("ORM object is null after mapping");
      }

      const rewardOrm = await prisma.reward.create({
        data: orm,
      });
      const savedReward = RewardMapper.toDomainEntity(rewardOrm);
      return savedReward;
    } catch (error) {
      console.error("Error details:", error);
      throw error;
    }
  }
}
