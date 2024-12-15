import { Reward } from "../entities/Reward";

export interface IRewardService {
  save(reward: Reward): Promise<Reward>;
  findAll(): Promise<Reward[]>;
}
