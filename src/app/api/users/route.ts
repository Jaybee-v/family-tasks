import { saveUser } from "@/infrastructure/actions/user.actions";
import { NextResponse } from "next/server";
import { User } from "@/domain/entities/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = User.create({
      name: body.name,
      password: body.password,
    });

    const createdUser = await saveUser(user);
    return NextResponse.json(createdUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
