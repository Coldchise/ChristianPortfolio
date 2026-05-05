import type { RequestHandler } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { verifyAccessToken } from "../lib/jwt";

export interface AuthLocals {
  userId: string;
}

export const authenticate: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }

  const token = header.slice(7);
  try {
    const payload = verifyAccessToken(token);
    if (payload.type !== "access") {
      res.status(401).json({ error: "Invalid token type" });
      return;
    }
    (res.locals as AuthLocals).userId = payload.sub;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({ error: "Token expired" });
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  }
};
