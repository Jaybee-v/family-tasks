import {
  fetchRewards,
  saveReward,
} from "@/infrastructure/actions/reward.actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const createTask = await saveReward(body);
    return NextResponse.json(createTask);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de la création de la tâche",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = await fetchRewards();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur lors de la récupération des tâches",
      },
      { status: 500 }
    );
  }
}
