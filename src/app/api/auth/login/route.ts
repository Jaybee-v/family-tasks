import { NextResponse } from "next/server";
import { UserService } from "@/infrastructure/services/user.service";
import { LoginUseCase } from "@/application/usecases/auth/queries/login.usecase";
import { FindUserByNameUseCase } from "@/application/usecases/user/queries/find-user-by-name.usecase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const loginUseCase = new LoginUseCase(
      new UserService(),
      new FindUserByNameUseCase(new UserService())
    );

    const user = await loginUseCase.execute({
      name: body.name,
      password: body.password,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Nom d'utilisateur ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Ici vous pourriez ajouter la logique pour créer une session
    // ou générer un token JWT

    return NextResponse.json({
      user: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
