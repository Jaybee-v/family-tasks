"use server";

import { Token } from "@/domain/entities/Token";
import { User } from "@/domain/entities/User";
import { TokenService } from "../services/token.service";
import { cookies } from "next/headers";

export async function saveToken(token: Token): Promise<void> {}

export async function isAuthenticated(): Promise<User | null> {
  const token = (await cookies()).get("token");
  if (!token) {
    return null;
  }
  const tokenService = new TokenService();
  return tokenService.findByToken(token.value);
}

export const logout = async (): Promise<void> => {
  (await cookies()).delete("token");
};
