import { PatchUserUseCase } from "@/application/usecases/user/commands/patch-user.usecase";
import { FindUserByIdUseCase } from "@/application/usecases/user/queries/find-user-by-id.usecase";
import { patchUser } from "@/infrastructure/actions/user.actions";
import { UserService } from "@/infrastructure/services/user.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const findUserByIdUseCase = new FindUserByIdUseCase(new UserService());
    const user = await findUserByIdUseCase.execute({ id: parseInt(params.id) });
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'utilisateur" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const patchUserUseCase = new PatchUserUseCase(new UserService());
    const body = await request.json();
    const { key, value } = body;

    if (!key || !value) {
      return NextResponse.json(
        { error: "Les champs key et value sont requis" },
        { status: 400 }
      );
    }

    const updatedUser = await patchUserUseCase.execute({
      id: parseInt(params.id),
      key,
      value,
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'utilisateur" },
      { status: 500 }
    );
  }
}
