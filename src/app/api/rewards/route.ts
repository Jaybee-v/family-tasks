import { saveReward } from "@/infrastructure/actions/reward.actions";
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
