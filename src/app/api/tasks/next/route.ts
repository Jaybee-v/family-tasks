import { fetchNextTasks } from "@/infrastructure/actions/task.actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await fetchNextTasks();

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
