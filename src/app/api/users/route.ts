import { saveUser } from "@/infrastructure/actions/user.actions";
import { NextResponse } from "next/server";
import { CreateUserDto } from "@/presentation/dto/create-user.dto";

export async function POST(request: Request) {
  try {
    const body: CreateUserDto = await request.json();
    console.log("body", body);

    const createdUser = await saveUser(body);
    return NextResponse.json(createdUser);
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
