import jwt from "jsonwebtoken";

export interface AccessTokenPayload {
  sub: string;
  type: "access";
  iat: number;
  exp: number;
}

export const REFRESH_TOKEN_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function signAccessToken(userId: string): string {
  return jwt.sign(
    { sub: userId, type: "access" },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m", algorithm: "HS256" }
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, {
    algorithms: ["HS256"],
  }) as AccessTokenPayload;
}
