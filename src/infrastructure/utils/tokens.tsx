import { v4 as uuidv4 } from "uuid";

export const getTokens = (): {
  token: string;
  tokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
} => {
  const token = uuidv4();

  // Genere du date a date + 2h
  const tokenExpiresAt = new Date();
  tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 2);

  const refreshToken = uuidv4();
  // genere du date a date + 16 jours
  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 16);
  return {
    token,
    tokenExpiresAt,
    refreshToken,
    refreshTokenExpiresAt,
  };
};
