import RewardForm from "@/components/forms/RewardForm";
import { fetchRewards } from "@/infrastructure/actions/reward.actions";
import { IReward } from "@/models/Reward";
import React from "react";

const rewardCard = (reward: IReward) => (
  <div key={reward.id} className="p-4 my-4 rounded-lg shadow-md bg-white">
    <h2 className="text-xl font-semibold mb-2">{reward.title}</h2>
    <p className="text-gray-700 mb-2">{reward.description}</p>
    <p className="text-gray-900 font-bold">{reward.points} points</p>
  </div>
);

export default async function RewardsPage() {
  const userRole: string = "admin";

  if (userRole !== "admin")
    return <div>Vous n&apos;avez pas les droits pour accéder à cette page</div>;

  const rewards = (await fetchRewards()) as unknown as IReward[];

  return (
    <div className="">
      <h1>Rewards</h1>
      <RewardForm />
      <ul className="grid grid-cols-6 gap-4 p-4">
        {rewards.map((reward: IReward) => (
          <li key={reward.id}>{rewardCard(reward)}</li>
        ))}
      </ul>
    </div>
  );
}
