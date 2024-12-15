import { NextResponse } from "next/server";
import { UserService } from "@/infrastructure/services/user.service";
import { LoginUseCase } from "@/application/usecases/auth/queries/login.usecase";
import { FindUserByNameUseCase } from "@/application/usecases/user/queries/find-user-by-name.usecase";
import { TokenService } from "@/infrastructure/services/token.service";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const loginUseCase = new LoginUseCase(
      new FindUserByNameUseCase(new UserService()),
      new TokenService()
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

    const tokenService = new TokenService();
    const token = await tokenService.findByUserId(user.user.getId());

    if (!token) {
      return null;
    }
    // Ici vous pourriez ajouter la logique pour créer une session
    // ou générer un token JWT
    (await cookies()).set("token", token.getToken());
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
